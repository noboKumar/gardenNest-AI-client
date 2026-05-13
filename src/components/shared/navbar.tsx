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
import { Menu, LogOut, User, LayoutDashboard, Home, Search, BookOpen, Info, Mail, ChevronDown } from "lucide-react";
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
  const { user, LogOutUser, role } = useAuth();
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
                <Button variant="ghost" className="relative h-11 w-11 rounded-full p-0 group focus-visible:ring-0 focus-visible:ring-offset-0">
                  <Avatar className="h-11 w-11 border-2 border-green-300 dark:border-green-700 group-hover:border-green-500 group-hover:scale-105 transition-all duration-200 shadow-md">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold text-base">
                      {user.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 ring-2 ring-background shadow">
                    <ChevronDown className="h-2.5 w-2.5 text-white" />
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-72 p-0 overflow-hidden border-0 shadow-2xl rounded-2xl"
                align="end"
                sideOffset={12}
                forceMount
              >
                {/* Profile Header */}
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-700 p-5 pb-10">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white/60 shadow-lg">
                      <AvatarImage src={user.photoURL || ""} />
                      <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                        {user.displayName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                      <p className="text-xs text-green-100/70 truncate">{user.email}</p>
                    </div>
                  </div>
                  {/* Role Badge */}
                  <span className={cn(
                    "absolute bottom-3 right-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                    role === "admin" ? "bg-purple-500/90 text-white" :
                    role === "gardener" ? "bg-white/20 text-white backdrop-blur-sm" :
                    "bg-blue-400/80 text-white"
                  )}>
                    {role || "visitor"}
                  </span>
                </div>

                {/* Clipped card body */}
                <div className="bg-background -mt-6 rounded-t-[1.25rem] px-2 pt-2 pb-2 space-y-0.5">
                  <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer group/item">
                    <Link href="/dashboard" className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 dark:bg-green-950/40 text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white transition-colors">
                        <LayoutDashboard className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer group/item">
                    <Link href="/dashboard" className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <User className="h-4 w-4" />
                      </span>
                      <span className="font-medium text-sm">My Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  {role === "admin" && (
                    <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 cursor-pointer group/item">
                      <Link href="/dashboard/admin" className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors">
                          <LayoutDashboard className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-sm">Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <div className="my-1.5 border-t border-border/60" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-xl px-3 py-2.5 cursor-pointer group/item focus:bg-red-50 dark:focus:bg-red-950/30"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/40 text-red-500 group-hover/item:bg-red-500 group-hover/item:text-white transition-colors mr-3">
                      <LogOut className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-sm text-red-600 dark:text-red-400">Log out</span>
                  </DropdownMenuItem>
                </div>
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
