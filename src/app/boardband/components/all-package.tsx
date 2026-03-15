"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMemo, useState, useRef, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type PerkItem = { text: string; imageUrl?: string };

export type PackageItem = {
  id: number | string;
  category_id: number;
  name: string;
  price: number;
  price_note?: string | null;
  download_speed?: number | null;
  upload_speed?: number | null;
  speed_unit?: string | null;
  description?: string | null;
  buy_link?: string | null;
  display_order?: number | null;
  is_active: boolean;
  promo_badge?: string | null;
  highlight_price?: number | null;
  contract_months?: number | null;
  perks?: PerkItem[];
  freebies?: PerkItem[];
  header_theme?: "netflix" | "youtube" | "generic";
  theme_color?: string;
  header_image?: string; 
};

const mockPackages: PackageItem[] = [
  {
    id: 101,
    category_id: 1,
    name: "Super Netflix Basic 999",
    price: 999,
    highlight_price: 799,
    download_speed: 1000,
    upload_speed: 500,
    speed_unit: "Mbps",
    contract_months: 24,
    promo_badge: "แนะนำ🔥",
    perks: [
      { text: "True Gigatex Fiber Router WiFi6", imageUrl: "/images/router-icon.png" },
      { text: "TrueIDTV GEN 3 พร้อม App AI Fitness & Game", imageUrl: "/images/trueid-icon.png" },
      { text: "สิทธิ์รับชม Netflix Basic Plan", imageUrl: "/images/netflix-icon.png" },
      { text: "TrueID+ นาน 12 เดือน", imageUrl: "/images/trueid-plus-icon.png" },
    ],
    buy_link: "#",
    display_order: 1,
    is_active: true,
    header_theme: "netflix",
  },
  {
    id: 102,
    category_id: 1,
    name: "YouTube Premium",
    price: 629,
    download_speed: 500,
    upload_speed: 500,
    speed_unit: "Mbps",
    contract_months: 24,
    perks: [
      { text: "True Gigatex Fiber Router WiFi6" },
      { text: "YouTube Premium", imageUrl: "/images/yt-icon.png" },
      { text: "YouTube Music", imageUrl: "/images/ytm-icon.png" },
    ],
    buy_link: "#",
    display_order: 2,
    is_active: true,
    header_theme: "youtube",
  },
  {
    id: 103,
    category_id: 1,
    name: "Asian Content Lover 599",
    price: 599,
    download_speed: 500,
    upload_speed: 500,
    speed_unit: "Mbps",
    contract_months: 24,
    perks: [
      { text: "True Gigatex Fiber Router WiFi6" },
      { text: "TrueIDTV GEN 3" },
      { text: "AI Fitness ทดลองใช้ฟรี 30 วัน" },
      { text: "AI Game ทดลองใช้ฟรี 30 วัน" },
      { text: "iQIYI 24 เดือน" },
    ],
    freebies: [
      { text: "รับฟรี อุปกรณ์พิเศษรับสัญญาณมือถือ สลับสัญญาณอัตโนมัติ" },
    ],
    buy_link: "#",
    display_order: 3,
    is_active: true,
    header_theme: "generic",
  },
  {
    id: 104,
    category_id: 1,
    name: "TrueOnline 500/500",
    price: 499,
    download_speed: 500,
    upload_speed: 500,
    speed_unit: "Mbps",
    contract_months: 24,
    perks: [],
    freebies: [{ text: "เราเตอร์ WiFi 6 เน็ตแรงครอบคลุมกว่าเดิม" }],
    buy_link: "#",
    display_order: 4,
    is_active: true,
    header_theme: "generic",
  },
];

function formatPriceTHB(value: number) {
  return new Intl.NumberFormat("th-TH").format(value);
}

function PackageCard({ pkg }: { pkg: PackageItem }) {
  const header = useMemo(() => {
    if (pkg.header_theme === "netflix")
      return {
        title: "Super Netflix",
        gradient: "linear-gradient(90deg, #111827 0%, #dc2626 100%)",
        color: "#fff",
      };
    if (pkg.header_theme === "youtube")
      return {
        title: "YouTube Premium",
        gradient: "linear-gradient(90deg, #3b82f6 0%, #0ea5e9 100%)",
        color: "#fff",
      };
    return {
      title: pkg.name.includes("TrueOnline") ? "โปรลับ เน็ตบ้านทรู" : "ร้านค้า อินฟลู",
      gradient: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)",
      color: "#fff",
    };
  }, [pkg.header_theme, pkg.name]);

  const hasSpecialPriceRow = !!pkg.highlight_price;

  return (
    <Card
      component={motion.div}
      initial={{ y: 0, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)" }}
      whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {pkg.header_image ? (
        <Box
          component="img"
          src={pkg.header_image}
          alt={pkg.name}
          sx={{ width: "100%", height: 110, objectFit: "cover" }}
        />
      ) : (
        <Box
          sx={{
            px: 2,
            height: 90,
            display: "flex",
            alignItems: "flex-start",
            pt: 2,
            color: header.color,
            backgroundImage: header.gradient,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography sx={{ fontWeight: 900, fontSize: "1rem" }}>
              {header.title}
            </Typography>
            {pkg.promo_badge && (
              <Chip
                label={pkg.promo_badge}
                size="small"
                sx={{
                  bgcolor: "#fff",
                  color: "error.main",
                  fontWeight: 900,
                  fontSize: "0.65rem",
                  height: 20,
                }}
              />
            )}
          </Stack>
        </Box>
      )}

      <CardContent
        sx={{
          p: "16px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 800, mb: 1, fontSize: "0.75rem", color: "#222" }}
        >
          {pkg.name}
        </Typography>

        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <Box>
            {pkg.description && !pkg.download_speed && (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "#555",
                  mb: 0.5,
                }}
              >
                {pkg.description}
              </Typography>
            )}
            {pkg.download_speed && pkg.upload_speed && (
              <Typography
                sx={{
                  fontWeight: 700, // Lightened the label slightly per screenshot to keep focus on numbers
                  fontSize: "0.65rem",
                  color: "#555",
                  mb: 0.5,
                }}
              >
                ความเร็ว (ดาวน์โหลด/อัปโหลด)
              </Typography>
            )}
            {pkg.download_speed ? (
              <Box>
                <Stack direction="row" alignItems="flex-start" sx={{ gap: 0.2 }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "2rem",
                      lineHeight: 0.8,
                      color: "#333",
                      letterSpacing: "-0.5px"
                    }}
                  >
                    {pkg.download_speed}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      lineHeight: 1,
                      color: "#555",
                    }}
                  >
                    {pkg.speed_unit ?? "Mbps"}
                  </Typography>
                </Stack>
                {pkg.upload_speed && (
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "#444",
                      mt: 0.5,
                      lineHeight: 1
                    }}
                  >
                    /{pkg.upload_speed}{pkg.speed_unit}
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "2rem",
                  lineHeight: 1,
                  color: "#333",
                }}
              >
                {formatPriceTHB(pkg.price)}
              </Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "right", display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-end"
              sx={{ gap: 0.2 }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  color: "#3b82f6",
                  lineHeight: 0.8,
                  letterSpacing: '-0.5px'
                }}
              >
                {formatPriceTHB(pkg.price)}
              </Typography>
              <Stack alignItems="flex-start">
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    color: "#3b82f6",
                    lineHeight: 1,
                  }}
                >
                  บาท
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    color: "#3b82f6",
                    lineHeight: 1,
                  }}
                >
                  /{pkg.price_note ?? "เดือน"}
                </Typography>
              </Stack>
            </Stack>
            {pkg.contract_months ? (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.55rem",
                  color: "#888",
                  mt: 1,
                  display: "block",
                }}
              >
                ระยะสัญญา {pkg.contract_months} เดือน
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.55rem",
                  color: "#888",
                  mt: 1,
                  display: "block",
                }}
              >
                (ไม่รวม VAT)
              </Typography>
            )}
          </Box>
        </Stack>

        {hasSpecialPriceRow ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                พิเศษ
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#555",
                  fontSize: "0.65rem",
                  lineHeight: 1.2,
                }}
              >
                ลูกค้าทรู-ดีแทครายเดือน
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#555",
                  fontSize: "0.65rem",
                  lineHeight: 1.2,
                }}
              >
                ราคาพิเศษเพียง
              </Typography>
            </Box>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-end"
              sx={{ gap: 0.2 }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.4rem",
                  color: "#ef4444",
                  lineHeight: 0.8,
                  letterSpacing: '-0.5px'
                }}
              >
                {formatPriceTHB(pkg.highlight_price!)}
              </Typography>
              <Stack alignItems="flex-start">
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    color: "#ef4444",
                    lineHeight: 1,
                  }}
                >
                  บาท
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    color: "#ef4444",
                    lineHeight: 1,
                  }}
                >
                  /เดือน
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Box sx={{ mb: 2, height: 0 }} /> // Fixed spacer when not present to align all cards
        )}

        <Box sx={{ flex: 1, mt: 1 }}>
          {(pkg.perks && pkg.perks.length > 0) ? (
            <Typography
              sx={{
                fontWeight: 900,
                mb: 1.5,
                fontSize: "0.85rem",
                color: "#111",
              }}
            >
              รับทันที!
            </Typography>
          ) : (pkg.freebies && pkg.freebies.length > 0) ? (
            <Typography
              sx={{
                fontWeight: 900,
                mb: 1.5,
                fontSize: "0.85rem",
                color: "#111",
              }}
            >
              พิเศษ! <span style={{ fontWeight: 600, color: '#444' }}>รับฟรีอุปกรณ์สุดคุ้ม</span>
            </Typography>
          ) : null}

          <Stack
            spacing={0}
            sx={{
              "& > *:not(:last-child)": {
                borderBottom: "1px solid",
                borderColor: "grey.100",
                paddingBottom: 1.5,
                marginBottom: 1.5,
              },
            }}
          >
            {pkg.perks?.map((perk, idx) => (
              <Stack
                key={`perk-${idx}`}
                direction="row"
                gap={1.5}
                alignItems="center"
              >
                {perk.imageUrl ? (
                  <Box
                    component="img"
                    src={perk.imageUrl}
                    alt="icon"
                    sx={{
                      width: 22,
                      height: 22,
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 20, color: "success.main", flexShrink: 0 }}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#444",
                    lineHeight: 1.2,
                    fontSize: "0.75rem",
                  }}
                >
                  {perk.text}
                </Typography>
              </Stack>
            ))}

            {pkg.freebies &&
              pkg.freebies.length > 0 &&
              pkg.freebies.map((freebie, idx) => (
                <Stack
                  key={`freebie-${idx}`}
                  direction="row"
                  gap={1.5}
                  alignItems="center"
                >
                  {freebie.imageUrl ? (
                    <Box
                      component="img"
                      src={freebie.imageUrl}
                      alt="icon"
                      sx={{
                        width: 22,
                        height: 22,
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <img 
                      src="/images/router-icon.png" 
                      alt="router" 
                      style={{ width: 22, height: 22, objectFit: "contain", opacity: 0.5 }} 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#444",
                      lineHeight: 1.3,
                      fontSize: "0.75rem",
                    }}
                  >
                    {freebie.text}
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </Box>

        <Box component={motion.div} whileTap={{ scale: 0.96 }} sx={{ mt: 3 }}>
          <Button
            fullWidth
            href={pkg.buy_link ?? "#"}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: '50px',
              py: 0.9,
              fontWeight: 800,
              fontSize: "0.85rem",
              backgroundImage: "linear-gradient(90deg, #3b82f6, #6366f1)",
              textTransform: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundImage: "linear-gradient(90deg, #2563eb, #4f46e5)",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              },
            }}
          >
            สนใจสมัครบริการ
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

interface AllPackageProps {
  packages?: PackageItem[];
}

export default function AllPackage({
  packages = mockPackages,
}: AllPackageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStarted = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Check arrow visibility
    setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    
    // Update active dot index
    const cardElements = scrollRef.current.children;
    if (cardElements.length > 0) {
      const cardWidth = (cardElements[0] as HTMLElement).offsetWidth;
      // using scrollLeft to calculate which card is most visible
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < packages.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(handleScroll, 100);
    window.addEventListener("resize", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleScroll);
    };
  }, [packages]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStarted.current = false; // Reset drag status
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    
    if (Math.abs(walk) > 5) {
      dragStarted.current = true; // Confirmed it's a drag, not just a click
    }
    
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const preventClickWhenDragging = (e: MouseEvent) => {
    if (dragStarted.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: "#f8fafc",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "primary.main", mb: 1 }}
        >
          เน็ตบ้านไฟเบอร์อัจฉริยะอันดับ 1
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "primary.main" }}
        >
          ที่ตอบโจทย์ ไลฟ์สไตล์คุณ
        </Typography>
      </Box>
      <Box sx={{ position: "relative", maxWidth: 1280, mx: "auto" }}>
        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClickCapture={preventClickWhenDragging}
          sx={{
            display: "flex",
            gap: { xs: 2, md: 3 },
            overflowX: "auto",
            pb: 4,
            pt: 2,
            px: { xs: 2, md: 4 },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
              scrollSnapType: "none",
            },
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "divider",
              borderRadius: 8,
              "&:hover": {
                backgroundColor: "text.secondary",
              },
            },
            msOverflowStyle: "none", // IE and Edge
            scrollbarWidth: "none",  // Firefox (Hide completely for clean look as we use drag)
          }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                minWidth: "300px",
                maxWidth: "340px",
                width: "88%",
                scrollSnapAlign: "start",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                userSelect: "none",
              }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </Box>

        {/* Right Arrow Guide */}
        <AnimatePresence>
          {showRightArrow && packages.length > 0 && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{
                position: "absolute",
                right: { xs: 8, md: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                display: { xs: "flex", lg: "none" },
              }}
            >
              <IconButton
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth =
                      scrollRef.current.querySelector("div")?.clientWidth ||
                      300;
                    scrollRef.current.scrollBy({
                      left: cardWidth + 24,
                      behavior: "smooth",
                    });
                  }
                }}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  width: 44,
                  height: 44,
                  color: "primary.main",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 1)",
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 18, ml: 0.5 }} />
              </IconButton>
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* Pagination indicators to match exactly the image */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        {packages.map((_, index) => (
          <Box
            key={index}
            component={motion.div}
            animate={{
              width: activeIndex === index ? 24 : 8,
              backgroundColor: activeIndex === index ? "#ef4444" : "#e5e7eb"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            sx={{ height: 4, borderRadius: 4 }}
          />
        ))}
      </Box>
    </Box>
  );
}
