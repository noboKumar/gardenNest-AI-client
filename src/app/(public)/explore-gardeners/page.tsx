import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sprout, Lightbulb, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Gardener {
  _id: string;
  name: string;
  image: string;
  specialty: string;
  totalSharedTips: number;
  status: string;
}

async function getGardeners() {
  const res = await fetch("https://ph-assignment-10-server-pi.vercel.app/users", { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch gardeners");
  return res.json();
}

export default async function ExploreGardenersPage() {
  const gardeners: Gardener[] = await getGardeners();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <Sprout className="w-10 h-10 text-green-700 dark:text-green-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Explore Gardeners
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl">
          Connect with experienced gardeners, learn from their journey, and grow your passion together.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {gardeners.map((gardener) => (
          <Card key={gardener._id} className="group border-green-100 dark:border-green-950 transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden bg-background/50 backdrop-blur-sm">
            <CardHeader className="flex flex-col items-center pt-8 pb-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-green-500 p-1 group-hover:scale-105 transition-transform">
                  <AvatarImage src={gardener.image} alt={gardener.name} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold">
                    {gardener.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-background ${gardener.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold group-hover:text-green-600 transition-colors">
                  {gardener.name}
                </h3>
                <Badge variant="secondary" className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-none">
                  {gardener.specialty}
                </Badge>
              </div>
              
              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-muted/50 rounded-full w-fit mx-auto">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">
                  {gardener.totalSharedTips} Tips Shared
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-8 px-8">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-11" asChild>
                <Link href={`/explore-gardeners/${gardener._id}`}>
                  View Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
