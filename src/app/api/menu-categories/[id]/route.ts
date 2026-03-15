import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const updateSchema = z.object({
  iconUrl: z.string().max(1000).optional(),
  alt: z.string().max(200).optional(),
  text: z.string().max(200).optional(),
  path: z.string().max(500).optional(),
  displayOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateSchema.parse(body);

    const item = await prisma.menuCategory.update({
      where: { id },
      data: parsed,
    });

    revalidatePath("/");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("PUT /api/menu-categories/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update menu category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.menuCategory.delete({ where: { id } });
    
    revalidatePath("/");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/menu-categories/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete menu category" },
      { status: 500 }
    );
  }
}
