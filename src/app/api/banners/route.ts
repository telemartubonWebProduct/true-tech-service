import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

// Zod schema for banner creation
const createBannerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL"),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
});

/**
 * GET /api/banners
 * List all banners, ordered by displayOrder ascending.
 */
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/banners
 * Create a new banner.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createBannerSchema.parse(body);

    const banner = await prisma.banner.create({
      data: validated,
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to create banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
