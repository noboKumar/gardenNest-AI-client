"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sprout, Eye, Filter, SortAsc, Heart } from "lucide-react";
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
import { motion } from "framer-motion";
import axios from "axios";

interface Tip {
  _id: string;
  title: string;
  level: string;
  category: string;
  description: string;
  imageURL: string;
  likedBy: string[];
}

export default function AllTipsDashboardPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortOrder, setSortOrder] = useState("new");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "";
        let headers = {};

        if (selectedLevel !== "all") {
          url = `https://ph-assignment-10-server-pi.vercel.app/tips/${selectedLevel}`;
        } else {
          url = "https://ph-assignment-10-server-pi.vercel.app/sortedTips";
          headers = { "sort-order": sortOrder };
        }

        const response = await axios.get(url, { headers });
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedLevel, sortOrder]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Sprout className="w-6 h-6 text-green-700 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Community Tips</h1>
            <p className="text-muted-foreground">Explore all gardening wisdom shared by our members.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Filter by Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-muted-foreground" />
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Newest First</SelectItem>
              <SelectItem value="old">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))
        ) : tips.length > 0 ? (
          tips.map((tip, index) => (
            <motion.div
              key={tip._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col group overflow-hidden border-green-100 dark:border-green-950 transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0 relative aspect-video overflow-hidden">
                  <Image
                    src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
                    alt={tip.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-md flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                      {tip.likedBy?.length || 0}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{tip.level}</Badge>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{tip.category}</Badge>
                  </div>
                  <h3 className="text-lg font-bold line-clamp-1 mb-2 group-hover:text-green-600 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {tip.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full border-green-200 dark:border-green-900 group-hover:bg-green-600 group-hover:text-white" asChild>
                    <Link href={`/browse-tips/${tip._id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground italic">No tips found for this criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
