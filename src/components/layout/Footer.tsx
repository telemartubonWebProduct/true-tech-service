"use client";

import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/src/context/SiteSettingsContext";

const Footer = ({ siteSettings }: { siteSettings?: any }) => {
  const pathname = usePathname();
  const isHiddenRoute = pathname?.startsWith("/dashboard") || pathname?.startsWith("/backend");
  const { lineSupportUrl } = useSiteSettings();

  if (isHiddenRoute) return null;

  return (
    <footer className="bg-black text-white">
      <Container maxWidth="lg" className="py-10">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" component="h2" className="mb-4 font-bold uppercase tracking-wider text-red-500">
              Company
            </Typography>
            <ul>
             
              <li>
                <Link href="/service" color="inherit" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" component="h2" className="mb-4 font-bold uppercase tracking-wider text-red-500">
              Services
            </Typography>
            <ul>
              <li>
                <Link href="/topup" color="inherit" className="hover:text-gray-400">
                  Internet
                </Link>
              </li>
              <li>
                <Link href="/broadband" color="inherit" className="hover:text-gray-400">
                  Wifi
                </Link>
              </li>
              <li>
                <Link href="/wEnergy" color="inherit" className="hover:text-gray-400">
                  SolarCell
                </Link>
              </li>
            </ul>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" component="h2" className="mb-4 font-bold uppercase tracking-wider text-red-500">
              Support
            </Typography>
            <ul>
              <li>
                <Link href={lineSupportUrl} target="_blank" rel="noopener noreferrer" color="inherit" className="hover:text-gray-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/termsAndPrivacy" color="inherit" className="hover:text-gray-400">
                  Terms and Privacy
                </Link>
              </li>
             
            </ul>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" component="h2" className="mb-4 font-bold uppercase tracking-wider text-red-500">
              Follow Us
            </Typography>
            <Box className="flex flex-col space-y-4">
              <Box className="flex items-center space-x-2">
                <motion.img
                  src="/assets/etc/lineScanAddFriend.webp"
                  alt="สแกนเพิ่มเพื่อน Line CRM Telemart"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
                <Typography
                  fontFamily={"Prompt"}
                  variant="body1"
                  color="#ffffff"
                >
                  ไลน์ไอดี: @341tmfte
                </Typography>
              </Box>

              {siteSettings?.footerImageUrl && (
                <Box className="flex items-center mt-2">
                  <motion.img
                    src={siteSettings.footerImageUrl}
                    alt="Footer Logo"
                    className="h-12 object-contain"
                  />
                </Box>
              )}

              <Box className="mt-4">
                <Typography
                  fontFamily={"Prompt"}
                  variant="body1"
                  color="#ffffff"
                  className="mb-1 text-red-400 font-semibold"
                >
                  ติดต่อรับบริการ
                </Typography>
                {siteSettings?.email && (
                  <Typography
                    fontFamily={"Prompt"}
                    variant="body2"
                    color="#ffffff"
                    className="mb-1"
                  >
                    อีเมล: {siteSettings.email}
                  </Typography>
                )}
                {siteSettings?.phone ? (
                  siteSettings.phone.split(',').map((p: string, i: number) => (
                    <Typography
                      key={i}
                      fontFamily={"Prompt"}
                      variant="body2"
                      color="#ffffff"
                    >
                      {p.trim()}
                    </Typography>
                  ))
                ) : (
                  <>
                    <Typography fontFamily={"Prompt"} variant="body2" color="#ffffff">0910192552</Typography>
                    <Typography fontFamily={"Prompt"} variant="body2" color="#ffffff">0902518964</Typography>
                    <Typography fontFamily={"Prompt"} variant="body2" color="#ffffff">0841041506</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className="mt-8 border-t border-gray-700 pt-4 text-center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Telemart Communication co.,ltd.
            copyright all. right reserved reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
