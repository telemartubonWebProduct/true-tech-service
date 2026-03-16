import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const sectionSchema = z.object({
  sectionKey: z.string().min(1).max(100),
  title: z.string().max(500).optional().nullable(),
  subtitle: z.string().max(500).optional().nullable(),
  imageUrl: z.string().max(1000).optional().nullable(),
  linkUrl: z.string().max(1000).optional().nullable(),
  jsonData: z.any().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    const sections = await prisma.homeSection.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error("GET /api/home-sections error:", error);
    return NextResponse.json(
      { error: "Failed to fetch home sections" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = sectionSchema.parse(body);

    // Upsert by sectionKey
    const section = await prisma.homeSection.upsert({
      where: { sectionKey: parsed.sectionKey },
      update: {
        title: parsed.title,
        subtitle: parsed.subtitle,
        imageUrl: parsed.imageUrl,
        linkUrl: parsed.linkUrl,
        jsonData: parsed.jsonData ?? undefined,
        isActive: parsed.isActive,
      },
      create: {
        sectionKey: parsed.sectionKey,
        title: parsed.title,
        subtitle: parsed.subtitle,
        imageUrl: parsed.imageUrl,
        linkUrl: parsed.linkUrl,
        jsonData: parsed.jsonData ?? [],
        isActive: parsed.isActive ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(section);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("POST /api/home-sections error:", error);
    return NextResponse.json(
      { error: "Failed to upsert home section" },
      { status: 500 }
    );
  }
}
