import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/GardenNest Logo.png";

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
      <h1 className="text-xl md:text-2xl font-bold tracking-tight">
        <span className="text-green-600 dark:text-green-400">Garden</span>
        <span className="text-foreground">Nest</span>
      </h1>
    </Link>
  );
};
