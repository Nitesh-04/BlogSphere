import Link from "next/link";

export default function Header()
{
    return (
        <div className="flex flex-row justify-between items-center px-10 w-full h-16 bg-black text-white">
            <h1 className="text-2xl font-bold">blogSphere</h1>
            <div className="flex flex-row justify-end items-center">
                <Link href="/blogs" className="text-white">Blogs</Link>
                <Link href="/create" className="text-white ml-5">Create</Link>
            </div>
        </div>
    )
}