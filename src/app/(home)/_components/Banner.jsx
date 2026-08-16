// src/app/(home)/_components/Banner.jsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { H1, H2, H6 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Stethoscope } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#f0f7ff] via-[#f4f8ff] to-[#e8f4f8]">
      <div className="container lg:h-screen flex flex-col lg:flex-row lg:gap-8 pt-18 relative">
        {/* Left Content */}
        <div className="flex-1 flex items-center py-20 pr-0 lg:pr-10">
          <div className="">
            <H2 className="text-primary">Welcome to</H2>

            <H1 className="text-gray-900 flex items-end gap-2">
              <Stethoscope className="h-20 w-20 text-primary" /> Dr. AK BISWAS
            </H1>

            <p className="mt-3 text-base font-medium text-gray-500 md:text-lg">
              MBBS, MD
              <span className="mx-2">•</span>
              Senior Consultant
            </p>

            <H6 className="mt-6 text-gray-600">
              Your trusted healthcare partner providing compassionate,
              personalized care with modern medical expertise. Book your
              appointment today and take the first step toward better health.
            </H6>

            <div className="mt-8">
              <Link href="/appointment">
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
        </div>

        {/* Right Image - Aligned to bottom */}
        <div className="flex items-end justify-end relative">
          {/* Soft background shape */}
          <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full bg-primary/10 blur-3xl" />

          {/* Doctor Image - Bottom aligned */}
          <div className="relative flex items-end justify-center lg:justify-end w-full h-full bg-primary rounded-tr-[100px] rounded-bl-[100px]">
            <Image
              src="/home_banner/dr_ak_biswas.png"
              alt="Dr. Apurba Kumar Biswas"
              height={650}
              width={500}
              className="object-contain object-bottom h-auto max-h-[85vh] w-auto"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
