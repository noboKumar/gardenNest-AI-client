"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Leaf } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


const GEMINI_API_KEY = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").trim();
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface Message {
  role: "user" | "bot";
  content: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm GardenSage, your AI gardening assistant. How can I help you grow today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "I'm currently in demo mode because no API key was found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables to enable my full wisdom!" }
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      console.log("Using API Key (first 5):", GEMINI_API_KEY.substring(0, 5) + "...");
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
      });

      const prompt = `You are GardenSage, a gardening expert. User Question: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "bot", content: text }]);
    } catch (error: any) {
      console.error("FULL GEMINI ERROR:", error);
      setMessages((prev) => [...prev, { role: "bot", content: `Error: ${error.message || "Failed to connect"}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-card border border-green-100 dark:border-green-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">GardenSage AI</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-black">Online Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-grow p-4 space-y-4 overflow-y-auto scrollbar-hide bg-green-50/10 dark:bg-green-950/5"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex w-full",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl flex gap-3",
                    msg.role === "user"
                      ? "bg-green-600 text-white rounded-tr-none"
                      : "bg-muted text-foreground rounded-tl-none border border-green-100 dark:border-green-900"
                  )}>
                    {msg.role === "bot" && <Bot className="w-4 h-4 mt-1 flex-shrink-0 opacity-50" />}
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    {msg.role === "user" && <User className="w-4 h-4 mt-1 flex-shrink-0 opacity-50" />}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                    <span className="text-xs text-muted-foreground italic">GardenSage is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-green-100 dark:border-green-950 bg-background/50">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your plants..."
                  className="bg-muted/50 border-green-100 dark:border-green-900 rounded-xl focus-visible:ring-green-600"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer",
          isOpen
            ? "bg-red-500 text-white rotate-90"
            : "bg-green-600 text-white"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
