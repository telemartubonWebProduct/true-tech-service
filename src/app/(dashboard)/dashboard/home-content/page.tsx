import { prisma } from "@/src/lib/prisma";
import BannerList from "../banners/components/BannerList";
import SiteSettingsForm from "./components/SiteSettingsForm";
import PackageTable from "./components/PackageTable";
import HeroSectionForm from "./components/HeroSectionForm";
import MenuCategoryManager from "./components/MenuCategoryManager";
import AgentManager from "./components/AgentManager";
import HomeSectionEditor from "./components/HomeSectionEditor";

export default async function HomeContentPage() {
  const [banners, packages, settings, heroData, menuCategories, agents, homeSections] =
    await Promise.all([
      prisma.banner.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.package.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
      prisma.heroSection.findUnique({ where: { id: "singleton" } }),
      prisma.menuCategory.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.agent.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.homeSection.findMany(),
    ]);

  const settingsFallback = settings ?? {
    id: "singleton",
    logoUrl: null,
    phone: null,
    email: null,
    referralSystem: null,
    description: null,
    footerImageUrl: null,
    updatedAt: new Date(),
  };

  // Helper to find a section by key
  const findSection = (key: string) =>
    homeSections.find((s: { sectionKey: string }) => s.sectionKey === key) ?? null;

  // Serialise dates for client components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = (data: any) => JSON.parse(JSON.stringify(data));

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">จัดการเนื้อหาเว็บไซต์</h1>
        <p className="text-gray-400 mt-1">หน้าแรก (Main Page) Content Management — ทุกส่วนทุก Section</p>
      </div>

      <div className="space-y-16">
        

        {/* 2. Hero Section */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">1. Hero Section (ส่วนหัว)</h2>
            <p className="text-sm text-gray-500">แก้ไขข้อความ หัวข้อหมุนเวียน ปุ่ม CTA และภาพพื้นหลัง</p>
          </div>
          <HeroSectionForm initialData={s(heroData)} />
        </section>

        {/* 3. Category Menu */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">2. เมนูหมวดหมู่ (Category Menu)</h2>
            <p className="text-sm text-gray-500">จัดการไอคอนและลิงก์เมนูหมวดหมู่บริการ</p>
          </div>
          <MenuCategoryManager initialItems={s(menuCategories)} />
        </section>

        {/* 4. Packages & Promotions */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">3. แพ็กเกจและโปรโมชัน (Packages)</h2>
            <p className="text-sm text-gray-500">จัดการรายการแพ็กเกจต่างๆ และโปรโมชันแนะนำ</p>
          </div>
          <PackageTable initialPackages={s(packages)} />
        </section>

        {/* 5. Sales Team */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">4. ทีมผู้เชี่ยวชาญ (Sales Agents)</h2>
            <p className="text-sm text-gray-500">จัดการข้อมูลเจ้าหน้าที่ขาย — ชื่อ เบอร์ ตำแหน่ง รูปภาพ</p>
          </div>
          <AgentManager initialAgents={s(agents)} />
        </section>

        {/* 6. Why Choose Us */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">5. ทำไมต้องเลือกเรา (Why Choose Us)</h2>
            <p className="text-sm text-gray-500">จัดการรายการจุดเด่นของบริการ</p>
          </div>
          <HomeSectionEditor
            sectionKey="whyChoose"
            sectionLabel="Why Choose Us"
            sectionDescription="รายการจุดเด่น 3 ข้อ: ติดตั้งรวดเร็ว, บริการโดยผู้เชี่ยวชาญ, อุปกรณ์ล้ำสมัย"
            initialData={s(findSection("whyChoose"))}
            fields={["title", "subtitle", "jsonItems"]}
            jsonItemFields={[
              { key: "iconName", label: "Icon Name (Timer, SupportAgent, Router)", type: "text" },
              { key: "title", label: "หัวข้อ", type: "text" },
              { key: "desc", label: "คำอธิบาย", type: "text" },
            ]}
          />
        </section>

        {/* 7. Process Steps */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">6. ขั้นตอนการให้บริการ (Process Steps)</h2>
            <p className="text-sm text-gray-500">จัดการขั้นตอนการสมัครบริการ</p>
          </div>
          <HomeSectionEditor
            sectionKey="processSteps"
            sectionLabel="Process Steps"
            sectionDescription="ขั้นตอนการให้บริการ: ตรวจสอบพื้นที่ → เลือกโปร → นัดหมายติดตั้ง"
            initialData={s(findSection("processSteps"))}
            fields={["title", "subtitle", "jsonItems"]}
            jsonItemFields={[
              { key: "num", label: "ลำดับ", type: "number" },
              { key: "iconName", label: "Icon Name (Map, Checklist, Engineering)", type: "text" },
              { key: "title", label: "หัวข้อ", type: "text" },
              { key: "desc", label: "คำอธิบาย", type: "text" },
            ]}
          />
        </section>

        {/* 8. Package Add-ons (Topup) */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">7. แพ็กเกจเสริม — เติมเงิน (Topup Add-ons)</h2>
            <p className="text-sm text-gray-500">จัดการการ์ดแพ็กเกจเสริมเติมเงิน</p>
          </div>
          <HomeSectionEditor
            sectionKey="packageOffersTopup"
            sectionLabel="Topup Add-ons"
            sectionDescription="การ์ดแพ็กเกจเสริมสำหรับซิมเติมเงิน"
            initialData={s(findSection("packageOffersTopup"))}
            fields={["jsonItems"]}
            jsonItemFields={[
              { key: "title", label: "ชื่อ", type: "text" },
              { key: "detail", label: "รายละเอียด", type: "text" },
              { key: "image", label: "รูปภาพ (URL)", type: "text" },
              { key: "hoverImage", label: "รูป Hover (URL)", type: "text" },
              { key: "path", label: "ลิงก์ (Path)", type: "text" },
            ]}
          />
        </section>

        {/* 9. Package Add-ons (Monthly) */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">8. แพ็กเกจเสริม — รายเดือน (Monthly Add-ons)</h2>
            <p className="text-sm text-gray-500">จัดการการ์ดแพ็กเกจเสริมรายเดือน</p>
          </div>
          <HomeSectionEditor
            sectionKey="packageOffersMonthly"
            sectionLabel="Monthly Add-ons"
            sectionDescription="การ์ดแพ็กเกจเสริมสำหรับซิมรายเดือน"
            initialData={s(findSection("packageOffersMonthly"))}
            fields={["jsonItems"]}
            jsonItemFields={[
              { key: "title", label: "ชื่อ", type: "text" },
              { key: "detail", label: "รายละเอียด", type: "text" },
              { key: "image", label: "รูปภาพ (URL)", type: "text" },
              { key: "hoverImage", label: "รูป Hover (URL)", type: "text" },
              { key: "path", label: "ลิงก์ (Path)", type: "text" },
            ]}
          />
        </section>

        {/* 10. Home Internet */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">9. เน็ตบ้าน (Home Internet)</h2>
            <p className="text-sm text-gray-500">จัดการการ์ดเน็ตบ้าน</p>
          </div>
          <HomeSectionEditor
            sectionKey="homeInternet"
            sectionLabel="Home Internet"
            sectionDescription="การ์ดข้อมูลบริการเน็ตบ้าน: ลูกค้าใหม่ ลูกค้าปัจจุบัน สมัครกับเจ้าหน้าที่"
            initialData={s(findSection("homeInternet"))}
            fields={["jsonItems"]}
            jsonItemFields={[
              { key: "img", label: "รูปภาพ (URL)", type: "text" },
              { key: "title", label: "หัวข้อ", type: "text" },
              { key: "description", label: "คำอธิบาย", type: "text" },
              { key: "path", label: "ลิงก์ (Path)", type: "text" },
            ]}
          />
        </section>

        {/* 11. Promo Banner */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">10. แบนเนอร์โปรโมชัน (Promo Banner)</h2>
            <p className="text-sm text-gray-500">จัดการภาพแบนเนอร์โปรโมชันด้านล่าง</p>
          </div>
          <HomeSectionEditor
            sectionKey="promoBanner"
            sectionLabel="Promo Banner"
            sectionDescription="ภาพแบนเนอร์โปรโมชันท้ายหน้าแรก"
            initialData={s(findSection("promoBanner"))}
            fields={["title", "imageUrl", "linkUrl"]}
          />
        </section>

        {/* 12. Site Settings */}
        <section>
          <div className="mb-6 pb-2 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">11. จัดการ Footer, Header (Site Settings)</h2>
            <p className="text-sm text-gray-500">จัดการข้อมูลติดต่อ โลโก้ และเนื้อหาแนะนำเว็บไซต์</p>
          </div>
          <SiteSettingsForm initialSettings={s(settingsFallback)} />
        </section>
      </div>
    </div>
  );
}
