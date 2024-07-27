"use server"

import prisma from "@/lib/db";

export default async function createForm(formdata : FormData)
{   
    await prisma.blog.create({
        data: {
            title: formdata.get("title") as string,
            content: formdata.get("content") as string
        }
    });
    
}