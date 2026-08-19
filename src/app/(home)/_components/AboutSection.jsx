// src/app/(home)/_components/AboutSection.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { H2, H3, H6 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Stethoscope,
  Award,
  Users,
  Clock,
  Heart,
  GraduationCap,
  Microscope,
  Activity,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function AboutSection() {
  const stats = [
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: Users,
      value: "10K+",
      label: "Happy Patients",
    },
    {
      icon: Stethoscope,
      value: "98%",
      label: "Success Rate",
    },
    {
      icon: Activity,
      value: "50+",
      label: "Awards & Recognition",
    },
  ];

  const specialties = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "General Medicine",
    "Emergency Care",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <H2 className="text-primary">About Us</H2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Dedicated to Your Health & Wellness
          </h3>
          <div className="w-20 h-1 bg-primary/50 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Image & Experience */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src="/home_banner/dr_ak_biswas.png"
                alt="Dr. AK Biswas"
                width={600}
                height={700}
                className="object-cover w-full h-auto"
                unoptimized
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Experience Badge - Floating */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">15+</p>
                  <p className="text-sm text-gray-600">Years of Excellence</p>
                </div>
              </div>
            </div>

            {/* Trust Badge - Floating */}
            <div className="absolute -top-4 -right-4 bg-primary rounded-xl shadow-xl shadow-primary/20 p-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <span className="text-white font-semibold text-sm">
                  100% Trusted
                </span>
              </div>
            </div>

            {/* Decorative Shapes */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </div>

          {/* Right Content */}
          <div>
            {/* Doctor Name & Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Meet Your Doctor
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Dr. Apurba Kumar Biswas
              </h3>
              <p className="text-lg text-gray-600 mt-1">
                MBBS, MD • Senior Consultant
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Dr. AK Biswas is a distinguished medical professional with over
                15 years of experience in the healthcare industry. His
                commitment to excellence and patient-centered care has made him
                one of the most trusted doctors in the region.
              </p>
              <p>
                With a strong foundation in general medicine and specialized
                training in multiple disciplines, Dr. Biswas provides
                comprehensive healthcare solutions tailored to each patient's
                unique needs.
              </p>
              <p>
                Our mission is to deliver compassionate, personalized care using
                the latest medical advancements while maintaining the highest
                standards of safety and ethics.
              </p>
            </div>

            {/* Specialties */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Areas of Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 leading-none">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/about">
                <Button
                  size="lg"
                  variant="primary"
                  rounded="default"
                  className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/appointments">
                <Button
                  size="lg"
                  variant="outline"
                  rounded="default"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section - Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Our Mission</h4>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              To provide accessible, high-quality healthcare with compassion,
              integrity, and respect for every patient.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-7 h-7 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Our Vision</h4>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              To be a leader in healthcare innovation, setting new standards of
              excellence in patient care and medical education.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Our Values</h4>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Integrity, excellence, compassion, and innovation guide everything
              we do for our patients and community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
