"use client";

import React, { useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TvIcon from "@mui/icons-material/Tv";
import ShieldIcon from "@mui/icons-material/Shield";
import type { PackageCategory, PackageItem, PerkItem } from "@/src/types/package";
import { topupCategories as CATEGORIES, topupPackages as PACKAGES } from "@/src/data/topup";
import { useSiteSettings } from "@/src/context/SiteSettingsContext";

const renderIcon = (imageUrl?: string) => {
  const props = { className: "w-[18px] h-[18px] text-gray-500 mr-2" };
  switch (imageUrl) {
    case "wifi":
      return <WifiIcon {...props} />;
    case "calendar":
      return <CalendarTodayIcon {...props} />;
    case "phone":
      return <PhoneIcon {...props} />;
    case "games":
      return <SportsEsportsIcon {...props} />;
    case "tv":
      return <TvIcon {...props} />;
    case "insurance":
      return <ShieldIcon {...props} />;
    default:
      return <WifiIcon {...props} />;
  }
};

interface PackageListProps {
  packages?: PackageItem[];
}

export default function PackageList({ packages = PACKAGES }: PackageListProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | "all">("all");
  const { lineSupportUrl } = useSiteSettings();

  const displayedCategories =
    activeCategoryId === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeCategoryId);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
        <button
          onClick={() => setActiveCategoryId("all")}
          className={`px-5 py-2.5 rounded-full text-[15px] font-bold transition-colors ${
            activeCategoryId === "all"
              ? "bg-[#6c757d] text-white"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          ทั้งหมด
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategoryId(category.id)}
            className={`px-5 py-2.5 rounded-full text-[15px] font-bold transition-colors ${
              activeCategoryId === category.id
                ? "bg-[#6c757d] text-white"
                : "bg-transparent text-gray-600 hover:bg-gray-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Package Categories List */}
      <div className="space-y-16">
        {displayedCategories.map((category) => {
          const categoryPackages = packages.filter(
            (p) => p.category_id === category.id
          );

          if (categoryPackages.length === 0) return null;

          return (
            <div key={category.id}>
              {/* Category Title */}
              <h2 className="text-[22px] font-bold mb-6 text-[#1a1a1a] tracking-tight ml-2">
                {category.name}
              </h2>

              {/* Package Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-[16px] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.08),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 min-h-[220px]"
                  >
                    <div>
                      {/* Package Name */}
                      <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-5 leading-[1.4]">
                        {pkg.name}
                      </h3>

                      {/* Perks */}
                      {pkg.perks && pkg.perks.length > 0 && (
                        <div className="space-y-3 mb-8">
                          {pkg.perks.map((perk, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-[13px] font-bold text-[#5a5a5a]"
                            >
                              {renderIcon(perk.imageUrl)}
                              <span>{perk.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer section (Price & Action) */}
                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-[4px] relative top-1">
                          <span className="text-[28px] font-bold text-[#f84c4c] tracking-tighter">
                            {pkg.price}
                          </span>
                          <span className="text-[13px] font-bold text-[#f84c4c]">
                            บาท
                          </span>
                        </div>
                        {pkg.price_note && (
                          <div className="text-[11px] font-semibold text-gray-500 mt-0.5">
                            {pkg.price_note}
                          </div>
                        )}
                      </div>
                      <button onClick={() => window.open((pkg as any).buyUrl && (pkg as any).buyUrl !== "#" ? (pkg as any).buyUrl : lineSupportUrl, "_blank", "noopener,noreferrer")} className="bg-[#fb4646] hover:bg-[#e63b3b] text-white text-[14px] font-bold py-2 px-6 rounded-full transition-colors shadow-sm mb-1">
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
    </div>
  );
}
