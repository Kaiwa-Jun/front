"use client";

import { BookOpenCheck } from "lucide-react";
import { UserNav } from "./UserNav";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2 ml-4">
          <BookOpenCheck className="h-6 w-6 text-indigo-600" />
          <span className="font-bold">Learning Advisor</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {session && <UserNav />}
        </div>
      </div>
    </header>
  );
}
