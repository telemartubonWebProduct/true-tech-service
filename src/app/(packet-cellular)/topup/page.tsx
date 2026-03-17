import type { Metadata } from "next";
import Box from "@mui/material/Box";
import BannerTop from "./components/BannerTop";
import PromotionBannerTopup from "./components/promotionBanner";
import PackageList from "./components/PackageList";
import StoreSearch from "@/src/components/ui/StoreSearch";
import StorePagination from "@/src/components/ui/StorePagination";
import { prisma } from "@/src/lib/prisma";
import { topupPackages } from "@/src/data/topup";
import type { PackageItem } from "@/src/types/package";

export const metadata: Metadata = {
  title: "แพ็กเกจซิมเติมเงิน ทรู ดีแทค | Telemart Ubon",
  description:
    "แพ็กเกจซิมเติมเงิน ทรู ดีแทค เน็ตไม่อั้น โทรคุ้ม ราคาประหยัด สมัครง่าย เลือกแพ็กเกจเสริมได้ตามใจ Telemart Ubon อุบลราชธานี",
  keywords: [
    "ซิมเติมเงิน", "แพ็กเกจเติมเงิน", "ทรูมูฟ เติมเงิน", "ดีแทค เติมเงิน",
    "เน็ตเติมเงิน", "Telemart", "ซิมเติมเงินอุบลราชธานี",
  ],
  openGraph: {
    title: "แพ็กเกจซิมเติมเงิน ทรู ดีแทค | Telemart Ubon",
    description: "ซิมเติมเงิน เน็ตไม่อั้น โทรคุ้ม ราคาประหยัด สมัครง่าย",
    url: "https://telemart-ubon.com/topup",
  },
  twitter: {
    title: "แพ็กเกจซิมเติมเงิน ทรู ดีแทค | Telemart Ubon",
    description: "ซิมเติมเงิน เน็ตไม่อั้น โทรคุ้ม ราคาประหยัด สมัครง่าย",
  },
  alternates: { canonical: "https://telemart-ubon.com/topup" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

async function fetchTopupPackages(
  page: number,
  limit: number,
  q: string
): Promise<{ data: PackageItem[]; totalPages: number }> {
  try {
    const skip = (page - 1) * limit;
    const whereClause: any = { type: "topup", status: true };
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
      const data = promotions.map((p: any) => {
        // Find category_id based on categoryName
        let catId = 1; // Default "เปิดเบอร์ใหม่"
        if (p.categoryName === "ย้ายค่ายเบอร์เดิม") catId = 2;
        else if (p.categoryName === "แพ็กเกจเสริม") catId = 3;

        return {
          id: p.id as any,
          category_id: catId,
          name: p.name,
          price: p.price,
          price_note: p.priceNote,
          speed: p.speed,
          perks: Array.isArray(p.perks) ? p.perks : [],
          description: null,
          is_active: p.status,
          buyUrl: p.buyUrl || null,
          display_order: p.displayOrder,
        } as PackageItem;
      });
      return { data, totalPages };
    }
  } catch (error) {
    console.error("Failed to fetch topup packages from DB:", error);
  }

  // Fallback
  return {
    data: topupPackages.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase())).slice((page - 1) * limit, page * limit),
    totalPages: Math.ceil(topupPackages.length / limit),
  };
}

export default async function Topup(props: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || "1", 10);
  const q = searchParams?.q || "";
  const limit = 8; // Display 8 items per page

  const { data: packages, totalPages } = await fetchTopupPackages(page, limit, q);

  return (
    <div>
      <Box className="bg-white pb-20">
        <BannerTop />
        <PromotionBannerTopup />
        
        <Box className="max-w-6xl mx-auto px-4 mt-8">
          <StoreSearch placeholder="ค้นหาแพ็กเกจเติมเงิน..." />
        </Box>

        <Box className="w-full">
          <PackageList packages={packages} />
        </Box>

        {totalPages > 1 && (
          <Box className="mt-8">
            <StorePagination currentPage={page} totalPages={totalPages} />
          </Box>
        )}
      </Box>
    </div>
  );
}
