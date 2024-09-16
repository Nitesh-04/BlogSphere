"use server"

import prisma from "@/lib/db";
import redis from "@/lib/redis";

export async function fetchBlog(id:string)
{
    const blog = await prisma.blog.findUnique({
        where: {id},
    });

    return blog;
}

export async function createBlog(formdata : FormData,userId : string)
{   
    await prisma.blog.create({
        data: {
            title: formdata.get("title") as string,
            content: formdata.get("content") as string,
            authorId: userId,
        }
    });

    redis.del(`blogs:${userId}`);
    
}

export async function updateBlog(id:string, formdata:FormData, userId:string)
{
    await prisma.blog.update({
        where: {id},
        data: {
            title: formdata.get("title") as string,
            content: formdata.get("content") as string,
            authorId: userId,
        }
    });

    redis.del(`blogs:${userId}`);
}

export async function deleteBlog(id:string, userId:string)
{
    await prisma.blog.delete({
        where: {id},
    });

    redis.del(`blogs:${userId}`);
}