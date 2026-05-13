"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, TreeDeciduous, Plus, Eye } from "lucide-react";
import { toast } from "sonner";
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

interface Tip {
  _id: string;
  title: string;
  category: string;
  imageURL: string;
}

export default function MyTipsPage() {
  const { user } = useAuth();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyTips = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/myTips`, {
          email: user.email,
        });
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching my tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTips();
  }, [user?.email]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/tips/${id}`);
      if (response.data.deletedCount) {
        toast.success("Tip deleted successfully");
        setTips(tips.filter(tip => tip._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete tip");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <TreeDeciduous className="w-6 h-6 text-green-700 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Gardening Tips</h1>
            <p className="text-muted-foreground">Manage and track your contributions to the community.</p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
          <Link href="/dashboard/share-tip">
            <Plus className="w-4 h-4 mr-2" />
            Share New Tip
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px] text-center">No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-right pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-20 w-32 mx-auto rounded-lg" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-9 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : tips.length > 0 ? (
              tips.map((tip, index) => (
                <TableRow key={tip._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-bold text-foreground">{tip.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-none">
                      {tip.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="relative w-32 h-20 mx-auto rounded-lg overflow-hidden border">
                      <Image
                        src={tip.imageURL || "https://images.unsplash.com/photo-1416870230247-3b4a80247961"}
                        alt={tip.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600" asChild>
                        <Link href={`/browse-tips/${tip._id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-600" asChild>
                        <Link href={`/dashboard/update-tip/${tip._id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your gardening tip.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(tip._id)} className="bg-red-600 hover:bg-red-700">
                              Delete
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
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Plus className="w-12 h-12 opacity-20" />
                    <p className="text-xl font-medium">No tips shared yet</p>
                    <Button variant="link" className="text-green-600" asChild>
                      <Link href="/dashboard/share-tip">Start sharing now</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
