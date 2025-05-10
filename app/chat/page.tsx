"use client";

import { useState, useEffect, useRef } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Send, Bot, History, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Import Link from next/link

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const userName = user?.firstName || "User";
  const userProfilePicture = user?.imageUrl || "/default-profile.png"; // Fallback to a default image if no profile picture

  return (
    <div className="flex flex-col h-screen bg-[#1a202c] text-white font-['Inter',sans-serif] text-base pb-16">
      {/* Header */}
      <header
        className="flex justify-between items-center p-4 bg-[#1a202c] fixed top-0 left-0 w-full z-50"
      >
        <div className="flex items-center space-x-2 ml-5">
          <Link href="/">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#c0d7ff] to-[#5cafe7] bg-clip-text text-transparent font-['Helvetica',sans-serif] cursor-pointer">
              Chaitanya AI
            </h1>
          </Link>
        </div>
        <div className="relative">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 md:w-10 md:h-10",
              },
            }}
          />
        </div>
      </header>

      {/* Messages or Greeting */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 mt-16">
        {messages.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-[#ffffff]">
              {getGreeting()}, {userName}.
            </h2>
            <p className="text-[5vh] text-[#D3D3D3] mt-2">How can I help you today?</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2F2F2F] flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[#D3D3D3]" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl shadow-md ${
                    message.role === "user"
                      ? "bg-[#2F2F2F] text-white ml-auto"
                      : "bg-[#2F2F2F] text-[#D3D3D3]"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-base">{message.content}</p>
                  <p className="text-sm opacity-60 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={userProfilePicture}
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2F2F2F] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#D3D3D3]" />
                </div>
                <div className="bg-[#2F2F2F] p-4 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#D3D3D3] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-[#D3D3D3] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-[#D3D3D3] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-[#1a202c] fixed bottom-0 left-0 w-full border-t border-gray-700">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask Chaitanya anything..."
            className="w-full bg-[#2F2F2F] text-white rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2290ff] resize-none min-h-[50px] max-h-[200px] placeholder-[#B0B0B0] text-base"
            rows={1}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-[#FF5722] disabled:opacity-50"
            >
              <ArrowUp className="w-6 h-6 text-[#ffffff]" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}