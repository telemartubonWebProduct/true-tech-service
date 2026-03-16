import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const updateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  phoneNumber: z.string().min(1).max(50).optional(),
  role: z.string().min(1).max(200).optional(),
  closedDeal: z.number().int().min(0).optional(),
  photoUrl: z.string().max(1000).optional().nullable(),
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

    const agent = await prisma.agent.update({
      where: { id },
      data: parsed,
    });

    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json(agent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("PUT /api/agents/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update agent" },
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
    await prisma.agent.delete({ where: { id } });
    
    revalidatePath("/");
    revalidatePath("/home");
    revalidatePath("/(dashboard)/dashboard/home-content", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/agents/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete agent" },
      { status: 500 }
    );
  }
}
