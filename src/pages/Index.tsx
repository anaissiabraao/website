import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemsSection from "@/components/ProblemsSection";
import SolutionsSection from "@/components/SolutionsSection";
import ResultsSection from "@/components/ResultsSection";
import EconomySimulator from "@/components/EconomySimulator";
import CaseStudies from "@/components/CaseStudies";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import AcademySection from "@/components/AcademySection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemsSection />
        <SolutionsSection />
        <ResultsSection />
        <EconomySimulator />
        <CaseStudies />
        <HowItWorks />
        <About />
        <FAQ />
        <AcademySection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
