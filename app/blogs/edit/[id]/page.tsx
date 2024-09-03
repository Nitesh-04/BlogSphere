"use client";

import { useEffect, useRef, FormEvent, useState, Suspense } from "react";
import { fetchBlog, updateBlog } from "@/app/actions";
import { TheToaster } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { redirect,useRouter } from "next/navigation";
import Hub from "@/app/components/Hub";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/app/loading";

export default function EditBlog({ params }: { params: { id: string } }) {
  const { toast } = TheToaster();
  const formRef = useRef<HTMLFormElement>(null);
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [loading,setLoading] = useState(false);
  const { id } = params;
  const [pageLoading,setpageLoading] = useState(false);

  const {user} = useUser();
  const router = useRouter();

  if(!user || !user.id)
  {
    redirect("/sign-in");
  }

  useEffect(() => {
    async function fetchingBlog() {
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
    fetchingBlog();
  }, [id]);

  if(pageLoading)
  {
    return <Loading/>
  }

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        setLoading(true);
        await updateBlog(id as string, formData, user.id as string);
        toast({
          title: "Blog edited successfully !",
          description: "redirecting to blogs....",
        });
        formRef.current.reset();
        setTimeout(() => {
          router.push("/blogs");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error editing blog",
        description: "please try again",
      });
    }
  };

  return (
    <div>
      <Hub/>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-[-1] pointer-events-none"
        style={{ backgroundImage: `url("/doodle.svg")` }}
      ></div>
      <div className="w-full max-w-2xl mx-auto py-8 px-4 md:px-6 z-10">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Input
              type="text"
              name="title"
              required
              placeholder="Enter blog post title"
              defaultValue={blog.title}
              className="text-3xl text-center bg-gray-50 font-bold border-black h-10 tracking-tight"
            />
          </div>
          <div>
            <Textarea
              name="content"
              required
              placeholder="Get that blog cooking ....."
              rows={11}
              className="text-lg bg-gray-50 border-black leading-relaxed"
              defaultValue={blog.content}
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" className="px-6">
              <Link href={"/blogs"}>Cancel</Link>
            </Button>
            <Button type="submit" className="px-6" disabled={loading}>
              {loading ? "editing blog ...." :  "Edit Blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
