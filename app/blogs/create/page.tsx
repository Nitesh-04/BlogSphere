"use client";

import { useRef, FormEvent } from "react";
import { createBlog } from "../../actions";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            await createBlog(formData);
            formRef.current.reset();
            setTimeout(() => {
                router.push("/blogs");
                router.refresh();
            }, 2000);
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-center mt-5">Create a new blog</h1>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col mt-5 py-5 gap-5 border-2 border-gray- rounded-md w-1/2 mx-auto">
                <input type="text" name="title" placeholder="Title" required className="text-black border-black border-2 rounded-md w-1/2 mx-auto mt-5 p-2" />
                <textarea rows={10} name="content" required placeholder="Content" className="text-black border-black border-2 rounded-md w-3/4 mx-auto p-2" />
                <button type="submit" className="bg-black text-white w-1/2 mx-auto p-2">Submit</button>
            </form>
        </div>
    );
}
