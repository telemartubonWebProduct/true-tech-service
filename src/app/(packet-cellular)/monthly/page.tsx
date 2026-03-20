import type { Metadata } from "next";
import Box from "@mui/material/Box";
import BannerMonthy from "./components/Banner";
import BannerproMonthy from "./components/bannerPromotion";
import PromotionMonthy from "./components/Promotions";
import StoreSearch from "@/src/components/ui/StoreSearch";
import StorePagination from "@/src/components/ui/StorePagination";
import { prisma } from "@/src/lib/prisma";
import { monthlyPackages } from "@/src/data/monthly";
import type { PackageItem } from "@/src/types/package";

export const metadata: Metadata = {
  title: "แพ็กเกจซิมรายเดือน ทรู ดีแทค | Telemart Ubon",
  description:
    "แพ็กเกจซิมรายเดือน ทรู ดีแทค เปิดเบอร์ใหม่ ย้ายค่ายเบอร์เดิม เน็ตไม่อั้น โทรฟรี ราคาเริ่มต้น 199 บาท สมัครง่าย Telemart Ubon อุบลราชธานี",
  keywords: [
    "ซิมรายเดือน", "ทรูมูฟ", "ดีแทค", "เปิดเบอร์ใหม่", "ย้ายค่าย",
    "แพ็กเกจรายเดือน", "เน็ตไม่อั้น", "Telemart", "ซิมรายเดือนอุบลราชธานี",
  ],
  openGraph: {
    title: "แพ็กเกจซิมรายเดือน ทรู ดีแทค | Telemart Ubon",
    description: "เปิดเบอร์ใหม่ ย้ายค่ายเบอร์เดิม เน็ตไม่อั้น โทรฟรี ราคาเริ่มต้น 199 บาท",
    url: "https://www.truetechservice.com/monthly",
  },
  twitter: {
    title: "แพ็กเกจซิมรายเดือน ทรู ดีแทค | Telemart Ubon",
    description: "เปิดเบอร์ใหม่ ย้ายค่ายเบอร์เดิม เน็ตไม่อั้น โทรฟรี ราคาเริ่มต้น 199 บาท",
  },
  alternates: { canonical: "https://www.truetechservice.com/monthly" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

async function fetchMonthlyPackages(
  page: number,
  limit: number,
  q: string
): Promise<{ data: PackageItem[]; totalPages: number }> {
  try {
    const skip = (page - 1) * limit;
    const whereClause: any = { type: "monthly", status: true };
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
        else if (p.categoryName === "เปลี่ยนเติมเงินเป็นรายเดือน") catId = 3;
        else if (p.categoryName === "ลูกค้าปัจจุบัน") catId = 4;
        else if (p.categoryName === "แพ็กเกจเสริม") catId = 5;

        return {
          id: p.id as any,
          category_id: catId,
          name: p.name,
          price: p.price,
          price_note: p.priceNote,
          speed: p.speed,
          perks: Array.isArray(p.perks) ? p.perks : [],
          description: null,
          promo_badge: p.promoBadge || undefined,
          is_active: p.status,
          buyUrl: p.buyUrl || null,
          display_order: p.displayOrder,
        } as PackageItem;
      });
      return { data, totalPages };
    }
  } catch (error) {
    console.error("Failed to fetch monthly packages from DB:", error);
  }

  // Fallback
  return {
    data: monthlyPackages.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase())).slice((page - 1) * limit, page * limit),
    totalPages: Math.ceil(monthlyPackages.length / limit),
  };
}

export default async function Monthly(props: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || "1", 10);
  const q = searchParams?.q || "";
  const limit = 9; // Display 9 items per page (3x3 grid mostly)

  const { data: packages, totalPages } = await fetchMonthlyPackages(page, limit, q);

  return (
    <div>
      <Box className="bg-white pb-20">
        <BannerMonthy />
        <BannerproMonthy />
        
        <Box className="max-w-6xl mx-auto px-4 mt-8">
          <StoreSearch placeholder="ค้นหาแพ็กเกจรายเดือน..." />
        </Box>

        <Box className="flex justify-center items-center">
          <PromotionMonthy packages={packages} />
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
