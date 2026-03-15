import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createPackageSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url().optional().nullable(),
  freebie: z.any().optional().nullable(),
  speed: z.string().min(1, "Speed is required"),
  price: z.number().min(0, "Price is required"),
  details: z.any().optional().nullable(),
  type: z.string().optional().nullable(),
  status: z.boolean().optional().default(true),
  displayOrder: z.number().int().optional().default(0),
});

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createPackageSchema.parse(body);

    const existing = await prisma.package.findUnique({
      where: { code: validated.code }
    });

    if (existing) {
      return NextResponse.json({ error: "Package code already exists" }, { status: 400 });
    }

    const newPackage = await prisma.package.create({
      data: {
        code: validated.code,
        name: validated.name,
        imageUrl: validated.imageUrl ?? null,
        freebie: validated.freebie ?? null,
        speed: validated.speed,
        price: validated.price,
        details: validated.details ?? null,
        type: validated.type,
        status: validated.status ?? true,
        displayOrder: validated.displayOrder ?? 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Failed to create package:", error);
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}
