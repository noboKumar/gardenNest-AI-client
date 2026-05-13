"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EventData {
  id: number;
  image: string;
  title: string;
  organizer: string;
  location: string;
  time: string;
  ctaText: string;
}

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/upcomingEvents.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading event data:", err);
        setLoading(false);
      });
  }, []);

  const handleJoinEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Successfully registered for the event!");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-green-700 dark:text-green-500 mb-4">
            Upcoming Events
          </h2>
          <div className="h-1 w-24 bg-green-500 mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our local gardening meetups, workshops, and community planting drives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            : events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full group overflow-hidden border-green-100 dark:border-green-950 transition-all hover:shadow-2xl hover:-translate-y-2">
                    <CardHeader className="p-0 relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 hover:bg-green-700 text-white border-none shadow-lg">
                          New Event
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold group-hover:text-green-600 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-green-600" />
                          <span>Organizer: {event.organizer}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 font-medium text-foreground">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 transition-all">
                            {event.ctaText}
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Join the Event</DialogTitle>
                            <DialogDescription>
                              Register for {event.title}. We'll send you the details via email.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleJoinEvent} className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" placeholder="Enter your name" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" placeholder="Enter your email" required />
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                                Confirm Registration
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
