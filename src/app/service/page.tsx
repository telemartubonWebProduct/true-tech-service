import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Telemart Ubon",
  description:
    "ติดต่อ Telemart Ubon สอบถามข้อมูลเน็ตบ้าน ซิมมือถือ โซล่าเซลล์ หรือบริการอื่นๆ โทร +66 910 192 552 หรือส่งข้อความผ่านฟอร์ม อุบลราชธานี",
  keywords: [
    "ติดต่อ Telemart", "Telemart Ubon", "ติดต่อเน็ตบ้าน", "สมัครเน็ตบ้าน",
    "ติดต่อทรูออนไลน์ อุบลราชธานี",
  ],
  openGraph: {
    title: "ติดต่อเรา | Telemart Ubon",
    description: "ติดต่อทีมงาน Telemart Ubon สอบถามข้อมูลเน็ตบ้าน ซิมมือถือ โซล่าเซลล์",
    url: "https://www.truetechservice.com/service",
  },
  twitter: {
    title: "ติดต่อเรา | Telemart Ubon",
    description: "ติดต่อทีมงาน Telemart Ubon สอบถามข้อมูลเน็ตบ้าน ซิมมือถือ โซล่าเซลล์",
  },
  alternates: { canonical: "https://www.truetechservice.com/service" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function ServicePage() {
  return <ContactPageClient />;
}
