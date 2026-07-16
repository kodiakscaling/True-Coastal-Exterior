import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Simple honeypot check — if hidden field is filled, silently drop
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const required = ["first_name", "phone", "email", "address", "service"];
    for (const key of required) {
      if (!body[key] || typeof body[key] !== "string" || body[key].trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${key}` },
          { status: 400 }
        );
      }
    }

    const firstName = String(body.first_name).slice(0, 80);
    const lastName = String(body.last_name ?? "").slice(0, 80);
    const payload = {
      firstName,
      lastName,
      name: [firstName, lastName].filter(Boolean).join(" "),
      phone: String(body.phone).slice(0, 40),
      email: String(body.email).slice(0, 200),
      address: String(body.address).slice(0, 300),
      service: String(body.service).slice(0, 300),
      // Raw service titles the customer selected (for slug mapping)
      serviceTitles: Array.isArray(body.serviceList)
        ? body.serviceList.map(String).slice(0, 12)
        : [],
      otherText: String(body.otherText ?? "").slice(0, 500),
      message: String(body.message ?? "").slice(0, 2000),
      source: String(body.source ?? "Website").slice(0, 80),
      submittedAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
    };

    // Log to Vercel logs — visible in the Vercel dashboard as a backup
    console.log("[quote]", JSON.stringify(payload));

    // Email notification via Resend.
    // Leads are emailed to contact@truecoastalexterior.com, sent from the
    // business domain. NOTE: delivering to a domain address (not the Resend
    // account's own email) requires truecoastalexterior.com to be a VERIFIED
    // domain in Resend; otherwise Resend rejects the send. Both are overridable
    // via LEAD_TO_EMAIL / LEAD_FROM_EMAIL.
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail =
      process.env.LEAD_TO_EMAIL || "contact@truecoastalexterior.com";
    const fromEmail =
      process.env.LEAD_FROM_EMAIL ||
      "True Coastal Leads <leads@truecoastalexterior.com>";

    if (resendKey) {
      const rows = [
        ["Name", payload.name],
        ["Phone", payload.phone],
        ["Email", payload.email],
        ["Address", payload.address],
        ["Service(s)", payload.service],
        ["Notes", payload.message || "(none)"],
        ["Came from", payload.source],
        ["Submitted", payload.submittedAt],
      ];
      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
          <h2 style="color:#0B172E;margin:0 0 4px">🌊 New quote request</h2>
          <p style="color:#555;margin:0 0 16px">${payload.name} · ${payload.service}</p>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr>
                    <td style="padding:8px 12px;background:#F7EFD9;font-weight:bold;color:#0B172E;border:1px solid #eee;white-space:nowrap;vertical-align:top">${k}</td>
                    <td style="padding:8px 12px;border:1px solid #eee;color:#222">${String(v).replace(/</g, "&lt;")}</td>
                  </tr>`,
              )
              .join("")}
          </table>
          <p style="margin:16px 0 0">
            <a href="tel:${payload.phone}" style="color:#EF4444;font-weight:bold">Call ${payload.name}</a>
            &nbsp;·&nbsp;
            <a href="mailto:${payload.email}" style="color:#EF4444;font-weight:bold">Email them</a>
          </p>
        </div>`;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: payload.email,
            subject: `🌊 New lead: ${payload.name} — ${payload.service}`,
            html,
            text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
          }),
        });
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          console.log("[quote] email sent", data.id ?? "(ok)");
        } else {
          console.error("[quote] Resend error", res.status, await res.text());
        }
      } catch (err) {
        console.error("[quote] email send failed", err);
      }
    } else {
      console.warn(
        "[quote] RESEND_API_KEY not set — lead logged only, no email sent",
      );
    }

    // Forward every lead into the Flyra Leads pipeline (NEW stage) via the
    // hosted lead form's public submit endpoint. Public — no key needed.
    // Non-blocking: a CRM hiccup never breaks the form (email + log still go).
    //
    // This mirrors the fields/payload of the hosted Flyra form (f981awcw) exactly
    // so the two intake paths can't drift. Field keys captured from that form:
    //   - service_type: array of slugs
    //   - address (+ address_zip): property address
    //   - details: free-text notes
    const flyraFormUrl =
      process.env.FLYRA_FORM_URL ||
      "https://app.flyra.io/api/forms/public/f981awcw/submit";
    // Website service titles -> Flyra service_type slugs
    const SERVICE_SLUGS: Record<string, string> = {
      "Pressure Washing": "pressure_washing",
      "House Washing": "house_washing",
      "Roof Washing": "roof_washing",
      "Window Cleaning": "window_cleaning",
      "Gutter Cleaning": "gutter_cleaning",
      "Solar Panel Cleaning": "solar_panel_cleaning",
      Other: "other",
    };
    try {
      // Map selected services to slugs (dedupe, drop anything unknown)
      let serviceSlugs = payload.serviceTitles
        .map((t: string) => SERVICE_SLUGS[t])
        .filter((v: string, i: number, a: string[]) => v && a.indexOf(v) === i);
      // Fallback: if the raw list didn't come through, recover slugs from the
      // display string so we never send an empty selection.
      if (serviceSlugs.length === 0) {
        for (const [title, slug] of Object.entries(SERVICE_SLUGS)) {
          if (payload.service.includes(title)) serviceSlugs.push(slug);
        }
      }
      if (serviceSlugs.length === 0) serviceSlugs = ["other"];

      const zipMatch = payload.address.match(/\b\d{5}\b/);
      const details = [
        payload.message || null,
        payload.otherText ? `Other request: ${payload.otherText}` : null,
        `Submitted via ${payload.source} — truecoastalexterior.com`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const r = await fetch(flyraFormUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: {
            first_name: payload.firstName,
            last_name: payload.lastName,
            phone: payload.phone,
            email: payload.email,
            address: payload.address,
            address_zip: zipMatch ? zipMatch[0] : "",
            service_type: serviceSlugs,
            details,
            quote_total_cents: 0,
            quote_total: 0,
            quote_line_items: [],
          },
          tracking: {},
          referrer: null,
          landing_url: "https://truecoastalexterior.com",
        }),
      });
      if (r.ok) console.log("[quote] Flyra lead created", r.status);
      else console.error("[quote] Flyra error", r.status, await r.text());
    } catch (err) {
      console.error("[quote] Flyra send failed", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
