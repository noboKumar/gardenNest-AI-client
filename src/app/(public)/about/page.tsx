import React from "react";
import Link from "next/link";
import { Sprout, Target, Heart, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-green-50/50 dark:bg-green-950/10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
              About <span className="text-green-600">Garden Nest</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Welcome to Garden Nest – your community hub for gardening inspiration, tips, and sharing! Whether you’re new to gardening or a seasoned grower, our platform helps you connect, learn, and flourish together.
            </p>
          </div>
        </div>
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-[150px]" />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Target className="w-6 h-6 text-green-700 dark:text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our mission is to make gardening accessible and joyful for everyone. We believe that by sharing experiences, advice, and support, we can help gardens – and gardeners – thrive everywhere.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Heart className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Exclusivity and respect",
                    "Knowledge sharing",
                    "Sustainable practices",
                    "Celebrating creativity"
                  ].map((value, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-3xl -rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2" 
                alt="Gardening" 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <OfferCard 
              title="Gardening Tips" 
              description="Explore practical advice and best practices for all kinds of gardens." 
              icon={Sprout}
            />
            <OfferCard 
              title="Featured Gardeners" 
              description="Meet passionate gardeners and learn from their journeys." 
              icon={User}
            />
            <OfferCard 
              title="Interactive Forums" 
              description="Join discussions to ask questions and share your progress." 
              icon={Sparkles}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-green-600 text-white overflow-hidden border-none shadow-2xl">
            <CardContent className="p-12 md:p-20 text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold">Ready to Grow with Us?</h2>
              <p className="text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
                Join Garden Nest today and become part of a friendly, thriving gardening community. 
                Whether you want to share your story, ask a question, or find inspiration, we’re here to help you grow!
              </p>
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full group" asChild>
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function OfferCard({ title, description, icon: Icon }: any) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
      <CardContent className="p-8 space-y-4">
        <div className="p-4 bg-green-50 dark:bg-green-950 group-hover:bg-green-600 transition-colors rounded-2xl w-fit">
          <Icon className="w-8 h-8 text-green-600 group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
