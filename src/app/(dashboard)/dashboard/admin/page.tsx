"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  BookOpen, 
  Heart, 
  TrendingUp, 
  ShieldCheck, 
  UserPlus,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminStats {
  totalUsers: number;
  totalTips: number;
  publicTips: number;
  totalLikes: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  const statCards = [
    { 
      title: "Total Users", 
      value: stats?.totalUsers || 0, 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-100 dark:bg-blue-950/30",
      description: "Registered members"
    },
    { 
      title: "Total Tips", 
      value: stats?.totalTips || 0, 
      icon: BookOpen, 
      color: "text-green-600", 
      bg: "bg-green-100 dark:bg-green-950/30",
      description: "Shared wisdom"
    },
    { 
      title: "Total Likes", 
      value: stats?.totalLikes || 0, 
      icon: Heart, 
      color: "text-red-600", 
      bg: "bg-red-100 dark:bg-red-950/30",
      description: "Community engagement"
    },
    { 
      title: "Public Content", 
      value: stats?.publicTips || 0, 
      icon: TrendingUp, 
      color: "text-purple-600", 
      bg: "bg-purple-100 dark:bg-purple-950/30",
      description: "Live community posts"
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-600 rounded-2xl shadow-lg shadow-green-200 dark:shadow-none">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Admin <span className="text-green-600">Overview</span></h1>
            <p className="text-muted-foreground">Manage the Garden Nest ecosystem and track growth.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full border-green-200 dark:border-green-900" asChild>
            <Link href="/dashboard/admin/manage-users">
              <UserPlus className="w-4 h-4 mr-2" />
              Manage Users
            </Link>
          </Button>
          <Button className="rounded-full bg-green-600 hover:bg-green-700 text-white" asChild>
            <Link href="/dashboard/admin/manage-tips">
              <BookOpen className="w-4 h-4 mr-2" />
              Manage Content
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-xl shadow-gray-100 dark:shadow-none bg-card/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-3xl font-black">{stat.value}</h3>
                <p className="text-sm font-bold text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-green-100 dark:border-green-950 shadow-2xl">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Real-time analytics of community growth.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground italic">
            Chart integration coming soon...
          </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-950 shadow-2xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequent administrative tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActionButton 
              title="Audit Users" 
              desc="Review new registrations" 
              href="/dashboard/admin/manage-users" 
            />
            <ActionButton 
              title="Content Review" 
              desc="Manage community tips" 
              href="/dashboard/admin/manage-tips" 
            />
            <ActionButton 
              title="Global Settings" 
              desc="Configure site parameters" 
              href="#" 
              disabled
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActionButton({ title, desc, href, disabled }: any) {
  return (
    <Button 
      variant="outline" 
      className="w-full h-auto p-4 justify-between items-center border-dashed border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-950/30"
      disabled={disabled}
      asChild={!disabled}
    >
      {disabled ? (
        <div className="flex flex-col items-start gap-1">
          <p className="font-bold">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      ) : (
        <Link href={href} className="flex flex-col items-start gap-1 w-full">
          <p className="font-bold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </Link>
      )}
    </Button>
  );
}
