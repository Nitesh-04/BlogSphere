"use client";

import { deleteBlog, fetchBlog } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Page({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const router = useRouter();
  const { id } = params;
  const { toast } = useToast();

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
      toast({
        variant: "destructive",
        title: "Deleted blog successfully",
        description: "redirecting to blogs page....",
      });
      await deleteBlog(id);
      setTimeout(() => {
        router.push("/blogs");
        router.refresh();
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error editing blog",
        description: "please try again",
      });
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-3/4 mx-auto pt-24">
      <h1 className="text-4xl font-bold text-center">{blog?.title}</h1>
      <p className="flex justify-center items-center text-lg pt-10 w-2/3 text-justify">
        {blog?.content}
      </p>
      <Link href={`/blogs/edit/${params.id}`} className="mt-10 text-purple-500">
        Edit here
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className="text-red-500 mt-4"
      >
        Delete blog
      </button>
    </div>
  );
}
