"use client";

import { useRef, FormEvent } from "react";
import { createBlog } from "../../actions";
import { useRouter } from "next/navigation";
import { uToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Hub from "@/app/components/Hub"; 
import { useUser } from "@clerk/nextjs";

export default function CreatePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { toast } = uToast();
  const { user } = useUser();

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
        await createBlog(formData, user.id as string);
        toast({
          title: "Blog created successfully!",
          description: "Redirecting to blogs...",
        });
        setTimeout(() => {
          router.push("/blogs");
        }, 2000);
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
    <>
      <Hub />
      <div>
        <h1 className="text-2xl text-center mt-5">Create a new blog</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 py-5 gap-5 border-2 border-gray- rounded-md w-1/2 mx-auto"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="text-black border-black border-2 rounded-md w-1/2 mx-auto mt-5 p-2"
          />
          <textarea
            rows={10}
            name="content"
            required
            placeholder="Content"
            className="text-black border-black border-2 rounded-md w-3/4 mx-auto p-2"
          />
          <Button type="submit" className="bg-black text-white w-1/2 mx-auto p-2">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
