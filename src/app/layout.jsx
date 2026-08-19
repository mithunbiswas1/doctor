// src/app/layout.jsx

import { Manrope } from "next/font/google";

import "./globals.css";
import { nekst } from "@/font/nekst/nekst";

import { Toaster } from "sonner";
import ReduxProvider from "@/redux/reduxProvider/ReduxProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  metadataBase: new URL("http://chandsidoctor.com"),

  title: {
    default: "Dr. AK Biswas | Senior Consultant & Healthcare Expert",
    template: "%s | Dr. AK Biswas",
  },

  description:
    "Dr. AK Biswas is a highly experienced medical professional with over 15 years of expertise. Specializing in general medicine, cardiology, neurology, and comprehensive healthcare. Book an appointment today!",

  keywords: [
    "Dr. AK Biswas",
    "Doctor",
    "Healthcare",
    "Medical Consultation",
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Senior Consultant",
    "Appointment",
    "Health Expert",
    "MBBS",
    "MD",
  ],

  authors: [{ name: "Dr. AK Biswas" }],
  creator: "Dr. AK Biswas",
  publisher: "Dr. AK Biswas",

  openGraph: {
    title: "Dr. AK Biswas | Senior Consultant & Healthcare Expert",
    description:
      "Expert medical care with compassion. Specializing in general medicine, cardiology, neurology, and comprehensive healthcare.",
    url: "http://chandsidoctor.com",
    siteName: "Dr. AK Biswas - Healthcare Expert",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. AK Biswas - Senior Consultant",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dr. AK Biswas | Senior Consultant & Healthcare Expert",
    description:
      "Expert medical care with compassion. Specializing in general medicine, cardiology, neurology, and comprehensive healthcare.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "your-google-verification-code",
  },

  alternates: {
    canonical: "http://chandsidoctor.com",
  },

  category: "Healthcare",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${nekst.variable}`}>
        <ReduxProvider>
          {children}

          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
