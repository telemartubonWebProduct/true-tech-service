import type { Metadata } from "next";
import AllPackage, { PackageItem } from "./components/all-package";
import Carousel, { SlideData } from "./components/Carousel";
import { broadbandCarouselData, broadbandPackageData } from "@/src/data/boardband";
import StoreSearch from "@/src/components/ui/StoreSearch";
import StorePagination from "@/src/components/ui/StorePagination";
import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = {
  title: "แพ็กเกจเน็ตบ้าน ทรูออนไลน์ ไฟเบอร์ | Telemart Ubon",
  description:
    "เปรียบเทียบแพ็กเกจเน็ตบ้านทรูออนไลน์ ไฟเบอร์ออพติก ความเร็วสูงสุด 2Gbps ราคาเริ่มต้น 399 บาท สมัครง่าย ติดตั้งฟรี พร้อมโปรโมชั่นพิเศษ Netflix, YouTube Premium จาก Telemart Ubon อุบลราชธานี",
  keywords: [
    "เน็ตบ้าน", "ทรูออนไลน์", "True Online", "ไฟเบอร์", "เน็ตบ้านอุบลราชธานี",
    "แพ็กเกจเน็ตบ้าน", "สมัครเน็ตบ้าน", "เน็ตบ้านราคาถูก", "Telemart",
  ],
  openGraph: {
    title: "แพ็กเกจเน็ตบ้าน ทรูออนไลน์ ไฟเบอร์ | Telemart Ubon",
    description: "เปรียบเทียบแพ็กเกจเน็ตบ้านทรูออนไลน์ ไฟเบอร์ ราคาเริ่มต้น 399 บาท สมัครง่าย ติดตั้งฟรี",
    url: "https://www.truetechservice.com/boardband",
  },
  twitter: {
    title: "แพ็กเกจเน็ตบ้าน ทรูออนไลน์ | Telemart Ubon",
    description: "เปรียบเทียบแพ็กเกจเน็ตบ้านทรูออนไลน์ ไฟเบอร์ ราคาเริ่มต้น 399 บาท สมัครง่าย ติดตั้งฟรี",
  },
  alternates: { canonical: "https://www.truetechservice.com/boardband" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

async function fetchCarouselData(): Promise<SlideData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(broadbandCarouselData);
    }, 1000);
  });
}

// Map the Promotion model to PackageItem
async function fetchPackageData(
  page: number, 
  limit: number, 
  q: string
): Promise<{ data: PackageItem[]; totalPages: number }> {
  try {
    const skip = (page - 1) * limit;
    const whereClause: any = { type: "broadband", status: true };
    if (q) {
      whereClause.name = { contains: q, mode: "insensitive" };
    }

    const [promotions, total] = await Promise.all([
      prisma.promotion.findMany({
        where: whereClause,
        orderBy: { displayOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.promotion.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limit);

    if (promotions.length > 0) {
      const data = promotions.map((p) => {
        // Parse speed (e.g. "1000/500 Mbps") into download/upload
        let dSpeed = 0;
        let uSpeed = 0;
        let sUnit = "Mbps";
        
        if (p.speed) {
          const parts = p.speed.split(" ");
          if (parts[0]) {
            const speeds = parts[0].split("/");
            dSpeed = parseInt(speeds[0]) || 0;
            uSpeed = parseInt(speeds[1]) || 0;
          }
          if (parts[1]) {
            sUnit = parts[1];
          }
        }

        return {
          id: p.id,
          category_id: 1, // Default for broadband
          name: p.name,
          price: p.price,
          price_note: p.priceNote,
          download_speed: dSpeed || null,
          upload_speed: uSpeed || null,
          speed_unit: sUnit,
          description: null,
          buy_link: p.buyUrl || "#",
          display_order: p.displayOrder,
          is_active: p.status,
          promo_badge: p.promoBadge,
          highlight_price: null, // Depending on if we added this field, leaving null for now
          contract_months: p.validity ? parseInt(p.validity) : null,
          perks: Array.isArray(p.perks) ? p.perks : [],
          freebies: Array.isArray(p.details) ? p.details.map((d: any) => ({ text: typeof d === 'string' ? d : d.text || '' })) : [],
          header_theme: p.categoryName === "Netflix" ? "netflix" : (p.categoryName === "YouTube" ? "youtube" : "generic"),
          header_image: p.imageUrl || undefined,
        } as PackageItem;
      });
      return { data, totalPages };
    }
  } catch (error) {
    console.error("Failed to fetch broadband packages from DB, fallback to static:", error);
  }

  // Fallback
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: broadbandPackageData.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase())).slice(0, limit),
        totalPages: Math.ceil(broadbandPackageData.length / limit)
      });
    }, 1000);
  });
}

export default async function Broadband(props: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || "1", 10);
  const q = searchParams?.q || "";
  const limit = 8; // Show 8 items per page

  const [carouselData, { data: packageData, totalPages }] = await Promise.all([
    fetchCarouselData(),
    fetchPackageData(page, limit, q),
  ]);
  
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-start">
      <section id="carousel">
        <Carousel data={carouselData} />
      </section>

      <section id="all-package" className="pt-16 pb-20">
        <StoreSearch placeholder="ค้นหาแพ็กเกจเน็ตบ้าน..." />
        <AllPackage packages={packageData} />
        
        {totalPages > 1 && (
          <StorePagination currentPage={page} totalPages={totalPages} />
        )}
      </section>
    </main>
  );
}
