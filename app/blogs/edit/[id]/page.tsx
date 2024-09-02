"use client";

import { useEffect, useRef, FormEvent, useState } from "react";
import { fetchBlog, updateBlog } from "@/app/actions";
import { TheToaster } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { redirect,useRouter } from "next/navigation";
import Hub from "@/app/components/Hub";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EditBlog({ params }: { params: { id: string } }) {
  const { toast } = TheToaster();
  const formRef = useRef<HTMLFormElement>(null);
  const [blog, setBlog] = useState({ title: "", content: "" });
  const { id } = params;

  const {user} = useUser();
  const router = useRouter();

  if(!user || !user.id)
  {
    redirect("/sign-in");
  }

  useEffect(() => {
    async function fetchingBlog() {
      const blogData = await fetchBlog(id);
      if (blogData) setBlog(blogData);
    }

    fetchingBlog();
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      toast({
        title: "Blog edited successfully !",
        description: "redirecting to blogs....",
      });

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        await updateBlog(id as string, formData, user.id as string);
        formRef.current.reset();
        setTimeout(() => {
          router.push("/blogs");
        }, 2000);
      }
    } catch (error) {
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
            <Button type="submit" className="px-6">
              Edit Blog
            </Button>
          </div>
        </form>
      </div>  
    </div>
  );
}
