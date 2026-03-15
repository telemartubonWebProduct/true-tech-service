import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = {
  title: "Telemart Ubon | อินเทอร์เน็ตทรู ดีแทค เน็ตบ้าน มือถือ โซล่าเซลล์ อุบลราชธานี",
  description:
    "Telemart Ubon ให้บริการ เน็ตบ้านทรูออนไลน์ ซิมมือถือทรู-ดีแทค แพ็กเกจความบันเทิง โซล่าเซลล์ครบวงจร และอุปกรณ์ไอที ราคาพิเศษ สมัครง่าย บริการถึงที่ ติดต่อทีมผู้เชี่ยวชาญได้ตลอด 24 ชั่วโมง",
  keywords: [
    "telemart", "telemart ubon", "เน็ตบ้าน", "ทรูออนไลน์", "ดีแทค",
    "True Online", "ซิมมือถือ", "โซล่าเซลล์", "อินเทอร์เน็ต อุบลราชธานี", "สมัครเน็ตบ้าน",
  ],
  openGraph: {
    title: "Telemart Ubon | อินเทอร์เน็ตทรู ดีแทค เน็ตบ้าน มือถือ",
    description: "บริการเน็ตบ้าน ซิมมือถือ และโซล่าเซลล์ครบวงจร โดยทีมผู้เชี่ยวชาญ Telemart Ubon สมัครง่าย ติดตั้งรวดเร็ว",
    url: "https://telemart-ubon.com",
    siteName: "Telemart Ubon",
    locale: "th_TH",
    type: "website",
    images: [{ url: "/assets/banner/hero-banner.jpg", width: 1200, height: 630, alt: "Telemart Ubon – เน็ตบ้าน มือถือ โซล่าเซลล์" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telemart Ubon | เน็ตบ้าน มือถือ โซล่าเซลล์ อุบลราชธานี",
    description: "บริการเน็ตบ้านและซิมมือถือ ทรู ดีแทค ราคาพิเศษ สมัครง่าย ติดตั้งรวดเร็ว",
    images: ["/assets/banner/hero-banner.jpg"],
  },
  alternates: { canonical: "https://telemart-ubon.com/home" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default async function HomePage() {
  // Fetch all data in parallel for optimal performance
  const [banners, packages, siteSettings, heroData, menuCategories, agents, homeSections] =
    await Promise.all([
      prisma.banner.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      prisma.package.findMany({ where: { status: true }, orderBy: { displayOrder: "asc" } }),
      prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
      prisma.heroSection.findUnique({ where: { id: "singleton" } }),
      prisma.menuCategory.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      prisma.agent.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
      prisma.homeSection.findMany({ where: { isActive: true } }),
    ]);

  // Build a map of home sections by key for easy access
  const sectionsMap: Record<string, any> = {};
  for (const s of homeSections) {
    sectionsMap[s.sectionKey] = s;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Telemart Ubon",
    description: "ให้บริการ เน็ตบ้านทรูออนไลน์ ซิมมือถือทรู-ดีแทค โซล่าเซลล์ และอุปกรณ์ไอที ราคาพิเศษในอุบลราชธานี",
    url: "https://telemart-ubon.com",
    telephone: siteSettings?.phone || "+66-",
    address: { "@type": "PostalAddress", addressLocality: "อุบลราชธานี", addressRegion: "อุบลราชธานี", addressCountry: "TH" },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00", closes: "20:00",
    }],
    image: siteSettings?.logoUrl || "https://telemart-ubon.com/assets/banner/hero-banner.jpg",
    sameAs: [],
  };

  const s = (data: any) => JSON.parse(JSON.stringify(data));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageClient
        banners={s(banners)}
        packages={s(packages)}
        siteSettings={s(siteSettings)}
        heroData={s(heroData)}
        menuCategories={s(menuCategories)}
        agents={s(agents)}
        homeSections={s(sectionsMap)}
      />
    </>
  );
}
