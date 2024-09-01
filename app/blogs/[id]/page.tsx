"use client";

import { deleteBlog, fetchBlog } from "@/app/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Hub from "@/app/components/Hub";
import { redirect,useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Page({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const { id } = params;
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

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
      toast({
        variant: "destructive",
        title: "Deleted blog successfully",
        description: "redirecting to blogs page....",
      });
      setTimeout(() => {
        router.push("/blogs");
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
    <>
    <Hub/>
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
    </>
  );
}
