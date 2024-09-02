import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type WebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
};

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new NextResponse("WEBHOOK_SECRET not set", { status: 500 });
  }

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new NextResponse("Webhook verification failed", { status: 400 });
  }

  const { id, email_addresses, first_name, last_name } = evt.data;
  const email = email_addresses[0].email_address;
  const name = [first_name, last_name].filter(Boolean).join(" ") || null;

  try {
    if (evt.type === "user.created" || evt.type === "user.updated") {
      if (!email) {
        return new NextResponse("Error: No email found", { status: 400 });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: id as string,
            email: email,
            name: name,
          },
        });
      } else {
        await prisma.user.update({
          where: { email: email },
          data: {
            id: id as string,
            name: name,
          },
        });
      }

      return new NextResponse("User created or updated", { status: 200 });
    }

    if (evt.type === "user.deleted") {
      try {
        await prisma.blog.deleteMany({
          where: { authorId: id as string },
        });
        await prisma.user.delete({
          where: { id: id as string },
        });
        return new NextResponse("User deleted", { status: 200 });
        
      } catch (error) {
        return new NextResponse("Error deleting user and blogs", { status: 500 });
      }
    }

    return new NextResponse("Webhook event type not handled", { status: 200 });
  } catch (err) {

    return new NextResponse("Error processing webhook event", { status: 500 });
  }
}
