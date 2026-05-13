"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogOut, User, LayoutDashboard, Home, Search, BookOpen, Info, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore Gardeners", href: "/explore-gardeners", icon: Search },
  { name: "Browse Tips", href: "/browse-tips", icon: BookOpen },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

export const Navbar = () => {
  const { user, LogOutUser } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await LogOutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const NavItems = ({ className, onItemClick }: { className?: string; onItemClick?: () => void }) => (
    <nav className={cn("flex flex-col lg:flex-row gap-1 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onItemClick}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-accent",
            pathname === link.href
              ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <link.icon className="w-4 h-4 lg:hidden" />
          {link.name}
        </Link>
      ))}
      {user && (
        <Link
          href="/dashboard"
          onClick={onItemClick}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-accent lg:hidden",
            pathname.startsWith("/dashboard")
              ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
      )}
    </nav>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md py-2 border-border/50"
          : "bg-background py-4 border-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden lg:block">
            <NavItems />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-green-100 dark:border-green-900 overflow-hidden">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          )}

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  <NavItems />
                  {!user && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link href="/register">Join Now</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
