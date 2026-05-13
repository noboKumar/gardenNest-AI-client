"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  Eye,
  Filter,
  SortAsc,
  MessageSquare,
  Heart,
  Share2,
  User,
  Search,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import moment from "moment";

interface Tip {
  _id: string;
  title: string;
  level: string;
  category: string;
  imageURL: string;
  description?: string;
  author?: string;
  authorImage?: string;
  createdAt?: string;
  likedBy?: string[];
}

export default function BrowseTipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("new");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "";
        let params: any = {};

        if (debouncedSearch || selectedCategory !== "all" || selectedLevel !== "all") {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/searchTips`;
          params = {
            search: debouncedSearch,
            category: selectedCategory,
            level: selectedLevel
          };
        } else {
          url = `${process.env.NEXT_PUBLIC_SERVER_URL}/sortedTips`;
        }

        const response = await axios.get(url, {
          params,
          headers: { "sort-order": sortOrder }
        });
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedLevel, selectedCategory, debouncedSearch, sortOrder]);

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 mb-12"
      >
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-2xl shadow-inner">
          <Sprout className="w-12 h-12 text-green-700 dark:text-green-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-center tracking-tight">
          Community <span className="text-green-600">Wisdom</span>
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl text-lg">
          Discover gardening secrets shared by our community. From balcony herbs to forest gardens.
        </p>
      </motion.div>

      <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md py-6 mb-12 border-y flex flex-col lg:flex-row justify-between items-center gap-6 px-6 rounded-2xl shadow-xl border-green-100/50 dark:border-green-900/50">
        <div className="w-full lg:max-w-xs relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-600 transition-colors" />
          <Input
            placeholder="Search tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-transparent border-2 border-green-400 dark:border-green-600 focus-visible:ring-1 focus-visible:ring-green-600/50 rounded-xl"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[130px] border-none bg-transparent font-bold focus:ring-0">
                <SelectValue placeholder="Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 border-l pl-4 md:pl-8">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] border-none bg-transparent font-bold focus:ring-0">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Plant Care">Plant Care</SelectItem>
                <SelectItem value="Composting">Composting</SelectItem>
                <SelectItem value="Vertical Gardening">Vertical Gardening</SelectItem>
                <SelectItem value="Garden Bugs">Garden Bugs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 border-l pl-4 md:pl-8">
            <SortAsc className="w-4 h-4 text-muted-foreground" />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[140px] border-none bg-transparent font-bold focus:ring-0">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Newest First</SelectItem>
                <SelectItem value="old">Oldest First</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : tips.length > 0 ? (
            tips.map((tip, index) => (
              <motion.div
                key={tip._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group h-full flex flex-col overflow-hidden border-green-100 dark:border-green-950 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
                      alt={tip.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={cn(
                        "font-bold border-none px-3",
                        tip.level === 'Easy' ? "bg-green-500 text-white" :
                          tip.level === 'Medium' ? "bg-blue-500 text-white" :
                            "bg-red-500 text-white"
                      )}>
                        {tip.level}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-none font-bold">
                        {tip.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8 border-2 border-green-500">
                          <AvatarImage src={tip.authorImage} />
                          <AvatarFallback className="bg-green-600 text-[10px]">
                            {tip.author?.charAt(0) || <User className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                          <p className="font-bold">{tip.author || "Community Member"}</p>
                          <p className="opacity-70">{tip.createdAt ? moment(tip.createdAt).fromNow() : "Recently shared"}</p>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black line-clamp-1 group-hover:text-green-400 transition-colors">
                        {tip.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-grow">
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed mb-4 italic">
                      "{tip.description || "Click to read more about this insightful gardening tip shared by our expert community members."}"
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between items-center border-t border-green-50 dark:border-green-900 mt-auto">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-bold">{tip.likedBy?.length || 0}</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-bold">0</span>
                      </button>
                    </div>
                    <Button variant="ghost" className="text-green-600 font-bold hover:bg-green-50 dark:hover:bg-green-950/30 group/btn" asChild>
                      <Link href={`/browse-tips/${tip._id}`}>
                        Read Post
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl font-bold text-muted-foreground">No tips found for this criteria.</p>
              <Button variant="link" onClick={() => setSelectedLevel("all")} className="mt-2 text-green-600">
                Clear all filters
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
