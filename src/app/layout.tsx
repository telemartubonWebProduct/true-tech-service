// app/layout.tsx (TypeScript) หรือ app/layout.jsx (JavaScript)
import "./globals.css";
import { Prompt } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Navbar from "../components/layout/Navbar";
import { ToastContainer } from "react-toastify";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

// 1) เรียกใช้ฟอนต์ Prompt จาก next/font/google
const prompt = Prompt({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: {
    default: "Telemart Ubon | เน็ตบ้าน มือถือ โซล่าเซลล์",
    template: "%s | Telemart Ubon",
  },
  description:
    "Telemart Ubon ให้บริการ เน็ตบ้านทรูออนไลน์ ซิมมือถือทรู-ดีแทค แพ็กเกจความบันเทิง โซล่าเซลล์ครบวงจร และอุปกรณ์ไอที ราคาพิเศษ สมัครง่าย บริการถึงที่ ติดต่อทีมผู้เชี่ยวชาญได้ตลอด 24 ชั่วโมง",
  metadataBase: new URL("https://telemart-ubon.com"),
  openGraph: {
    siteName: "Telemart Ubon",
    locale: "th_TH",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Telemart Ubon" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import CookieConsent from "../components/layout/CookieConsent";
import { prisma } from "@/src/lib/prisma";
import { SiteSettingsProvider } from "@/src/context/SiteSettingsContext";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  return (
    // 2) เพิ่ม className จากตัวแปร prompt.className ตรงแท็ก html หรือ body
    <html lang="th" className={prompt.className} suppressHydrationWarning>
      <head>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18007307609"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'AW-18007307609');
            `,
          }}
        />
      </head>
      <body>
        <SiteSettingsProvider settings={{ lineSupportUrl: siteSettings?.lineSupportUrl || undefined }}>
          <AppRouterCacheProvider>
            <CookieConsent />
            <ThemeProvider theme={theme}>
              <div className="min-h-screen flex flex-col">
                <Navbar siteSettings={siteSettings} />
                <ScrollToTop />
                <main className="flex-1">{children}</main>
                <Footer siteSettings={siteSettings} />
              </div>
              <ToastContainer position="bottom-right" theme="dark" />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
