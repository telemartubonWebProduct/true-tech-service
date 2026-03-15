import { prisma } from "@/src/lib/prisma";
import BannerList from "./components/BannerList";

/**
 * Banner management page.
 * Server component that fetches banners and passes to client BannerList.
 */
export default async function BannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Banners</h1>
          <p className="text-gray-400 mt-1">
            Manage your homepage banner slides
          </p>
        </div>
      </div>

      {/* Banner List Component (client) */}
      <BannerList initialBanners={JSON.parse(JSON.stringify(banners))} />
    </div>
  );
}
