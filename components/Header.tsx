import Link from "next/link";

export default function Header()
{
    return (
        <div className="flex flex-row justify-between items-center px-10 w-full h-16 bg-black text-white">
            <Link href="/blogs" className="text-2xl font-bold">blogSphere</Link>
            <div className="flex flex-row justify-end items-center">
                <Link href="/blogs" className="text-white">Blogs</Link>
                <Link href="/blogs/create" className="text-white ml-5">Create</Link>
            </div>
        </div>
    )
}