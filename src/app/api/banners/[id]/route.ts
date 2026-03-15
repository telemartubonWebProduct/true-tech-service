import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { deleteImageByUrl } from "@/src/lib/storage";

// Zod schema for banner updates (all fields optional)
const updateBannerSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

/**
 * GET /api/banners/[id]
 * Get a single banner by ID.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error("Failed to fetch banner:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/banners/[id]
 * Update a banner by ID. Supports partial updates.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateBannerSchema.parse(body);

    // Check if banner exists
    const existing = await prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    const banner = await prisma.banner.update({
      where: { id },
      data: validated,
    });

    // Clean up old image from storage if it was changed
    if (validated.imageUrl && existing.imageUrl && validated.imageUrl !== existing.imageUrl) {
      // Don't await to avoid blocking the response, or await it if you want strong consistency
      deleteImageByUrl(existing.imageUrl).catch(console.error);
    }

    return NextResponse.json(banner);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to update banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

  /**
 * DELETE /api/banners/[id]
 * Delete a banner by ID and remove its image from storage.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if banner exists
    const existing = await prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    await prisma.banner.delete({ where: { id } });

    // Clean up image from storage
    if (existing.imageUrl) {
      deleteImageByUrl(existing.imageUrl).catch(console.error);
    }

    return NextResponse.json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Failed to delete banner:", error);
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
