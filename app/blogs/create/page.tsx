"use client";

import { useRef, FormEvent, Suspense, useState } from "react";
import { createBlog } from "../../actions";
import { useRouter } from "next/navigation";
import { TheToaster } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Hub from "@/app/components/Hub";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function CreatePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = TheToaster();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  if (!user || !user.id) {
    router.push("/sign-in");
  }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();

      if (!user || !user.id) {
        router.push("/sign-in");
        return;
      }

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        setLoading(true);
        await createBlog(formData, user.id as string);
        toast({
          title: "Blog created successfully!",
          description: "Redirecting to blogs...",
        });
        revalidatePath("/blogs");
        redirect("/blogs");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating blog",
        description: "Please try again",
      });
    }
  }

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-[-1] pointer-events-none"
        style={{ backgroundImage: `url("/doodle.svg")` }}
      ></div>
      <Hub/>
      <div className="w-full max-w-2xl mx-auto py-8 px-4 md:px-6 z-10">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Input
              type="text"
              name="title"
              required
              placeholder="Enter blog post title"
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
            />
          </div>
          <div className="flex justify-center md:justify-end">
            <Button type="submit" className="text-white px-6 z-2" disabled={loading}>
              {loading ? "working on it ...." :  "Create Blog"}
            </Button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
