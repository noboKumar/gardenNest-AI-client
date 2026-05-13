"use client";

import React from "react";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-20">
      <div className="bg-white dark:bg-card border border-green-100 dark:border-green-900 rounded-[2rem] p-8 md:p-16 shadow-2xl space-y-12">
        <div className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center text-green-600 mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 13, 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Lock className="w-6 h-6 text-green-600" />
            <h3 className="font-bold">Data Security</h3>
            <p className="text-sm text-muted-foreground">We use industry-standard encryption to protect your data at rest and in transit.</p>
          </div>
          <div className="space-y-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold">Transparency</h3>
            <p className="text-sm text-muted-foreground">We are clear about what data we collect and how it is used to improve your experience.</p>
          </div>
          <div className="space-y-3">
            <FileText className="w-6 h-6 text-purple-600" />
            <h3 className="font-bold">Control</h3>
            <p className="text-sm text-muted-foreground">You have full control over your profile and can request data deletion anytime.</p>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 border-t pt-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p>At Garden Nest, we collect information to provide better services to all our users. This includes account information like your name, email, and gardening interests, as well as the content you share (tips, images, and comments).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to maintain and improve our services, develop new features (like our AI Gardening Assistant), and protect Garden Nest and our users.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. AI Data Usage</h2>
            <p>When you use our AI features, your inputs may be processed to provide context-aware responses. We do not sell your personal data to third parties for advertising purposes.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
