"use server"

import prisma from "@/lib/db";

export async function fetchBlogs(userId:string)
{
    const blogs = await prisma.blog.findMany({
        where: {authorId: userId},
        orderBy: {createdAt: "desc"},
    });

    const count = await prisma.blog.count({
        where: {authorId: userId},
    });

    return {blogs, count};
}

export async function fetchBlog(id:string)
{
    return await prisma.blog.findUnique({
        where: {id},
    });
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
}

export async function deleteBlog(id:string)
{
    await prisma.blog.delete({
        where: {id}
    });
}