"use client";

import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import WifiIcon from "@mui/icons-material/Wifi";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TvIcon from "@mui/icons-material/Tv";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";
import HeaderMonthy from "./Header";
import type { PackageCategory, PackageItem, PerkItem } from "@/src/types/package";
import { monthlyCategories as CATEGORIES, monthlyPackages as PACKAGES } from "@/src/data/monthly";
import { useSiteSettings } from "@/src/context/SiteSettingsContext";

const renderIcon = (imageUrl?: string) => {
  const props = { className: "w-[18px] h-[18px] text-gray-500 mr-2" };
  switch (imageUrl) {
    case "wifi":
      return <WifiIcon {...props} />;
    case "speed":
      return <SpeedIcon {...props} />;
    case "calendar":
      return <CalendarTodayIcon {...props} />;
    case "phone":
      return <PhoneIcon {...props} />;
    case "game":
      return <SportsEsportsIcon {...props} />;
    case "tv":
      return <TvIcon {...props} />;
    case "insurance":
      return <ShieldIcon {...props} />;
    default:
      return <WifiIcon {...props} />;
  }
};

interface PromotionMonthyProps {
  packages?: PackageItem[];
}

export default function PromotionMonthy({ packages = PACKAGES }: PromotionMonthyProps) {
  const [activeTab, setActiveTab] = useState<string>("ทั้งหมด");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { lineSupportUrl } = useSiteSettings();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "ทั้งหมด") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const ref = sectionRefs.current[tab];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const displayedCategories =
    activeTab === "ทั้งหมด"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.name === activeTab);

  return (
    <Box className="w-full max-w-6xl mx-auto px-4 py-8">
      <HeaderMonthy onTabClick={handleTabClick} />

      <div className="space-y-16 mt-12">
        {displayedCategories.map((category) => {
          const categoryPackages = packages.filter(
            (p) => p.category_id === category.id
          );

          if (categoryPackages.length === 0) return null;

          return (
            <div
              key={category.id}
              ref={(el) => {
                sectionRefs.current[category.name] = el;
              }}
              className="scroll-mt-20"
            >
              <h2 className="text-[24px] font-bold mb-8 text-[#1a1a1a] tracking-tight ml-2">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-[20px] p-7 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-500 min-h-[260px] relative group"
                  >
                    <div>
                      {pkg.promo_badge && (
                        <div className="absolute -top-3 -right-1 bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10">
                          {pkg.promo_badge}
                        </div>
                      )}
                      
                      <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-6 leading-[1.4] pr-4">
                        {pkg.name}
                      </h3>

                      {pkg.perks && pkg.perks.length > 0 && (
                        <div className="space-y-4 mb-8">
                          {pkg.perks.map((perk, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-[13.5px] font-medium text-[#4a4a4a]"
                            >
                              {renderIcon(perk.imageUrl)}
                              <span>{perk.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-[4px]">
                          <span className="text-[30px] font-bold text-[#f84c4c] tracking-tighter">
                            {pkg.price}
                          </span>
                          <span className="text-[14px] font-bold text-[#f84c4c]">
                            บาท
                          </span>
                        </div>
                        {pkg.price_note && (
                          <div className="text-[11px] font-medium text-gray-400 mt-1">
                            {pkg.price_note}
                          </div>
                        )}
                      </div>
                      <button onClick={() => window.open((pkg as any).buyUrl && (pkg as any).buyUrl !== "#" ? (pkg as any).buyUrl : lineSupportUrl, "_blank", "noopener,noreferrer")} className="bg-[#fb4646] hover:bg-[#e63b3b] text-white text-[14px] font-bold py-2.5 px-7 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(251,70,70,0.2)] hover:shadow-[0_6px_16px_rgba(251,70,70,0.3)] active:scale-95 mb-0.5">
                        ซื้อเลย
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
}
