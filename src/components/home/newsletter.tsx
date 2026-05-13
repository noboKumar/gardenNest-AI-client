"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Mail, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-24 bg-green-600 dark:bg-green-900 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-8 md:p-16 text-center text-white shadow-2xl">
          <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-8">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Don't Miss a Bloom!</h2>
          <p className="text-lg md:text-xl text-green-50/80 mb-10 max-w-2xl mx-auto font-medium">
            Join 12,000+ gardeners getting weekly AI-curated tips, seasonal guides, and exclusive plant care secrets delivered to their inbox.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-200" />
              <Input 
                type="email" 
                placeholder="Enter your garden email..." 
                className="bg-white/20 border-white/30 text-white placeholder:text-green-100/50 pl-12 h-14 rounded-2xl focus-visible:ring-white/50"
              />
            </div>
            <Button className="bg-white text-green-700 hover:bg-green-50 h-14 px-8 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-all">
              Subscribe <Send className="ml-2 w-5 h-5" />
            </Button>
          </form>
          <p className="mt-6 text-sm text-green-100/40 italic">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
