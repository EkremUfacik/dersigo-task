"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-slate-200 p-4 text-center space-x-6 text-lg">
      <Link
        href={"/users"}
        className={cn("hover:underline", pathname === "/users" && "underline")}
      >
        Users
      </Link>
      <Link
        href={"/posts"}
        className={cn("hover:underline", pathname === "/posts" && "underline")}
      >
        Posts
      </Link>
    </nav>
  );
};

export default Navbar;
