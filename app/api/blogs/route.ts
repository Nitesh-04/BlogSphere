import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });

    const count = await prisma.blog.count({
      where: { authorId: userId },
    });

    return NextResponse.json({ blogs, count });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
