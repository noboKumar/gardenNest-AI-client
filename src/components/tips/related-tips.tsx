"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SimpleTip {
  _id: string;
  title: string;
  category: string;
  imageURL: string;
}

export function RelatedTips({ category, currentId }: { category: string; currentId: string }) {
  const [related, setRelated] = useState<SimpleTip[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/searchTips?category=${category}`);
        // Filter out current tip and limit to 3
        const filtered = response.data
          .filter((t: any) => t._id !== currentId)
          .slice(0, 3);
        setRelated(filtered);
      } catch (error) {
        console.error("Error fetching related tips:", error);
      }
    };
    if (category) fetchRelated();
  }, [category, currentId]);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 mt-16">
      <div className="flex items-center gap-2">
        <Leaf className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold">Related Wisdom</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((tip) => (
          <Link href={`/browse-tips/${tip._id}`} key={tip._id} className="group">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-40">
                <Image
                  src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
                  alt={tip.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <Badge className="absolute top-2 left-2 bg-white/20 backdrop-blur-md border-none text-[10px]">
                  {tip.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
                  {tip.title}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
