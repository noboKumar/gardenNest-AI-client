"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Shield, 
  UserX, 
  UserCheck, 
  Search,
  MoreVertical,
  Mail,
  Calendar,
  MoreHorizontal,
  ArrowUpDown
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

interface GardenUser {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  role: "user" | "gardener" | "admin";
  status: "Active" | "Blocked";
  createdAt: string;
  lastLogin: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<GardenUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/${userId}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole as any } : u));
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users/${userId}/status`, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
      setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus as any } : u));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Manage Users
          </h1>
          <p className="text-muted-foreground">Monitor community members and manage access roles.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..." 
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
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-12 w-48 rounded-lg" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-9 w-9 ml-auto rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id} className="hover:bg-green-50/30 dark:hover:bg-green-950/10 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-green-100 dark:border-green-900">
                        <AvatarImage src={user.photoURL} />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(
                      "font-bold px-3 py-1 border-none",
                      user.role === 'admin' ? "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400" :
                      user.role === 'gardener' ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                    )}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-bold",
                      user.status === 'Active' ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    )}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {moment(user.createdAt).format("MMM DD, YYYY")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'admin')} className="cursor-pointer">
                          <Shield className="w-4 h-4 mr-2 text-purple-600" />
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'gardener')} className="cursor-pointer">
                          <UserCheck className="w-4 h-4 mr-2 text-green-600" />
                          Make Gardener
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user._id, 'user')} className="cursor-pointer">
                          <Users className="w-4 h-4 mr-2 text-blue-600" />
                          Set as Regular User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'Active' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'Blocked')} className="text-red-600 focus:text-red-600 cursor-pointer">
                            <UserX className="w-4 h-4 mr-2" />
                            Block User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'Active')} className="text-green-600 focus:text-green-600 cursor-pointer">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Unblock User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                  No users found.
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
