import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Simple honeypot check — if hidden field is filled, silently drop
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const required = ["name", "phone", "email", "address", "service"];
    for (const key of required) {
      if (!body[key] || typeof body[key] !== "string" || body[key].trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${key}` },
          { status: 400 }
        );
      }
    }

    const payload = {
      name: String(body.name).slice(0, 120),
      phone: String(body.phone).slice(0, 40),
      email: String(body.email).slice(0, 200),
      address: String(body.address).slice(0, 300),
      service: String(body.service).slice(0, 300),
      message: String(body.message ?? "").slice(0, 2000),
      source: String(body.source ?? "Website").slice(0, 80),
      submittedAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
    };

    // Log to Vercel logs — visible in the Vercel dashboard as a backup
    console.log("[quote]", JSON.stringify(payload));

    // Email notification via Resend.
    // Only RESEND_API_KEY is required — the destination defaults to the
    // business inbox and the sender defaults to Resend's shared address
    // (works with no domain setup). Override with LEAD_TO_EMAIL /
    // LEAD_FROM_EMAIL env vars once a domain is verified.
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL || "truecoastalexterior@gmail.com";
    const fromEmail =
      process.env.LEAD_FROM_EMAIL || "True Coastal Leads <onboarding@resend.dev>";

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

    // Forward every lead to the CRM (Flyra) via a configured inbound webhook.
    // Set FLYRA_WEBHOOK_URL in the environment. Non-blocking — a CRM hiccup
    // never breaks the form (the email + log still go through).
    const crmWebhook = process.env.FLYRA_WEBHOOK_URL;
    if (crmWebhook) {
      const [firstName, ...rest] = payload.name.trim().split(/\s+/);
      try {
        const r = await fetch(crmWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            firstName,
            lastName: rest.join(" "),
            fullName: payload.name,
          }),
        });
        if (r.ok) console.log("[quote] Flyra webhook ok", r.status);
        else
          console.error(
            "[quote] Flyra webhook error",
            r.status,
            await r.text(),
          );
      } catch (err) {
        console.error("[quote] Flyra webhook failed", err);
      }
    } else {
      console.warn("[quote] FLYRA_WEBHOOK_URL not set — lead not sent to CRM");
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
