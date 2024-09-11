import React, { useState } from "react";
import Link from "next/link";
import { HomeIcon, PencilIcon,LogOutIcon, SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { SignOutButton, UserButton } from "@clerk/nextjs";

export type IconProps = React.HTMLAttributes<SVGElement>;

export default function Hub() {
  
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-centern mb-5">
      <TooltipProvider>
        <Dock direction="middle">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon"}),
                    "size-12 rounded-full"
                  )}
                >
                  <HomeIcon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/blogs/create"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <PencilIcon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                  <UserButton/>
              </TooltipTrigger>
              <TooltipContent>
                <p>User</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                  <SignOutButton><LogOutIcon className="text-gray-600 size-5"/></SignOutButton>
              </TooltipTrigger>
              <TooltipContent className="mb-4">
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>


        </Dock>
      </TooltipProvider>
    </div>
  );
}
