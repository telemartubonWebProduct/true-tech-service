"use client";

import { useState, useRef, useEffect } from "react";
import { uploadBannerImage } from "@/src/lib/storage";

interface HeroData {
  id: string;
  tagline: string | null;
  rotatingTexts: string[];
  titlePrefix: string | null;
  description: string | null;
  ctaPrimaryLabel: string | null;
  ctaPrimaryHref: string | null;
  ctaSecondaryLabel: string | null;
  ctaSecondaryHref: string | null;
  backgroundImageUrl: string | null;
}

interface Props {
  initialData: HeroData | null;
}

export default function HeroSectionForm({ initialData }: Props) {
  const [tagline, setTagline] = useState(initialData?.tagline ?? "TRUE TELEMART COMMUNICATION");
  const [rotatingTexts, setRotatingTexts] = useState<string[]>(
    (initialData?.rotatingTexts as string[]) ?? []
  );
  const [newText, setNewText] = useState("");
  const [titlePrefix, setTitlePrefix] = useState(initialData?.titlePrefix ?? "ที่สุดของ");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [ctaPrimaryLabel, setCtaPrimaryLabel] = useState(initialData?.ctaPrimaryLabel ?? "");
  const [ctaPrimaryHref, setCtaPrimaryHref] = useState(initialData?.ctaPrimaryHref ?? "");
  const [ctaSecondaryLabel, setCtaSecondaryLabel] = useState(initialData?.ctaSecondaryLabel ?? "");
  const [ctaSecondaryHref, setCtaSecondaryHref] = useState(initialData?.ctaSecondaryHref ?? "");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(initialData?.backgroundImageUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Sync state when props change (after router.refresh())
  useEffect(() => {
    if (initialData) {
      setTagline(initialData.tagline ?? "TRUE TELEMART COMMUNICATION");
      setRotatingTexts((initialData.rotatingTexts as string[]) ?? []);
      setTitlePrefix(initialData.titlePrefix ?? "ที่สุดของ");
      setDescription(initialData.description ?? "");
      setCtaPrimaryLabel(initialData.ctaPrimaryLabel ?? "");
      setCtaPrimaryHref(initialData.ctaPrimaryHref ?? "");
      setCtaSecondaryLabel(initialData.ctaSecondaryLabel ?? "");
      setCtaSecondaryHref(initialData.ctaSecondaryHref ?? "");
      setBackgroundImageUrl(initialData.backgroundImageUrl ?? "");
    }
  }, [initialData]);

  const addRotatingText = () => {
    const trimmed = newText.trim();
    if (trimmed && !rotatingTexts.includes(trimmed)) {
      setRotatingTexts([...rotatingTexts, trimmed]);
      setNewText("");
    }
  };

  const removeRotatingText = (index: number) => {
    setRotatingTexts(rotatingTexts.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setBackgroundImageUrl(previewUrl);
  };

  const removeImage = () => {
    setImageFile(null);
    setBackgroundImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      let finalImageUrl = backgroundImageUrl || null;
      if (imageFile) {
        finalImageUrl = await uploadBannerImage(imageFile);
      } else if (backgroundImageUrl && !backgroundImageUrl.includes("blob:")) {
        finalImageUrl = backgroundImageUrl;
      } else if (backgroundImageUrl?.includes("blob:")) {
        finalImageUrl = null;
      }

      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagline,
          rotatingTexts,
          titlePrefix,
          description,
          ctaPrimaryLabel,
          ctaPrimaryHref,
          ctaSecondaryLabel,
          ctaSecondaryHref,
          backgroundImageUrl: finalImageUrl,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setMessage("บันทึกสำเร็จ!");
    } catch {
      setMessage("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="space-y-6">
      {/* Tagline */}
      <div>
        <label className={labelClass}>Tagline (subtitle เล็กด้านบน)</label>
        <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="TRUE TELEMART COMMUNICATION" />
      </div>

      {/* Title Prefix */}
      <div>
        <label className={labelClass}>Title Prefix (หัวข้อหลัก)</label>
        <input className={inputClass} value={titlePrefix} onChange={(e) => setTitlePrefix(e.target.value)} placeholder="ที่สุดของ" />
      </div>

      {/* Rotating Texts */}
      <div>
        <label className={labelClass}>ข้อความหมุนเวียน (Rotating Texts)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {rotatingTexts.map((text, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30">
              {text}
              <button onClick={() => removeRotatingText(i)} className="hover:text-white transition-colors" type="button">&times;</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className={inputClass}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="เพิ่มข้อความใหม่..."
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRotatingText())}
          />
          <button
            type="button"
            onClick={addRotatingText}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
          >
            เพิ่ม
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>คำอธิบาย (Description)</label>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="สัมผัสประสบการณ์การเชื่อมต่อที่เหนือกว่า..."
          rows={3}
        />
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>ปุ่มหลัก — Label</label>
          <input className={inputClass} value={ctaPrimaryLabel} onChange={(e) => setCtaPrimaryLabel(e.target.value)} placeholder="ติดต่อทีมของเรา" />
        </div>
        <div>
          <label className={labelClass}>ปุ่มหลัก — Link</label>
          <input className={inputClass} value={ctaPrimaryHref} onChange={(e) => setCtaPrimaryHref(e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>ปุ่มรอง — Label</label>
          <input className={inputClass} value={ctaSecondaryLabel} onChange={(e) => setCtaSecondaryLabel(e.target.value)} placeholder="ดูบริการทั้งหมด" />
        </div>
        <div>
          <label className={labelClass}>ปุ่มรอง — Link</label>
          <input className={inputClass} value={ctaSecondaryHref} onChange={(e) => setCtaSecondaryHref(e.target.value)} placeholder="/services" />
        </div>
      </div>

      {/* Background Image */}
      <div className="bg-gray-800/50 p-5 rounded-2xl border border-gray-700">
        <label className={labelClass}>ภาพพื้นหลัง (URL หรือ อัปโหลด)</label>
        <div className="mb-4">
          <input
            className={inputClass}
            value={!imageFile && backgroundImageUrl && !backgroundImageUrl.includes("blob:") ? backgroundImageUrl : ""}
            onChange={(e) => {
              const url = e.target.value;
              setImageFile(null);
              setBackgroundImageUrl(url);
            }}
            placeholder="https://... หรือคลิกอัปโหลดด้านล่าง"
          />
        </div>

        {backgroundImageUrl ? (
          <div className="relative rounded-xl overflow-hidden border border-gray-600 bg-gray-900 group">
            <img src={backgroundImageUrl} alt="Preview" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white transition-all scale-90 group-hover:scale-100">
                เปลี่ยนรูปใหม่
              </button>
              <button type="button" onClick={removeImage} className="p-2 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md rounded-lg text-red-300 transition-all scale-90 group-hover:scale-100 border border-red-500/30">
                ลบรูป
              </button>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <span className="text-[10px] text-gray-300 bg-black/60 px-2 py-1 rounded backdrop-blur-md truncate max-w-[200px]">
                {imageFile ? imageFile.name : "External URL / Existing"}
              </span>
            </div>
          </div>
        ) : (
          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-700 hover:border-red-500/50 hover:bg-red-500/5 rounded-xl p-10 text-center cursor-pointer transition-all h-48 flex flex-col justify-center items-center">
            <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            </div>
            <p className="text-sm text-gray-400 font-medium">ลากไฟล์มาวาง หรือ คลิกเพื่อเลือกรูป</p>
            <p className="text-xs text-gray-500 mt-1">แนะนำขนาด 1920 x 1080px</p>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all disabled:opacity-50"
        >
          {saving ? "กำลังบันทึก..." : "บันทึก Hero Section"}
        </button>
        {message && (
          <span className={`text-sm ${message.includes("สำเร็จ") ? "text-emerald-400" : "text-red-400"}`}>
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
