import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { deleteImageByUrl } from "@/src/lib/storage";

const updateSettingsSchema = z.object({
  logoUrl: z.string().url().or(z.literal("")).optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().or(z.literal("")).optional().nullable(),
  referralSystem: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  footerImageUrl: z.string().url().or(z.literal("")).optional().nullable(),
  lineSupportUrl: z.string().url().or(z.literal("")).optional().nullable(),
});

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" }
    });
    
    // If not found, create default empty settings
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "singleton" }
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const validated = updateSettingsSchema.parse(body);

    let existing = await prisma.siteSettings.findUnique({
      where: { id: "singleton" }
    });

    if (!existing) {
      existing = await prisma.siteSettings.create({
        data: { id: "singleton" }
      });
    }

    // Convert empty string literals to null to save correctly in db
    const dataToSave = {
      ...validated,
      logoUrl: validated.logoUrl === "" ? null : validated.logoUrl,
      email: validated.email === "" ? null : validated.email,
      footerImageUrl: validated.footerImageUrl === "" ? null : validated.footerImageUrl,
    };

    const updated = await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: dataToSave
    });

    // Clean up old images if they were changed
    if (dataToSave.logoUrl !== undefined && existing.logoUrl && dataToSave.logoUrl !== existing.logoUrl) {
      deleteImageByUrl(existing.logoUrl).catch(console.error);
    }
    
    if (dataToSave.footerImageUrl !== undefined && existing.footerImageUrl && dataToSave.footerImageUrl !== existing.footerImageUrl) {
      deleteImageByUrl(existing.footerImageUrl).catch(console.error);
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
