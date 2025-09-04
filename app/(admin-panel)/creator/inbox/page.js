"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Send,
  Archive,
  Star,
  Trash2,
  MoreVertical,
  Clock,
  User,
  Mail,
  Paperclip,
  Smile,
  Image,
  Menu,
  X,
} from "lucide-react";

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatContainerRef = useRef(null);

  const messages = [
    {
      id: 1,
      sender: "John Smith",
      email: "john.smith@email.com",
      subject: "Order #12345 - Delivery Issue",
      preview:
        "Hi, I have an issue with my recent order delivery. The package was supposed to arrive yesterday but...",
      time: "2 hours ago",
      isRead: false,
      isStarred: true,
      avatar: "JS",
      chatHistory: [
        {
          id: 1,
          sender: "John Smith",
          message:
            "Hi, I have an issue with my recent order delivery. The package was supposed to arrive yesterday but it hasn't shown up yet. Can you help me track it?",
          time: "2 hours ago",
          isUser: false,
        },
      ],
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      email: "sarah.j@email.com",
      subject: "Product Return Request",
      preview:
        "I would like to return the blue sweater I purchased last week. The size doesn't fit properly...",
      time: "4 hours ago",
      isRead: true,
      isStarred: false,
      avatar: "SJ",
      chatHistory: [
        {
          id: 1,
          sender: "Sarah Johnson",
          message:
            "I would like to return the blue sweater I purchased last week. The size doesn't fit properly and I need a smaller size.",
          time: "4 hours ago",
          isUser: false,
        },
        {
          id: 2,
          sender: "Admin",
          message:
            "Hi Sarah! I'd be happy to help you with the return. Can you please provide your order number?",
          time: "3 hours ago",
          isUser: true,
        },
        {
          id: 3,
          sender: "Sarah Johnson",
          message:
            "Sure! My order number is #67890. Thank you for the quick response!",
          time: "3 hours ago",
          isUser: false,
        },
        {
          id: 4,
          sender: "Admin",
          message:
            "Perfect! I've found your order. I'll process the return and send you a prepaid shipping label within 24 hours.",
          time: "2 hours ago",
          isUser: true,
        },
        {
          id: 5,
          sender: "Sarah Johnson",
          message:
            "That's amazing service! Thank you so much for your help. I really appreciate the quick response.",
          time: "2 hours ago",
          isUser: false,
        },
      ],
    },
    {
      id: 3,
      sender: "Mike Davis",
      email: "mike.davis@email.com",
      subject: "Question about Product Specifications",
      preview:
        "Could you please provide more details about the technical specifications of the laptop model...",
      time: "1 day ago",
      isRead: true,
      isStarred: false,
      avatar: "MD",
      chatHistory: [
        {
          id: 1,
          sender: "Mike Davis",
          message:
            "Could you please provide more details about the technical specifications of the laptop model XYZ-123?",
          time: "1 day ago",
          isUser: false,
        },
      ],
    },
    {
      id: 4,
      sender: "Emma Wilson",
      email: "emma.wilson@email.com",
      subject: "Thank you for excellent service!",
      preview:
        "I wanted to express my gratitude for the outstanding customer service I received...",
      time: "2 days ago",
      isRead: false,
      isStarred: true,
      avatar: "EW",
      chatHistory: [
        {
          id: 1,
          sender: "Emma Wilson",
          message:
            "I wanted to express my gratitude for the outstanding customer service I received. The team went above and beyond to help me!",
          time: "2 days ago",
          isUser: false,
        },
      ],
    },
    {
      id: 5,
      sender: "Robert Brown",
      email: "robert.brown@email.com",
      subject: "Billing Inquiry",
      preview:
        "I noticed an unusual charge on my account and would like clarification on the billing...",
      time: "3 days ago",
      isRead: true,
      isStarred: false,
      avatar: "RB",
      chatHistory: [
        {
          id: 1,
          sender: "Robert Brown",
          message:
            "I noticed an unusual charge on my account and would like clarification on the billing details.",
          time: "3 days ago",
          isUser: false,
        },
      ],
    },
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedMessage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim() && selectedMessage) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", chatMessage);
      setChatMessage("");
    }
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setSidebarOpen(false); // Close sidebar on mobile when message is selected
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-white">
                Inbox
              </h1>
              <p className="text-white/60 mt-1 text-sm lg:text-base hidden sm:block">
                Customer Messages & Support Requests
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 w-48 lg:w-64"
              />
            </div>
            <button className="bg-white text-black px-3 py-2 lg:px-4 rounded-lg font-medium hover:bg-white/90 transition-colors text-sm lg:text-base">
              <span className="hidden sm:inline">Compose</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] relative">
        {/* Message List Sidebar */}
        <div
          className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-[400px] xl:w-[450px] 
          bg-black border-r border-white/10 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          lg:block
        `}
        >
          {/* Mobile sidebar header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="font-semibold">Messages</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4 overflow-x-auto">
              <button className="text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded text-sm whitespace-nowrap">
                All
              </button>
              <button className="text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded text-sm whitespace-nowrap">
                Unread
              </button>
              <button className="text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded text-sm whitespace-nowrap">
                Starred
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-120px)] lg:h-[calc(100%-80px)]">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageSelect(message)}
                className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                  selectedMessage?.id === message.id ? "bg-white/10" : ""
                } ${!message.isRead ? "border-l-2 border-l-white" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`font-medium text-sm lg:text-base truncate ${
                          !message.isRead ? "text-white" : "text-white/80"
                        }`}
                      >
                        {message.sender}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {message.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <span className="text-white/40 text-xs lg:text-sm">
                          {message.time}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`font-medium text-xs lg:text-sm mb-1 truncate ${
                        !message.isRead ? "text-white" : "text-white/70"
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-white/50 text-xs lg:text-sm line-clamp-2">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="p-3 lg:p-4 border-b border-white/10 bg-white/5 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center font-medium text-xs lg:text-sm flex-shrink-0">
                      {selectedMessage.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-white text-sm lg:text-base truncate">
                        {selectedMessage.sender}
                      </h2>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <p className="text-white/60 text-xs lg:text-sm">
                          Active now
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
                    <button className="p-1.5 lg:p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Star
                        className={`w-4 h-4 lg:w-5 lg:h-5 ${
                          selectedMessage.isStarred
                            ? "text-yellow-500 fill-current"
                            : "text-white/40"
                        }`}
                      />
                    </button>
                    <button className="p-1.5 lg:p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Archive className="w-4 h-4 lg:w-5 lg:h-5 text-white/40" />
                    </button>
                    <button className="p-1.5 lg:p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 lg:w-5 lg:h-5 text-white/40" />
                    </button>
                    <button className="p-1.5 lg:p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5 text-white/40" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4"
                style={{ minHeight: 0 }}
              >
                {selectedMessage.chatHistory?.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 lg:gap-3 ${
                      chat.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!chat.isUser && (
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-1">
                        {selectedMessage.avatar}
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] lg:max-w-[70%] ${
                        chat.isUser ? "order-2" : "order-1"
                      }`}
                    >
                      <div
                        className={`p-2.5 lg:p-3 rounded-2xl ${
                          chat.isUser
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-white/10 text-white rounded-bl-md"
                        }`}
                      >
                        <p className="text-xs lg:text-sm leading-relaxed break-words">
                          {chat.message}
                        </p>
                      </div>
                      <p className="text-xs text-white/40 mt-1 px-1">
                        {chat.time}
                      </p>
                    </div>
                    {chat.isUser && (
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 order-1 mt-1">
                        A
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 lg:p-4 border-t border-white/10 flex-shrink-0 bg-black">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-end gap-2 lg:gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 p-2.5 lg:p-3 bg-white/10 rounded-2xl border border-white/20 focus-within:border-white/40">
                      <button
                        type="button"
                        className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0 hidden sm:block"
                      >
                        <Paperclip className="w-4 h-4 lg:w-5 lg:h-5 text-white/60" />
                      </button>
                      <button
                        type="button"
                        className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0 hidden sm:block"
                      >
                        <Image className="w-4 h-4 lg:w-5 lg:h-5 text-white/60" />
                      </button>
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm lg:text-base min-w-0"
                      />
                      <button
                        type="button"
                        className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                      >
                        <Smile className="w-4 h-4 lg:w-5 lg:h-5 text-white/60" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!chatMessage.trim()}
                    className="p-2.5 lg:p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-white/20 disabled:cursor-not-allowed rounded-full transition-colors flex-shrink-0"
                  >
                    <Send className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <Mail className="w-12 h-12 lg:w-16 lg:h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-base lg:text-lg font-medium text-white/60 mb-2">
                  Select a message
                </h3>
                <p className="text-white/40 text-sm lg:text-base">
                  Choose a message from the inbox to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
