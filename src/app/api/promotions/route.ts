import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const promotionTypes = ["broadband", "monthly", "topup", "solar"] as const;

const createPromotionSchema = z.object({
  type: z.enum(promotionTypes),
  categoryName: z.string().optional().nullable(),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0),
  priceNote: z.string().optional().nullable(),
  speed: z.string().optional().nullable(),
  validity: z.string().optional().nullable(),
  imageUrl: z.string().nullable().optional().transform(v => v === "" ? null : v),
  promoBadge: z.string().optional().nullable(),
  perks: z.any().optional().nullable(),
  details: z.any().optional().nullable(),
  status: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const where: any = type && type !== "all" ? { type } : {};
    if (q) {
      where.name = { contains: q, mode: "insensitive" };
    }

    const skip = (page - 1) * limit;

    const [promotions, total] = await Promise.all([
      prisma.promotion.findMany({
        where,
        orderBy: { displayOrder: "asc" },
        skip,
        take: limit,
      }),
      prisma.promotion.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: promotions,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
    return NextResponse.json({ error: "Failed to fetch promotions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createPromotionSchema.parse(body);

    const promotion = await prisma.promotion.create({
      data: validated,
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/boardband");
    revalidatePath("/monthly");
    revalidatePath("/topup");
    revalidatePath("/wEnergy");
    revalidatePath("/(dashboard)/dashboard/promotions", "page");

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to create promotion:", error);
    return NextResponse.json(
      { error: "Failed to create promotion" },
      { status: 500 }
    );
  }
}
