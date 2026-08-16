// src/app/(home)/page.jsx

import Banner from "./_components/Banner";
import TestimonialsSection from "./_components/TestimonialsSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import AboutSection from "./_components/AboutSection";
import OurFeatures from "./_components/OurFeatures";

export async function generateMetadata() {}

export default async function Home() {
  return (
    <main className="">
      <Banner />
      <WhyChooseUs />
      <AboutSection />
      <OurFeatures />
      <TestimonialsSection />
    </main>
  );
}
