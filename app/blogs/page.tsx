import prisma from "@/lib/db"
import Link from "next/link";

export default async function Blogs()
{
    const blogs = await prisma.blog.findMany();
    const count = await prisma.blog.count();

    return (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto pt-24">
            <h1 className="text-4xl font-bold text-center">Blogs ({count})</h1>   
            <ul className="flex flex-col items-center justify-center pt-10 mt">
                {blogs.map((blog) => (
                <li key={blog.id} className="text-lg mt-5">
                    <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            ))}
            </ul>
        </div>
    )
}