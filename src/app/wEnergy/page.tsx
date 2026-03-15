import type { Metadata } from "next";
import { Box } from "@mui/material";
import BannerEnergy from "./components/Banner";
import Countshow from "./components/Count";
import Productnservice from "./components/product";
import PromotionSolarcell from "./components/Solarcell";
import SolarPackge from "./components/SolarPackge";
import SolarInstallationSteps from "./components/InstallationStep";
import Knowledge from "./components/SolarcellKnowledge";
import StoreSearch from "@/src/components/ui/StoreSearch";
import StorePagination from "@/src/components/ui/StorePagination";
import { prisma } from "@/src/lib/prisma";
import type { SolarcellPackage } from "@/src/types/solar";
import { solarcellPackages } from "@/src/data/solar";

export const metadata: Metadata = {
  title: "โซล่าเซลล์ พลังงานแสงอาทิตย์ ติดตั้งครบวงจร | Telemart Ubon",
  description:
    "บริการติดตั้งโซล่าเซลล์ครบวงจร ประหยัดค่าไฟสูงสุด 80% แผงโซล่าเซลล์คุณภาพสูง รับประกันยาวนาน บริการหลังการขาย Telemart Ubon อุบลราชธานี",
  keywords: [
    "โซล่าเซลล์", "พลังงานแสงอาทิตย์", "Solar Cell", "ติดตั้งโซล่าเซลล์",
    "แผงโซล่าเซลล์", "ประหยัดค่าไฟ", "Telemart", "โซล่าเซลล์อุบลราชธานี",
  ],
  openGraph: {
    title: "โซล่าเซลล์ พลังงานแสงอาทิตย์ ติดตั้งครบวงจร | Telemart Ubon",
    description: "ติดตั้งโซล่าเซลล์ครบวงจร ประหยัดค่าไฟสูงสุด 80% รับประกันยาวนาน",
    url: "https://telemart-ubon.com/wEnergy",
  },
  twitter: {
    title: "โซล่าเซลล์ พลังงานแสงอาทิตย์ | Telemart Ubon",
    description: "ติดตั้งโซล่าเซลล์ครบวงจร ประหยัดค่าไฟสูงสุด 80% รับประกันยาวนาน",
  },
  alternates: { canonical: "https://telemart-ubon.com/wEnergy" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

async function fetchSolarPackages(
  page: number,
  limit: number,
  q: string
): Promise<{ data: SolarcellPackage[]; totalPages: number }> {
  try {
    const skip = (page - 1) * limit;
    const whereClause: any = { type: "solar", status: true };
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
        const perks = Array.isArray(p.perks) ? p.perks : [];
        const discountPrice = Array.isArray(p.details) 
          ? p.details.find((d: any) => d.key === "discount_price")?.value || p.priceNote || ""
          : p.priceNote || "";

        return {
          id: p.id as any,
          title: p.name,
          description: p.speed || "", // Mapped to description based on our data structure
          pack: p.categoryName || "",
          price: p.price.toString(),
          discount_price: discountPrice,
          solarcell: (perks[0] as any)?.text || (perks[0] as string) || "",
          arae: (perks[1] as any)?.text || (perks[1] as string) || "",
          scope: (perks[2] as any)?.text || (perks[2] as string) || "",
          karantee: (perks[3] as any)?.text || (perks[3] as string) || "",
        };
      });
      return { data, totalPages };
    }
  } catch (error) {
    console.error("Failed to fetch solar packages from DB:", error);
  }

  // Fallback
  return {
    data: solarcellPackages.filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase())).slice((page - 1) * limit, page * limit),
    totalPages: Math.ceil(solarcellPackages.length / limit),
  };
}

export default async function WAndWEnergy(props: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams?.page || "1", 10);
  const q = searchParams?.q || "";
  const limit = 4; // Show 4 per page for solar packages usually

  const { data: solarPackages, totalPages } = await fetchSolarPackages(page, limit, q);

  return (
    <div>
      <Box sx={{bgcolor:"white", pb: 10}}>
      
      <BannerEnergy/>
      <Countshow/>
      <Productnservice/>

      <Box className="max-w-6xl mx-auto px-4 mt-12 mb-4">
        <StoreSearch placeholder="ค้นหาแพ็กเกจโซล่าเซลล์..." />
      </Box>

      <PromotionSolarcell packages={solarPackages} />

      {totalPages > 1 && (
        <Box className="max-w-6xl mx-auto mt-8 mb-16">
          <StorePagination currentPage={page} totalPages={totalPages} />
        </Box>
      )}

      <SolarPackge/>
      <SolarInstallationSteps/>
      <Knowledge/>
      </Box>
    </div>
  );
}
