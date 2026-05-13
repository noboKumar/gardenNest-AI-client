"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import moment from "moment";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileText, 
  Heart, 
  Award, 
  Clock, 
  Calendar,
  Mail,
  User as UserIcon,
  PlusCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyProfilePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    allTipsCount: 0,
    myTipsCount: 0,
    totalLikes: 0,
    mostLiked: { title: "", likesCount: 0 },
    latestTip: null as any,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        const [allTips, myTips, mostLikedTip] = await Promise.all([
          axios.get("https://ph-assignment-10-server-pi.vercel.app/browseTips"),
          axios.post("https://ph-assignment-10-server-pi.vercel.app/myTips", { email: user.email }),
          axios.post("https://ph-assignment-10-server-pi.vercel.app/myMostLikedTip", { email: user.email })
        ]);

        const totalLikesCount = myTips.data.reduce((sum: number, tip: any) => sum + (tip.likedBy?.length || 0), 0);
        const sortedTips = [...myTips.data].filter(t => t.createdAt).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setStats({
          allTipsCount: allTips.data.length,
          myTipsCount: myTips.data.length,
          totalLikes: totalLikesCount,
          mostLiked: mostLikedTip.data,
          latestTip: sortedTips[0] || null,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-48 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-green-100 dark:border-green-950 overflow-hidden shadow-xl">
          <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-700" />
          <CardContent className="relative pt-0 pb-8 px-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || ""} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-green-100 text-green-700">
                  {user?.displayName?.charAt(0) || "G"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left space-y-2 pb-2">
                <h2 className="text-3xl font-extrabold text-foreground">{user?.displayName}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-green-600" />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Joined {moment(user?.metadata?.creationTime).format("MMMM YYYY")}
                  </div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-4 py-1.5 mb-2">
                Active Member
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="All Posts" 
          value={stats.allTipsCount} 
          description="Community activity" 
          icon={FileText} 
          color="blue"
          delay={0.1}
        />
        <StatCard 
          title="My Tips" 
          value={stats.myTipsCount} 
          description="Your contributions" 
          icon={PlusCircle} 
          color="green"
          delay={0.2}
        />
        <StatCard 
          title="Total Likes" 
          value={stats.totalLikes} 
          description="Received from others" 
          icon={Heart} 
          color="red"
          delay={0.3}
        />
        <StatCard 
          title="Top Performance" 
          value={stats.mostLiked.likesCount || 0} 
          description={stats.mostLiked.title || "No likes yet"} 
          icon={Award} 
          color="amber"
          delay={0.4}
        />
      </div>

      {/* Latest Tip Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-green-100 dark:border-green-950 bg-green-50/50 dark:bg-green-950/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Latest Contribution
              </CardTitle>
              <CardDescription>Your most recent shared tip</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {stats.latestTip ? (
              <div className="bg-background border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-green-700 dark:text-green-500">{stats.latestTip.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{stats.latestTip.category}</Badge>
                    <span>Posted {moment(stats.latestTip.createdAt).fromNow()}</span>
                  </div>
                </div>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href={`/browse-tips/${stats.latestTip._id}`}>View Tip</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground italic">
                You haven't shared any tips yet. Start sharing to see your progress!
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, description, icon: Icon, color, delay }: any) {
  const colors: any = {
    green: "bg-green-50 text-green-600 dark:bg-green-950/30",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30",
    red: "bg-red-50 text-red-600 dark:bg-red-950/30",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6 flex items-center gap-4">
          <div className={cn("p-4 rounded-2xl", colors[color])}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{value}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
