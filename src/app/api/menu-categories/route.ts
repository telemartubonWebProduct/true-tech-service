import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const menuCategorySchema = z.object({
  iconUrl: z.string().max(1000),
  alt: z.string().max(200),
  text: z.string().max(200),
  path: z.string().max(500),
  displayOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    const items = await prisma.menuCategory.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/menu-categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = menuCategorySchema.parse(body);

    const item = await prisma.menuCategory.create({
      data: parsed,
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("POST /api/menu-categories error:", error);
    return NextResponse.json(
      { error: "Failed to create menu category" },
      { status: 500 }
    );
  }
}
