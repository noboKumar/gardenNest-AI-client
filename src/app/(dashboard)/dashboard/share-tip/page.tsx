"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import moment from "moment";
import { toast } from "sonner";
import {
  Sprout,
  Send,
  Image as ImageIcon,
  Layers,
  BookOpen,
  Eye,
  User,
  Mail,
  Sparkles,
  Loader2
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tipSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  type: z.string().min(2, { message: "Plant type is required" }),
  level: z.string(),
  category: z.string(),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  imageURL: z.string().url({ message: "Invalid image URL" }).or(z.string().length(0)),
  status: z.string(),
});

type TipFormValues = z.infer<typeof tipSchema>;

export default function ShareTipPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  const handleAIInstantDraft = async () => {
    const title = form.getValues("title");
    if (!title || title.length < 5) {
      toast.error("Please enter a descriptive title first (e.g., 'How to grow organic kale')");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      toast.error("AI API Key not found.");
      return;
    }

    setIsDrafting(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `Act as a gardening expert. Based on the title "${title}", generate a JSON object with these fields: 
      "type" (string, e.g. Vegetables), 
      "level" (Easy, Medium, or Hard), 
      "category" (Composting, Plant Care, Vertical Gardening, or Garden Bugs), 
      "description" (detailed paragraph). 
      Return ONLY the JSON. No markdown formatting.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().replace(/```json|```/g, "").trim();
      
      const draft = JSON.parse(text);
      
      form.setValue("type", draft.type || "");
      form.setValue("level", draft.level || "Easy");
      form.setValue("category", draft.category || "Plant Care");
      form.setValue("description", draft.description || "");
      
      toast.success("AI has prepared a draft for you! ✨");
    } catch (error) {
      console.error("AI Draft Error:", error);
      toast.error("Could not generate draft. Please try again.");
    } finally {
      setIsDrafting(false);
    }
  };

  const handleMagicRefine = async () => {
    const currentDescription = form.getValues("description");
    if (!currentDescription || currentDescription.length < 5) {
      toast.error("Please write a few words first so I can help you refine it!");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      toast.error("AI API Key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to enable this feature.");
      return;
    }

    setIsRefining(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
      });

      const prompt = `Refine this gardening tip into a professional one: "${currentDescription}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const refinedText = response.text();

      form.setValue("description", refinedText);
      toast.success("Tip refined with AI Magic! ✨");
    } catch (error) {
      console.error("AI Refine Error:", error);
      toast.error("AI Magic failed this time. Please try again!");
    } finally {
      setIsRefining(false);
    }
  };

  React.useEffect(() => {
    if (!loading && role === "visitor") {
      router.push("/dashboard");
      toast.error("Visitors cannot post tips. Please upgrade to Gardener.");
    }
  }, [role, loading, router]);

  const form = useForm<TipFormValues>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      title: "",
      type: "",
      level: "Easy",
      category: "Plant Care",
      description: "",
      imageURL: "",
      status: "Public",
    },
  });

  const onSubmit = async (values: TipFormValues) => {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        email: user?.email,
        author: user?.displayName,
        createdAt: moment().toISOString(),
        likedBy: [],
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/tips`, payload);
      if (response.data.acknowledged) {
        toast.success("Your gardening tip has been shared!");
        router.push("/browse-tips");
      }
    } catch (error) {
      toast.error("Failed to share tip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <Card className="border-green-100 dark:border-green-950 shadow-2xl">
        <CardHeader className="bg-green-50/50 dark:bg-green-950/10 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Sprout className="w-6 h-6 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Share a Garden Tip</CardTitle>
              <CardDescription>Spread your knowledge and help other gardeners bloom.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Tip Title</FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleAIInstantDraft}
                        disabled={isDrafting}
                        className="h-8 gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                      >
                        {isDrafting ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Sparkles className="h-3 w-3" />
                        )}
                        {isDrafting ? "Drafting..." : "AI Instant Draft"}
                      </Button>
                    </div>
                    <FormControl>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., How to Grow Organic Tomatoes" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plant Type</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Sprout className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="e.g., Vegetables, Roses" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <div className="flex items-center gap-2">
                              <Layers className="h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select level" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Composting">Composting</SelectItem>
                          <SelectItem value="Plant Care">Plant Care</SelectItem>
                          <SelectItem value="Vertical Gardening">Vertical Gardening</SelectItem>
                          <SelectItem value="Garden Bugs">Garden Bugs</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select visibility" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageURL"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="https://example.com/image.jpg" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <div className="flex items-center justify-between">
                        <FormLabel>Detailed Description</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleMagicRefine}
                          disabled={isRefining}
                          className="h-8 gap-2 border-green-200 bg-green-50/50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400"
                        >
                          {isRefining ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Sparkles className="h-3 w-3 text-green-600" />
                          )}
                          {isRefining ? "Refining..." : "Magic Refine"}
                        </Button>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Share your gardening wisdom here..."
                          className="min-h-[150px] bg-background resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t opacity-70">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-green-600" />
                  <span>Author: {user?.displayName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>Email: {user?.email}</span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-bold text-lg" disabled={isLoading}>
                {isLoading ? "Sharing..." : "Post Tip Now"}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
