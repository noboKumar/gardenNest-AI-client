"use client";

import React from "react";
import { useAuth } from "@/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import {
  User,
  Lightbulb,
  PlusCircle,
  Leaf,
  Home,
  ChevronRight,
  Menu,
  ShieldCheck,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role, status, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const sidebarLinks = [
    { name: "My Profile", href: "/dashboard", icon: User, exact: true },
    { name: "My Tips", href: "/dashboard/my-tips", icon: Lightbulb },
    { name: "Share Tip", href: "/dashboard/share-tip", icon: PlusCircle },
    { name: "Community Tips", href: "/dashboard/all-tips", icon: Leaf },
  ];

  const adminLinks = [
    { name: "Admin Overview", href: "/dashboard/admin", icon: ShieldCheck, exact: true },
    { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
    { name: "Manage Content", href: "/dashboard/admin/manage-tips", icon: Leaf },
  ];

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (!loading && status === "Blocked") {
      router.push("/");
    }
    if (!loading && pathname.startsWith("/dashboard/admin") && role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, role, status, loading, pathname, router]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading Dashboard...</div>;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-green-100 dark:border-green-950">
      <div className="p-6 border-b border-green-100 dark:border-green-950">
        <Logo />
      </div>
      <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 mb-2 opacity-50">Member Area</div>
        {sidebarLinks.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href) && !pathname.includes("/admin");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-950/50"
                  : "text-muted-foreground hover:bg-green-50 dark:hover:bg-green-950/20 hover:text-green-600"
              )}
            >
              <div className="flex items-center gap-3">
                <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-green-600")} />
                <span className="font-medium">{link.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}

        {role === "admin" && (
          <>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 mt-8 mb-2 opacity-50">Admin Panel</div>
            {adminLinks.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-purple-950/50"
                      : "text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-950/10 hover:text-purple-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-purple-600")} />
                    <span className="font-medium">{link.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </>
        )}
      </nav>
      <div className="p-4 border-t border-green-100 dark:border-green-950">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        {/* Dashboard Header */}
        <header className="h-20 border-b border-green-100 dark:border-green-950 bg-background/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {pathname.includes("/admin") ? "Admin Panel" : "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {role && (
              <Badge variant="outline" className={cn(
                "font-bold uppercase tracking-widest px-3",
                role === 'admin' ? "border-purple-500 text-purple-600" :
                  role === 'gardener' ? "border-green-500 text-green-600" :
                    "border-blue-500 text-blue-600"
              )}>
                {role}
              </Badge>
            )}
            <ThemeToggle />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow p-4 md:p-8">
          <div className="container mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
