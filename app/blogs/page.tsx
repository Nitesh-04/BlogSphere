"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Hub from "../components/Hub";
import NumberTicker from "@/components/magicui/number-ticker";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [count, setCount] = useState<number>(0);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!isLoaded) return;
      if (!user) {
        router.push("/sign-in");
        return;
      }

      try {
        console.log(user.id);
        const response = await fetch(`/api/blogs?userId=${user.id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBlogs(data.blogs);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    fetchData();
  }, [user, isLoaded, router]);

  return (
    <div className="h-screen w-full">
      <Hub />
      <div className="flex flex-col justify-center items-center w-1/2 mx-auto pt-24">
        <h1 className="text-4xl font-bold text-center">
          Blogs (<NumberTicker value={count} />)
        </h1>
        <ul className="flex flex-col items-center justify-center pt-10 mt">
          {blogs.map((blog) => (
            <li key={blog.id} className="text-lg mt-5">
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
