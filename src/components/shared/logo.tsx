import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/GardenNest Logo.png";

import { Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="relative w-10 h-10 md:w-12 md:h-12">
        <Image
          src={logo}
          alt="Garden Nest Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-xl md:text-2xl font-bold tracking-tight flex items-center">
        <span className="text-green-600 dark:text-green-400">Garden</span>
        <span className="text-foreground ml-1">Nest</span>
        <span className="ml-2 px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] md:text-xs font-black border border-indigo-100 dark:border-indigo-800 flex items-center gap-1 uppercase tracking-tighter">
          AI <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
        </span>
      </h1>
    </Link>
  );
};
