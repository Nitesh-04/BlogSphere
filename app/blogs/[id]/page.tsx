"use client";

import { deleteBlog, fetchBlog } from "@/app/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TheToaster } from "@/components/ui/use-toast";
import Hub from "@/app/components/Hub";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

export default function Page({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setpageLoading] = useState(false);
  const { id } = params;
  const { toast } = TheToaster();
  const router = useRouter();
  const { user } = useUser();

  if (!user || !user.id) {
    redirect("/sign-in");
  }

useEffect(() => {
  async function findingBlog() {
    try {
      setpageLoading(true);
      const blogData = await fetchBlog(id);
      if (blogData) setBlog(blogData);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
    finally{
      setpageLoading(false);
    }
  }
  findingBlog();
}, [id]);

if(pageLoading)
{
  return <Loading/>
}

async function handleDelete() {
    try {
      setLoading(true);
      if (user && user.id) {
        await deleteBlog(id, user.id as string);
      } else {
        toast({
          variant: "destructive",
          title: "Error deleting blog",
          description: "User not found.",
        });
      }
      toast({
        variant: "destructive",
        title: "Deleted blog successfully",
        description: "Redirecting to blogs page...",
      });
      setTimeout(() => {
        router.push("/blogs");
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting blog",
        description: "Please try again.",
      });
    }
  }

  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-[-1] pointer-events-none"
        style={{ backgroundImage: `url("/doodle.svg")` }}
      ></div>
      <Hub />
        <div className="relative flex flex-col justify-center items-center w-4/5 mx-auto pt-10 z-10 space-y-6">
          <h1 className="text-4xl font-bold text-center border-black border-[1px] py-2 px-4 rounded-lg mb-6">
            {blog?.title}
          </h1>
          <p className="text-lg text-justify w-full md:max-w-3xl border-black border-[1px] py-6 md:px-6 px-2 rounded-lg">
            {blog?.content}
          </p>
          <div className="flex flex-col justify-between pt-2 md:pt-6 mb-20">
            <div className="flex gap-4 w-full max-w-3xl">
              <Button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                {loading ? (
                  "working on it ...."
                ) : (
                  "Delete"
                )}
              </Button>
              <Link href={`/blogs/edit/${params.id}`}>
                <Button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-white bg-black rounded-lg transition-colors"
                >
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
    </>
  );
}
