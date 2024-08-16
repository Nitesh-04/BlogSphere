import Link from "next/link";
import { Kanit } from "next/font/google";
import { Chivo } from "next/font/google";
import { Button } from "@/components/ui/button";

const kanit = Kanit({ weight: "600", subsets: ["latin"] });
const chivo = Chivo({ weight: "700", subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0 pointer-events-none"
        style={{ backgroundImage: `url("/doodle.svg")` }}
      ></div>
      <div className="flex flex-col justify-center items-center py-20 z-10">
        <Link
          href={"/blogs"}
          className={`lg:text-8xl md:text-7xl text-6xl ${kanit.className}`}
        >
          BlogSphere
        </Link>

        <div className="hidden lg:flex md:flex flex-col justify-center mt-24">
          <p
            className={`text-center text-gray-800 text-5xl ${chivo.className}`}
          >
            Your Thoughts.
          </p>
          <p
            className={` text-center text-gray-700 text-4xl ${chivo.className}`}
          >
            Your Stories.
          </p>
          <p
            className={` text-center text-gray-600 text-3xl ${chivo.className}`}
          >
            Your Blogs.
          </p>
        </div>

        <div className="lg:hidden md:hidden flex flex-col justify-center mt-24">
          <p
            className={`text-center text-gray-700 text-5xl ${chivo.className}`}
          >
            Thoughts.
          </p>
          <p
            className={`text-center text-gray-700 text-4xl ${chivo.className}`}
          >
            Stories.
          </p>
          <p
            className={`text-center text-gray-600 text-4xl ${chivo.className}`}
          >
            Blogs.
          </p>
        </div>

        <div className="flex gap-10 lg:mt-20 md:mt-28 mt-28">
          <Link href={"/blogs"}>
            <Button variant={"default"}>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
