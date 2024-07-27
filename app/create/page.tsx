
import createForm from "../actions";

export default async function createPage()
{   

    return (
        <form action={createForm} className="flex flex-col mt-10 gap-5">
            <h1 className="text-2xl text-center">Create a new blog</h1>
            <input type="text" name="title" placeholder="Title" className="text-black w-1/2 mx-auto mt-5 p-2" />
            <input type="text" name="content" size={50} placeholder="content" className="text-black w-1/2 mx-auto p-2" />
            <button type="submit" className="bg-gray-400 text-black w-1/2 mx-auto p-2">Submit</button>
        </form>
    )
}