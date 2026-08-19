// src/app/(home)/_components/Services.jsx

"use client";

import Link from "next/link";
import { H2, H3, H6 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import {
  Heart,
  Brain,
  Baby,
  Bone,
  Stethoscope,
  Ambulance,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Cardiology",
    description:
      "Comprehensive heart care with advanced diagnostic and treatment options for all cardiac conditions.",
    href: "/services/cardiology",
  },
  {
    icon: Brain,
    title: "Neurology",
    description:
      "Expert diagnosis and treatment for neurological disorders including stroke, epilepsy, and migraines.",
    href: "/services/neurology",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description:
      "Specialized care for children from infancy through adolescence with a gentle, child-friendly approach.",
    href: "/services/pediatrics",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description:
      "Complete musculoskeletal care for bones, joints, ligaments, and tendons with advanced surgical techniques.",
    href: "/services/orthopedics",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    description:
      "Comprehensive primary care for all ages with focus on prevention, diagnosis, and treatment.",
    href: "/services/general-medicine",
  },
  {
    icon: Ambulance,
    title: "Emergency Care",
    description:
      "24/7 emergency medical services with rapid response and life-saving interventions.",
    href: "/services/emergency-care",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <H2 className="text-primary">Our Services</H2>
          <H3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Comprehensive Healthcare Services
          </H3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/appointments">
            <Button
              size="lg"
              variant="primary"
              rounded="default"
              className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              Book an Appointment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
