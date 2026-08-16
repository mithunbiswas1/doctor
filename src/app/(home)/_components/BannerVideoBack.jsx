// src/app/(home)/_components/BannerVideoBack.jsx

import Image from "next/image";
import { baseUriBackend } from "@/redux/url/url";

export const BannerVideoBack = ({ banners }) => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {banners?.url ? (
        // Show video if url exists
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        >
          <source src={banners.url} type="video/webm" />
        </video>
      ) : banners?.banner_image ? (
        // Show image if banner_image exists
        <div className="relative w-full h-full">
          <Image
            src={`${baseUriBackend}${banners.banner_image}`}
            alt={banners?.first_title || "Banner"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      ) : (
        // Fallback if neither exists
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700" />
        // <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-secondary/0" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#ECF3FE] backdrop-blur-xs" />
    </div>
  );
};
