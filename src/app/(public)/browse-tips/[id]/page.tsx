"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import moment from "moment";
import { Heart, Calendar, Tag, Layers, ChevronLeft, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

interface TipDetails {
  _id: string;
  category: string;
  description: string;
  imageURL: string;
  level: string;
  title: string;
  type: string;
  likedBy: string[];
  createdAt: string;
}

export default function TipDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [tip, setTip] = useState<TipDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/browseTips/${id}`);
        setTip(response.data);
        setLikeCount(response.data.likedBy?.length || 0);
        setIsLiked(response.data.likedBy?.includes(user?.email));
      } catch (error) {
        console.error("Error fetching tip details:", error);
        toast.error("Failed to load tip details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id, user?.email]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like this tip");
      return;
    }
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tips/${id}/like`, {
        email: user.email
      });
      if (response.data.modifiedCount) {
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
        toast.success("Liked!");
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/4 mx-auto" />
        </div>
      </div>
    );
  }

  if (!tip) return null;

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Button variant="ghost" className="mb-8 hover:bg-green-50 dark:hover:bg-green-950/30" onClick={() => router.back()}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Tips
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-green-100 dark:border-green-950 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="relative h-[300px] md:h-[500px]">
          <Image
            src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
            alt={tip.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
              {tip.title}
            </h1>
            <div className="flex items-center gap-4 text-green-300">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{moment(tip.createdAt).format("MMMM Do, YYYY")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 px-4 py-1.5 border-none flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Level: {tip.level}
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 px-4 py-1.5 border-none flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category: {tip.category}
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 px-4 py-1.5 border-none flex items-center gap-2">
              <Sprout className="w-4 h-4" />
              Type: {tip.type}
            </Badge>
          </div>

          <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed text-center">
            {tip.description}
          </div>

          <div className="flex justify-center pt-8 border-t">
            <Button
              onClick={handleLike}
              variant={isLiked ? "default" : "outline"}
              className={cn(
                "h-14 px-8 rounded-full text-lg font-bold gap-3 transition-all transform hover:scale-105",
                isLiked ? "bg-red-500 hover:bg-red-600 text-white" : "border-red-200 dark:border-red-900 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
              )}
              disabled={isLiked}
            >
              <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
              {isLiked ? "Already Liked" : "Like this Tip"} ({likeCount})
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
