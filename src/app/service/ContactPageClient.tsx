"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, TextField } from "@mui/material";

import Link from "next/link";
import { contactInfo } from "@/src/data/contact";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent submission if the message field is empty
    if (!formData.message.trim()) {
      setStatus("error");
      alert("Please enter a message before submitting.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json(); // Parse JSON response

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        
        setStatus("error");
        console.error("Error:", responseData.message || "Unknown error");
      }
    } catch (error) {
      setStatus("error");
      console.error("Network Error:", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Contact Us</h1>
        <p className="text-gray-600 mb-12">
          หากคุณมีคำถามข้อสงสัย หรือ คำขอให้ช่วยเหลือ กรุณาติดต่อเราได้ที่นี่
        </p>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 bg-black text-white rounded-xl p-6 h-full"
          >
            <h2 className="text-xl font-semibold mb-4">ข้อมูลติดต่อ</h2>
            <p className="text-gray-300 mb-6">Say something to start a live chat!</p>

            <div className="space-y-2 mb-8">
              <p>
                <strong>เบอร์โทรศัพท์:</strong> {contactInfo.phone}
              </p>
              <p>
                <strong>อีเมล:</strong> {contactInfo.email}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              {contactInfo.socialLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <Button className={`bg-gray-700 px-4 py-2 rounded-lg transition text-white ${link.colorClass}`}>
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-white shadow-lg rounded-xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <TextField
                    label="ชื่อ"
                    type="text"
                    name="firstName"
                    required
                    className="w-full px-4 py-2"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="standard"
                    aria-label="First Name"
                  />
                </div>
                <div>
                  <TextField
                    label="นามสกุล"
                    type="text"
                    name="lastName"
                    required
                    className="w-full px-4 py-2"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="standard"
                    aria-label="Last Name"
                  />
                </div>
              </div>

              <div>
                <TextField
                  label="อีเมล"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2"
                  value={formData.email}
                  onChange={handleChange}
                  variant="standard"
                  aria-label="Email"
                />
              </div>

              <div>
                <TextField
                  label="เบอร์โทรศัพท์"
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-2"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="standard"
                  aria-label="Phone"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">ข้อความ</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={formData.message}
                  onChange={handleChange}
                  aria-label="Message"
                />
              </div>

              {/* Feedback messages */}
              {status === "sending" && <p className="text-blue-500">Sending...</p>}
              {status === "success" && <p className="text-green-500">Message sent successfully!</p>}
              {status === "error" && <p className="text-red-500">Failed to send message. Try again later.</p>}

              <div className="text-xs text-gray-500 mt-4 mb-4">
                ข้อมูลที่คุณกรอกจะถูกใช้เพื่อการติดต่อกลับและให้บริการโดย บริษัท เทเลมาร์ท คอมมิวนิเคชั่น จำกัด (ตัวแทนจำหน่ายอย่างเป็นทางการ) เท่านั้น 
                การกดส่งข้อความถือว่าคุณยอมรับ <Link href="/termsAndPrivacy" className="text-blue-600 hover:underline">นโยบายความเป็นส่วนตัว</Link> ของเรา
              </div>

              <div className="w-full flex justify-end items-center">
                <Button
                  type="submit"
                  className="bg-red-600 text-white hover:bg-red-700"
                  variant="contained"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
