import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return(
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0 pointer-events-none"
        style={{ backgroundImage: `url("/doodle.svg")` }}
      ></div>
      <div className="flex items-center justify-center mx-auto py-14"><SignIn/></div>
    </div>
  );
}