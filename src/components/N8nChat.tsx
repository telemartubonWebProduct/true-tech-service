"use client";

import { useEffect } from "react";

export default function N8nChat({ webhookUrl }: { webhookUrl: string }) {
  useEffect(() => {
    if (!webhookUrl) return;

    // Manually inject the CSS to bypass Next.js / Turbopack CSS parsing errors for vendor stylesheets.
    const cssId = 'n8n-chat-css';
    if (!document.getElementById(cssId)) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/style.css';
        document.head.appendChild(link);
    }

    // Dynamically import createChat since it relies on window/document (client side only)
    import("@n8n/chat")
      .then(({ createChat }) => {
        createChat({
          webhookUrl,
          initialMessages: [
            "สวัสดีครับ! 👋",
            "เริ่มต้นการสนทนาได้เลยครับ เราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมงครับ",
          ],
          i18n: {
            en: {
               title: "สวัสดีครับ! 👋",
              subtitle: "เริ่มต้นการสนทนาได้เลยครับ เราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมงครับ",
              footer: "",
              getStarted: "สนทนาใหม่",
              inputPlaceholder: "พิมพ์คำถามของคุณ..",
              closeButtonTooltip: "ปิด",
            },
            th: {
              title: "สวัสดีครับ! 👋",
              subtitle: "เริ่มต้นการสนทนาได้เลยครับ เราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมงครับ",
              footer: "",
              getStarted: "สนทนาใหม่",
              inputPlaceholder: "พิมพ์คำถามของคุณ..",
              closeButtonTooltip: "ปิด",
            },
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load n8n chat:", err);
      });
  }, [webhookUrl]);

  return null;
}
