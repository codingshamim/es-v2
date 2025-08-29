"use client";
import React, { useState } from "react";
import {
  Search,
  Reply,
  Archive,
  Star,
  Trash2,
  MoreVertical,
  Clock,
  User,
  Mail,
} from "lucide-react";

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState(null);

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
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-2">
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Inbox</h1>
            <p className="text-white/60 mt-1">
              Customer Messages & Support Requests
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/40 w-64"
              />
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Compose
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Message List */}
        <div className="w-[20%] border-r border-white/10">
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <button className="text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded text-sm">
                All
              </button>
              <button className="text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded text-sm">
                Unread
              </button>
              <button className="text-white/60 hover:text-white border border-white/20 px-3 py-1 rounded text-sm">
                Starred
              </button>
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                  selectedMessage?.id === message.id ? "bg-white/10" : ""
                } ${!message.isRead ? "border-l-2 border-l-white" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-medium">
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`font-medium ${
                          !message.isRead ? "text-white" : "text-white/80"
                        }`}
                      >
                        {message.sender}
                      </h3>
                      <div className="flex items-center gap-2">
                        {message.isStarred && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        <span className="text-white/40 text-sm">
                          {message.time}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`font-medium text-sm mb-1 ${
                        !message.isRead ? "text-white" : "text-white/70"
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-white/50 text-sm line-clamp-2">
                      {message.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="w-[80%] flex flex-col">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-medium">
                      {selectedMessage.avatar}
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">
                        {selectedMessage.sender}
                      </h2>
                      <p className="text-white/60 text-sm">
                        {selectedMessage.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Star
                        className={`w-5 h-5 ${
                          selectedMessage.isStarred
                            ? "text-yellow-500 fill-current"
                            : "text-white/40"
                        }`}
                      />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Archive className="w-5 h-5 text-white/40" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-white/40" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-white/40" />
                    </button>
                  </div>
                </div>
                <h1 className="text-xl font-semibold text-white mb-2">
                  {selectedMessage.subject}
                </h1>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMessage.time}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 leading-relaxed">
                    {selectedMessage.preview} Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                      Best regards,
                      <br />
                      {selectedMessage.sender}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Reply className="w-5 h-5 text-white/60" />
                  <span className="font-medium text-white">
                    Reply to {selectedMessage.sender}
                  </span>
                </div>
                <textarea
                  placeholder="Type your reply..."
                  rows="4"
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/40 resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button className="text-white/60 hover:text-white text-sm">
                      Add attachment
                    </button>
                    <button className="text-white/60 hover:text-white text-sm">
                      Schedule send
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                      Save Draft
                    </button>
                    <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white/60 mb-2">
                  Select a message
                </h3>
                <p className="text-white/40">
                  Choose a message from the inbox to view and reply
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
