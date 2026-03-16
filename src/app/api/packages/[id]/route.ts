import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { deleteImageByUrl } from "@/src/lib/storage";
import { revalidatePath } from "next/cache";

const updatePackageSchema = z.object({
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  imageUrl: z.string().url().or(z.literal("")).optional().nullable(),
  freebie: z.any().optional().nullable(),
  speed: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  details: z.any().optional().nullable(),
  type: z.string().optional().nullable(),
  status: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pkg = await prisma.package.findUnique({
      where: { id },
    });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("Failed to fetch package:", error);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updatePackageSchema.parse(body);

    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    if (validated.code && validated.code !== existing.code) {
      const codeExists = await prisma.package.findUnique({ where: { code: validated.code } });
      if (codeExists) {
        return NextResponse.json({ error: "Package code already exists" }, { status: 400 });
      }
    }

    const dataToSave = {
      ...validated,
      imageUrl: validated.imageUrl === "" ? null : validated.imageUrl,
    };

    const pkg = await prisma.package.update({
      where: { id },
      data: dataToSave,
    });

    if (dataToSave.imageUrl !== undefined && existing.imageUrl && dataToSave.imageUrl !== existing.imageUrl) {
      deleteImageByUrl(existing.imageUrl).catch(console.error);
    }

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(pkg);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }

    console.error("Failed to update package:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    await prisma.package.delete({ where: { id } });

    if (existing.imageUrl) {
      deleteImageByUrl(existing.imageUrl).catch(console.error);
    }

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Failed to delete package:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
