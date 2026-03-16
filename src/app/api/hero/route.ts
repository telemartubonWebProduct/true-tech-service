import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const heroSchema = z.object({
  tagline: z.string().max(200).optional().nullable(),
  rotatingTexts: z.array(z.string().max(100)).max(10).optional(),
  titlePrefix: z.string().max(100).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  ctaPrimaryLabel: z.string().max(100).optional().nullable(),
  ctaPrimaryHref: z.string().max(500).optional().nullable(),
  ctaSecondaryLabel: z.string().max(100).optional().nullable(),
  ctaSecondaryHref: z.string().max(500).optional().nullable(),
  backgroundImageUrl: z.string().max(1000).optional().nullable(),
});

export async function GET() {
  try {
    const hero = await prisma.heroSection.findUnique({
      where: { id: "singleton" },
    });
    return NextResponse.json(hero);
  } catch (error) {
    console.error("GET /api/hero error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero section" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = heroSchema.parse(body);

    const hero = await prisma.heroSection.upsert({
      where: { id: "singleton" },
      update: {
        ...parsed,
        rotatingTexts: parsed.rotatingTexts ?? undefined,
      },
      create: {
        id: "singleton",
        ...parsed,
        rotatingTexts: parsed.rotatingTexts ?? [],
      },
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(hero);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("PUT /api/hero error:", error);
    return NextResponse.json(
      { error: "Failed to update hero section" },
      { status: 500 }
    );
  }
}
