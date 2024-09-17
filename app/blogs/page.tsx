"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Hub from "../components/Hub";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Loading from "../loading";
import { fetchBlogs } from "../actions";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [count, setCount] = useState<number>(0);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      
      if (!user) {
        router.push("/sign-in");
        return;
      }

      try {
        setLoading(true);
        const data = await fetchBlogs(user.id);
        setBlogs(data.blogs);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      finally
      {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, isLoaded, router]);

  if(loading)
  {
    return <Loading/>
  }

  return (
    <div className="relative h-screen w-full">
      <Hub />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-[-1] pointer-events-none"
        style={{ backgroundImage: `url("/doodle.svg")` }}
      ></div>
      <section className="w-full py-10 z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-2 text-center mb-12 md:mb-24">
              {count===0 ? <></> :
              <h2 className="text-3xl font-bold tracking-tighter sm:text-2xl md:text-4xl">Hello,  {user?.firstName}</h2> }
            </div>
            {count === 0 ? (
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">
                  <Link href={"/"} className="text-5xl md:text-6xl mt-20">BlogSphere</Link>{""}
                </p>
                <Link href="/blogs/create" className="text-black text-sm mt-32 hover:underline">
                    <p className="mt-6 text-[14px]">Click here to create your first blog!</p>
                  </Link>
              </div>
            ) : (
            <Carousel className="w-full max-w-2xl border-slate-900 border-[1px] rounded-lg">
              <CarouselContent>
                {blogs.map((blog) => (
                  <CarouselItem key={blog.id}>
                    <div className="group relative h-full w-full bg-muted/20 rounded-lg shadow-md p-6 transition-all duration-300 hover:bg-muted/30">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{blog.title}</h3>
                          <p className="text-muted-foreground mt-2">{truncateText(blog.content, 250)}</p>
                        </div>
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
                          prefetch={false}
                        >
                          Read More
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex"/>
              <CarouselNext className="hidden md:flex"/>
            </Carousel>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

interface ArrowRightIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function ArrowRightIcon(props: ArrowRightIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
