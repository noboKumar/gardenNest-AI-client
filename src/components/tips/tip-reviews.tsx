"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";
import axios from "axios";
import moment from "moment";
import { MessageSquare, Send, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Comment {
  _id: string;
  tipId: string;
  userName: string;
  userEmail: string;
  userImage: string;
  content: string;
  createdAt: string;
}

export function TipReviews({ tipId }: { tipId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${tipId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [tipId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        tipId,
        userName: user.displayName,
        userEmail: user.email,
        userImage: user.photoURL,
        content: newComment,
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, payload);
      if (response.data.acknowledged) {
        setComments([{ ...payload, _id: response.data.insertedId, createdAt: new Date().toISOString() } as Comment, ...comments]);
        setNewComment("");
        toast.success("Comment posted!");
      }
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 mt-12 border-t pt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold">Reviews & Comments ({comments.length})</h2>
      </div>

      {/* Post Comment */}
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-green-50/30 dark:bg-green-950/10 p-6 rounded-2xl border border-green-100 dark:border-green-900">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10 border border-green-200">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="Share your thoughts or ask a question about this tip..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] bg-background border-green-100 dark:border-green-900 focus-visible:ring-green-500 rounded-xl"
              />
              <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-xl h-11 px-6">
                {isSubmitting ? "Posting..." : "Post Comment"}
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted/50 p-6 rounded-2xl text-center border border-dashed">
          <p className="text-muted-foreground">Please sign in to join the conversation.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-4 group">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.userImage} />
              <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted/30 dark:bg-muted/10 p-4 rounded-2xl rounded-tl-none">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm text-foreground">{comment.userName}</h4>
                  <span className="text-xs text-muted-foreground">{moment(comment.createdAt).fromNow()}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground italic">
            No reviews yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
}
