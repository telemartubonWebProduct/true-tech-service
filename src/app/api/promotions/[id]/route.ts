import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { deleteImageByUrl } from "@/src/lib/storage";
import { revalidatePath } from "next/cache";

const updatePromotionSchema = z.object({
  type: z.enum(["broadband", "monthly", "topup", "solar"]).optional(),
  categoryName: z.string().optional().nullable(),
  name: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  priceNote: z.string().optional().nullable(),
  speed: z.string().optional().nullable(),
  validity: z.string().optional().nullable(),
  imageUrl: z.string().url().or(z.literal("")).optional().nullable(),
  promoBadge: z.string().optional().nullable(),
  perks: z.any().optional().nullable(),
  details: z.any().optional().nullable(),
  status: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const promotion = await prisma.promotion.findUnique({
      where: { id },
    });

    if (!promotion) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }

    return NextResponse.json(promotion);
  } catch (error) {
    console.error("Failed to fetch promotion:", error);
    return NextResponse.json({ error: "Failed to fetch promotion" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updatePromotionSchema.parse(body);

    const existing = await prisma.promotion.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }

    const dataToSave = {
      ...validated,
      imageUrl: validated.imageUrl === "" ? null : validated.imageUrl,
    };

    const promotion = await prisma.promotion.update({
      where: { id },
      data: dataToSave,
    });

    // Cleanup old image from Supabase if changed
    if (dataToSave.imageUrl !== undefined && existing.imageUrl && dataToSave.imageUrl !== existing.imageUrl) {
      deleteImageByUrl(existing.imageUrl).catch(console.error);
    }

    revalidatePath("/");
    revalidatePath("/boardband");
    revalidatePath("/monthly");
    revalidatePath("/topup");
    revalidatePath("/wEnergy");
    revalidatePath("/(dashboard)/dashboard/promotions", "page");

    return NextResponse.json(promotion);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }

    console.error("Failed to update promotion:", error);
    return NextResponse.json({ error: "Failed to update promotion" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.promotion.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }

    await prisma.promotion.delete({ where: { id } });

    if (existing.imageUrl) {
      deleteImageByUrl(existing.imageUrl).catch(console.error);
    }

    revalidatePath("/");
    revalidatePath("/boardband");
    revalidatePath("/monthly");
    revalidatePath("/topup");
    revalidatePath("/wEnergy");
    revalidatePath("/(dashboard)/dashboard/promotions", "page");

    return NextResponse.json({ message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Failed to delete promotion:", error);
    return NextResponse.json({ error: "Failed to delete promotion" }, { status: 500 });
  }
}
