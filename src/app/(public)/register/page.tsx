"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  Briefcase,
  FileText,
  UserCheck,
  Search
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  photoUrl: z.string().url({ message: "Invalid photo URL" }).or(z.string().length(0)),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/, {
      message: "Password must include uppercase, lowercase, and special character",
    }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { createUser, updateUser, setUser, googleLogIn } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      photoUrl: "",
      email: "",
      password: "",
    },
  });



  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const result = await createUser(values.email, values.password);
      const userData = result.user;

      await updateUser({ displayName: values.name, photoURL: values.photoUrl });

      // Explicit sync with backend to include extra fields
      await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        name: values.name,
        email: values.email,
        photoURL: values.photoUrl,
        role: "visitor",
      });

      setUser({ ...userData, displayName: values.name, photoURL: values.photoUrl });

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogIn();
      toast.success(`Welcome, ${result.user?.displayName}!`);
      router.push("/");
    } catch (error: any) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="container max-w-lg mx-auto py-20 px-4">
      <Card className="border-green-100 dark:border-green-950 shadow-xl overflow-hidden">
        <CardHeader className="space-y-1 text-center bg-green-50/30 dark:bg-green-950/10 border-b">
          <CardTitle className="text-3xl font-black tracking-tight">Create Account</CardTitle>
          <CardDescription>
            Join our community of garden enthusiasts today.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="John Doe" className="pl-10 h-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="https://example.com/photo.jpg" className="pl-10 h-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="name@example.com" className="pl-10 h-11" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter a strong password"
                            className="pl-10 h-11"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-bold text-lg mt-6 shadow-lg shadow-green-100 dark:shadow-none" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Join Community"}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or register with</span>
            </div>
          </div>

          <Button variant="outline" type="button" onClick={handleGoogleLogin} className="w-full border-green-200 dark:border-green-900">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline font-bold">
              Login Now
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
