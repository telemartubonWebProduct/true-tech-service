import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const updateSchema = z.object({
  title: z.string().max(500).optional().nullable(),
  subtitle: z.string().max(500).optional().nullable(),
  imageUrl: z.string().max(1000).optional().nullable(),
  linkUrl: z.string().max(1000).optional().nullable(),
  jsonData: z.any().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const section = await prisma.homeSection.findUnique({
      where: { sectionKey: key },
    });
    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(section);
  } catch (error) {
    console.error("GET /api/home-sections/[key] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch section" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const body = await request.json();
    const parsed = updateSchema.parse(body);

    const section = await prisma.homeSection.upsert({
      where: { sectionKey: key },
      update: {
        title: parsed.title,
        subtitle: parsed.subtitle,
        imageUrl: parsed.imageUrl,
        linkUrl: parsed.linkUrl,
        jsonData: parsed.jsonData ?? undefined,
        isActive: parsed.isActive,
      },
      create: {
        sectionKey: key,
        title: parsed.title,
        subtitle: parsed.subtitle,
        imageUrl: parsed.imageUrl,
        linkUrl: parsed.linkUrl,
        jsonData: parsed.jsonData ?? [],
        isActive: parsed.isActive ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(section);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("PUT /api/home-sections/[key] error:", error);
    return NextResponse.json(
      { error: "Failed to update section" },
      { status: 500 }
    );
  }
}
