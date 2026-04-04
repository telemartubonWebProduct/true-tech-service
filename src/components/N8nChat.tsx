"use client";

import { useEffect } from "react";
import "@n8n/chat/style.css";

export default function N8nChat({ webhookUrl }: { webhookUrl: string }) {
  useEffect(() => {
    if (!webhookUrl) return;

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
            },
            th: {
              title: "สวัสดีครับ! 👋",
              subtitle: "เริ่มต้นการสนทนาได้เลยครับ เราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมงครับ",
              footer: "",
              getStarted: "สนทนาใหม่",
              inputPlaceholder: "พิมพ์คำถามของคุณ..",
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
