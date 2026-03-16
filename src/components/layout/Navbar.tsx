"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useHideOnScroll } from "@/src/hooks/useScrollDirection";
import { mockData } from "@/src/mocks/nav-mock";




const containerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function Navbar({ siteSettings }: { siteSettings?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const hidden = useHideOnScroll(50);
  const pathname = usePathname();

  const isHiddenRoute = pathname?.startsWith("/dashboard") || pathname?.startsWith("/backend");
  if (isHiddenRoute) return null;

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
  <motion.div
  className="overflow-hidden block"
  animate={{ height: hidden ? 0 : "auto" }}
  transition={{ duration: 0.3 }}
>
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center space-x-3">
            <Link
              href="/about"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              aria-label="เกี่ยวกับบริษัท Telemart"
            >
              บริษัทของเรา
            </Link>
            <span className="text-slate-300 text-xs">|</span>
            <Link
              href="/termsAndPrivacy"
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              aria-label="นโยบายความเป็นส่วนตัวและเงื่อนไขการใช้งาน"
            >
              Terms & Privacy
            </Link>
          </div>

          <div className="mt-1 sm:mt-0 flex items-center">
            <Link
              href="https://www.telemartmanagement.com/"
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-red-500 flex items-center gap-1 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ลงชื่อเข้าสู่ระบบจัดการ"
            >
              <span>เข้าสู่ระบบ</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>




      <nav className="relative w-full bg-white text-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10">
          <Link href="/home" className="flex items-center" aria-label="Telemart Ubon หน้าแรก">
            <Image
              src={siteSettings?.logoUrl || "/logo.png"}
              alt="Telemart Ubon Logo – เน็ตบ้านและมือถือ ทรู ดีแทค"
              width={140}
              height={45}
              priority
              className="object-contain"
            />
          </Link>

          <div className="hidden flex-1 items-center justify-end space-x-8 md:flex">
            {mockData.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="font-semibold text-gray-700 hover:text-red-600">
                  {item.title}
                </button>
                {activeDropdown === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={containerVariants}
                    className="absolute left-0 flex w-48 flex-col rounded-md bg-white py-2 shadow-lg"
                  >
                    {item.subItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        href={subItem.link}
                        className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="flex md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isOpen ? (
                <ClearIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex h-screen w-full flex-col bg-white px-4 py-6 md:hidden"
          >
            {mockData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 py-3">
                <button
                  className="flex w-full items-center justify-between font-semibold text-gray-700"
                  onClick={() => toggleDropdown(index)}
                >
                  <span>{item.title}</span>
                  <ExpandMoreIcon
                    className={`transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mt-2 flex flex-col space-y-2 pl-4"
                  >
                    {item.subItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        href={subItem.link}
                        className="text-sm text-gray-600 hover:text-red-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  );
}
