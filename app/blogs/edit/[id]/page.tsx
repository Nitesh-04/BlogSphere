"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef,FormEvent,    useState } from "react";
import { fetchBlog, updateBlog } from "@/app/actions";

interface Params {
    id: string;
}

interface PageProps {
    params: Params;
}


export default function editBlog({ params }: PageProps)
{   
    const formRef = useRef<HTMLFormElement>(null);
    const [blog,setBlog] = useState({title:"",content:""});
    const router = useRouter();
    const {id} = params;

    useEffect(() => {
        async function fetchingBlog()
        {
            if(id)
            {
                const blogData = await fetchBlog(id);
                if(blogData)
                setBlog(blogData);
            }
        }

        fetchingBlog();
    },[id]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            await updateBlog(id as string, formData);
            router.push(`/blogs`);
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-center mt-16">Edit Blog</h1>
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col mt-5 py-5 gap-5 border-2 border-black rounded-md w-1/2 mx-auto">
                <input type="text" name="title" placeholder="Title" required className="text-black border-black border-2 rounded-md w-1/2 mx-auto mt-5 p-2" defaultValue={blog.title} />
                <textarea rows={10} name="content" required placeholder="Content" className="text-black border-black border-2 rounded-md w-2/3 mx-auto p-2" defaultValue={blog.content} />
                <button type="submit" className="bg-black text-white w-1/2 mx-auto p-2">Submit</button>
            </form>
        </div>
            
    )
}