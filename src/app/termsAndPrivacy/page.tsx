import type { Metadata } from "next";
import TermsAndPrivacyClient from "./TermsAndPrivacyClient";

export const metadata: Metadata = {
  title: "ข้อตกลงและเงื่อนไข | นโยบายความเป็นส่วนตัว",
  description:
    "ข้อตกลงและเงื่อนไขการให้บริการ (Terms of Service) และนโยบายความเป็นส่วนตัว (Privacy Policy) ของ Telemart Ubon สอดคล้องกับ PDPA พ.ศ. 2562",
  keywords: [
    "ข้อตกลง", "เงื่อนไข", "นโยบายความเป็นส่วนตัว", "Privacy Policy",
    "Terms of Service", "PDPA", "Telemart",
  ],
  openGraph: {
    title: "ข้อตกลงและเงื่อนไข | นโยบายความเป็นส่วนตัว | Telemart Ubon",
    description: "ข้อตกลงและนโยบายความเป็นส่วนตัว สอดคล้องกับ PDPA พ.ศ. 2562",
    url: "https://www.truetechservice.com/termsAndPrivacy",
  },
  twitter: {
    title: "ข้อตกลงและเงื่อนไข | Telemart Ubon",
    description: "ข้อตกลงและนโยบายความเป็นส่วนตัว สอดคล้องกับ PDPA พ.ศ. 2562",
  },
  alternates: { canonical: "https://www.truetechservice.com/termsAndPrivacy" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function TermsAndPrivacyPage() {
  return <TermsAndPrivacyClient />;
}
