import prisma from "@/lib/db";
import Link from "next/link";

interface Params {
    id: string;
}

interface PageProps {
    params: Params;
}

export default async function Page({ params }: PageProps) {
    const blog = await prisma.blog.findUnique({
        where: {
            id: params.id,
        },
    });

    console.log(blog);
    return (
        <div className="flex flex-col justify-center items-center w-1/2 mx-auto pt-24">
            <h1 className="text-4xl font-bold text-center">{blog?.title}</h1>
            <p className="text-lg pt-10">{blog?.content}</p>
            <Link href={`/blogs/edit/${params.id}`} className="mt-10 text-purple-500">edit here</Link>
        </div>
    );
}
