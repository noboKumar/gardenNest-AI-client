"use client";

import React, { useEffect, useState } from "react";
import { 
  BookOpen, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface GardenTip {
  _id: string;
  title: string;
  category: string;
  level: string;
  status: string;
  email: string;
  imageURL: string;
}

export default function ManageTipsPage() {
  const [tips, setTips] = useState<GardenTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTips = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tips`);
      setTips(response.data);
    } catch (error) {
      console.error("Error fetching tips:", error);
      toast.error("Failed to load tips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleDelete = async (tipId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/tips/${tipId}`);
      toast.success("Tip removed from community");
      setTips(tips.filter(t => t._id !== tipId));
    } catch (error) {
      toast.error("Failed to delete tip");
    }
  };

  const filteredTips = tips.filter(tip => 
    tip.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tip.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-green-600" />
            Content Management
          </h1>
          <p className="text-muted-foreground">Audit and manage community shared gardening wisdom.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, category or email..." 
            className="pl-10 rounded-full border-green-200 dark:border-green-900 bg-background/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-green-100 dark:border-green-950 bg-card overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-12 w-20 rounded-lg" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-9 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredTips.length > 0 ? (
              filteredTips.map((tip) => (
                <TableRow key={tip._id} className="hover:bg-green-50/30 dark:hover:bg-green-950/10 transition-colors">
                  <TableCell>
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden border bg-muted">
                      <Image 
                        src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"} 
                        alt={tip.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs md:max-w-md">
                      <p className="font-bold text-foreground line-clamp-1">{tip.title}</p>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold mt-1">{tip.level}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <p className="text-muted-foreground">{tip.email}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-none">
                      {tip.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-bold",
                      tip.status === 'Public' ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                    )}>
                      {tip.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="rounded-full hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-600" asChild>
                        <Link href={`/browse-tips/${tip._id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Content?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove this gardening tip from the public community feed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(tip._id)} className="bg-red-600 hover:bg-red-700">
                              Delete Post
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center text-muted-foreground">
                  No community tips found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
