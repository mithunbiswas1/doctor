// src/app/(home)/page.jsx

import Banner from "./_components/Banner";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import AboutSection from "./_components/AboutSection";
import OurFeatures from "./_components/OurFeatures";
import Services from "./_components/Services";

export async function generateMetadata() {}

export default async function Home() {
  return (
    <main className="">
      <Banner />
      <Services />
      <WhyChooseUs />
      <AboutSection />
      <OurFeatures />
      <TestimonialsSection />
    </main>
  );
}
