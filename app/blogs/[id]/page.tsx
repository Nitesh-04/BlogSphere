"use client";

import { deleteBlog, fetchBlog } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const [blog, setBlog] = useState<{ title: string; content: string }>({ title: "", content: "" });
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        async function findingBlog() {
            try {
                const blogData = await fetchBlog(id);
                if (blogData) setBlog(blogData);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }
        findingBlog();
    }, [id]);

    async function handleDelete() {
        try {
            await deleteBlog(id);
            setDeleteMessage("Blog deleted. Redirecting...");
            setTimeout(() => {
                setDeleteMessage(null);
                router.push("/blogs");
                router.refresh();
            }, 2000);
        } catch (error) {
            console.error("Error deleting blog:", error);
            setDeleteMessage("Error deleting blog. Please try again.");
        }
    }

    return (
        <div className="relative flex flex-col justify-center items-center w-3/4 mx-auto pt-24">
            {deleteMessage ? (
                <div className="text-red-500">{deleteMessage}</div>
            ) : (
                <>
                    <h1 className="text-4xl font-bold text-center">{blog?.title}</h1>
                    <p className="flex justify-center items-center text-lg pt-10 w-2/3 text-justify">{blog?.content}</p>
                    <Link href={`/blogs/edit/${params.id}`} className="mt-10 text-purple-500">Edit here</Link>
                    <button type="button" onClick={handleDelete} className="text-red-500 mt-4">Delete blog</button>
                </>
            )}
        </div>
    );
}
