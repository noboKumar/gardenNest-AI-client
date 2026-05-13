"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
    toast.success("Message sent successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Get in <span className="text-green-600">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question, suggestion, or need help? We’d love to hear from you! 
              Fill out the form and our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ContactMethod 
              icon={Mail} 
              title="Email Us" 
              value="info@gardennest.com" 
              href="mailto:info@gardennest.com"
            />
            <ContactMethod 
              icon={Phone} 
              title="Call Us" 
              value="+1 (555) 123-4567" 
              href="tel:+15551234567"
            />
            <ContactMethod 
              icon={MapPin} 
              title="Our Studio" 
              value="123 Garden Lane, Green City" 
            />
          </div>

          <div className="space-y-4">
            <p className="font-bold text-lg">Follow Our Journey</p>
            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaGithub].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="rounded-full hover:bg-green-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="border-green-100 dark:border-green-950 shadow-2xl overflow-hidden">
            <CardHeader className="bg-green-600 text-white p-8">
              <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
              <CardDescription className="text-green-50">
                We usually respond within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Send className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold">Thank You!</h2>
                    <p className="text-muted-foreground">
                      Your message has been received. Our team will contact you shortly.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="John Doe" required className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input type="email" placeholder="john@example.com" required className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="How can we help you?" 
                        required 
                        className="min-h-[120px] bg-muted/50 resize-none" 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-bold"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                      <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function ContactMethod({ icon: Icon, title, value, href }: any) {
  const content = (
    <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-muted/50 transition-colors">
      <div className="p-3 bg-green-50 dark:bg-green-950 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}
