"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Activity } from "lucide-react";

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I am your MediCare Connect Health Assistant. How can I help you today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newHistory = [...messages, { role: "user", content: userMessage }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages([...newHistory, { role: "ai", content: data.data.reply }]);
      } else {
        setMessages([...newHistory, { role: "ai", content: "I'm sorry, I encountered an error connecting to our secure server." }]);
      }
    } catch (error) {
      console.error("Error calling chat API:", error);
      setMessages([...newHistory, { role: "ai", content: "I'm sorry, I couldn't reach the server right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#006694] to-[#0094d4] p-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Activity size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg leading-tight">MediCare AI</h3>
                  <p className="text-blue-100 text-xs">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === "user" ? "bg-[#006694]" : "bg-gradient-to-br from-[#006694] to-[#0094d4]"}`}>
                    {msg.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div 
                    className={`p-3 rounded-2xl text-sm shadow-sm ${
                      msg.role === "user" 
                        ? "bg-[#006694] text-white rounded-br-sm" 
                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 self-start max-w-[80%]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006694] to-[#0094d4] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm flex gap-1.5 items-center h-[44px]">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-[#006694]/50 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-[#006694]/50 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-[#006694]/50 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <form onSubmit={handleSubmit} className="flex gap-2 items-center bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-[#006694] focus-within:ring-1 focus-within:ring-[#006694] transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-700 placeholder-gray-400"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="bg-[#006694] hover:bg-[#00527a] disabled:bg-gray-300 text-white p-2.5 rounded-full transition-colors flex-shrink-0"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-[#006694] to-[#0094d4] rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

export default AIAssistantWidget;
