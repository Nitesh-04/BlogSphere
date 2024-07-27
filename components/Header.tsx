import Link from "next/link";

export default function Header()
{
    return (
        <div className="flex flex-row items-center w-full h-16 bg-black text-black">
            <h1 className="text-2xl font-bold ml-5">blogSphere</h1>
            <div className="flex flex-row justify-between items-center w-1/4 mr-5">
                <Link href="/blogs" className="text-white">Blogs</Link>
                <Link href="/create" className="text-white ml-5">Create</Link>
            </div>
        </div>
    )
}