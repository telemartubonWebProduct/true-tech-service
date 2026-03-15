"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Link } from "@mui/material";

const COOKIE_KEY = "cookie-consent-accepted";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const accepted = typeof window !== "undefined"
        ? window.localStorage.getItem(COOKIE_KEY)
        : null;

      if (!accepted) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, "true");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const handleClose = () => {
    // ปิดอย่างเดียว (สำหรับผู้ใช้ที่ยังไม่อยากยอมรับ)
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        bgcolor: "#0f172a",
        color: "white",
        px: { xs: 2, sm: 4 },
        py: 2,
        boxShadow: "0 -4px 12px rgba(15,23,42,0.4)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 0.5, fontFamily: "Prompt" }}
          >
            เราใช้คุกกี้เพื่อประสบการณ์ที่ดียิ่งขึ้น
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, fontSize: "0.85rem", fontFamily: "Prompt" }}
          >
            เว็บไซต์นี้ใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์ของคุณ 
            วิเคราะห์การใช้งานเว็บไซต์ และแสดงเนื้อหาที่เหมาะสมกับคุณ 
            ข้อมูลส่วนบุคคลของคุณจะถูกจัดการตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            คุณสามารถดูรายละเอียดเพิ่มเติมได้ที่{" "}
            <Link
              href="/termsAndPrivacy"
              underline="always"
              sx={{ color: "#38bdf8", fontWeight: 500 }}
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            gap: 1,
            alignSelf: { xs: "stretch", sm: "center" },
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
            sx={{
              borderColor: "rgba(148,163,184,0.6)",
              color: "rgba(226,232,240,0.9)",
              fontFamily: "Prompt",
              textWrap: "nowrap",
            }}
          >
            ปิดชั่วคราว
          </Button>
          <Button
            variant="contained"
            onClick={handleAccept}
            sx={{
              bgcolor: "#22c55e",
              "&:hover": { bgcolor: "#16a34a" },
              fontFamily: "Prompt",
              textWrap: "nowrap",
            }}
          >
            ยอมรับคุกกี้ทั้งหมด
          </Button>
        </Box>
      </Box>
    </Box>
  );
}