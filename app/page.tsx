import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { CleanCoasts } from "./components/CleanCoasts";
import { ServiceArea } from "./components/ServiceArea";
import { QuoteForm } from "./components/QuoteForm";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyCallBar } from "./components/StickyCallBar";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <Testimonials />
        <CleanCoasts />
        <ServiceArea />
        <QuoteForm />
        <FAQ />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
