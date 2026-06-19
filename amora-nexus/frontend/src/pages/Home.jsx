import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Founder from '../components/Founder';
import WhyJoin from '../components/WhyJoin';
import RegistrationForm from '../components/RegistrationForm';
import Services from '../components/Services';
import Community from '../components/Community';
import Footer from '../components/Footer';
import { ErrorBoundary, SectionErrorBoundary } from '../components/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <Navbar />
      <main>
        <SectionErrorBoundary name="Hero">
          <Hero />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary name="About">
          <About />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Founder">
          <Founder />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="WhyJoin">
          <WhyJoin />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Registration">
          <RegistrationForm />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Services">
          <Services />
        </SectionErrorBoundary>

        <SectionErrorBoundary name="Community">
          <Community />
        </SectionErrorBoundary>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

