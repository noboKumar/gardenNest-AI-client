"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, MapPin, Briefcase, User as UserIcon, Calendar, Lightbulb, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import axios from "axios";

interface GardenerDetails {
  name: string;
  age: string;
  experience: string;
  gender: string;
  image: string;
  location: string;
  specialty: string;
  totalSharedTips: number;
  status: string;
}

export default function GardenerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [gardener, setGardener] = useState<GardenerDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGardener = async () => {
      try {
        const response = await axios.get(`https://ph-assignment-10-server-pi.vercel.app/users/${id}`);
        setGardener(response.data);
      } catch (error) {
        console.error("Error fetching gardener details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGardener();
  }, [id]);

  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4">
        <Skeleton className="h-[500px] w-full rounded-3xl" />
      </div>
    );
  }

  if (!gardener) {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Gardener Not Found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="relative overflow-hidden border-green-100 dark:border-green-950 shadow-2xl bg-background/50 backdrop-blur-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-6 left-6 z-10 rounded-full bg-background/80 hover:bg-green-600 hover:text-white"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <CardHeader className="flex flex-col items-center pt-16 pb-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-green-500 p-1 mb-6 overflow-hidden">
                <Image
                  src={gardener.image}
                  alt={gardener.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className={cn(
                "absolute bottom-8 right-4 w-6 h-6 rounded-full border-4 border-background",
                gardener.status === "Active" ? "bg-green-500" : "bg-gray-400"
              )} />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-foreground">{gardener.name}</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-none px-6 py-1 text-lg">
                {gardener.specialty}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="px-10 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-green-50 dark:border-green-900">
              <InfoItem icon={MapPin} label="Location" value={gardener.location} />
              <InfoItem icon={Briefcase} label="Experience" value={gardener.experience} />
              <InfoItem icon={UserIcon} label="Gender" value={gardener.gender} />
              <InfoItem icon={Calendar} label="Age" value={gardener.age} />
            </div>

            <div className="mt-12 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 bg-green-600 text-white px-10 py-4 rounded-2xl shadow-xl shadow-green-200 dark:shadow-green-950/50"
              >
                <Lightbulb className="w-8 h-8" />
                <div className="text-left">
                  <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Community Impact</p>
                  <p className="text-2xl font-black">{gardener.totalSharedTips} Tips Shared</p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-muted rounded-lg text-green-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
