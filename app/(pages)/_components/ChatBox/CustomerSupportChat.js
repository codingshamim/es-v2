"use client";
import { useState, useRef, useEffect } from "react";

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sample chat messages - replace with your actual data
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to ES VIBES customer support. How can I help you today?",
      sender: "support",
      time: "10:30 AM",
      isBot: true,
    },
  ]);

  const quickOptions = [
    "Order Status",
    "Size Guide",
    "Return Policy",
    "Shipping Info",
    "Product Care",
    "Custom Design",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedOption && !selectedImage) return;

    const newMessage = {
      id: messages.length + 1,
      text: selectedOption || message || (selectedImage ? "📷 Image sent" : ""),
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isBot: false,
      image: imagePreview,
      imageName: selectedImage?.name,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setSelectedOption("");
    removeImage();

    // Simulate typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(selectedOption || message, !!selectedImage),
        sender: "support",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const getBotResponse = (userMessage, hasImage) => {
    if (hasImage) {
      return "Thanks for sharing the image! I can see it clearly. Let me help you with that. What specific assistance do you need regarding this image?";
    }

    const responses = {
      "Order Status":
        "I'd be happy to help you check your order status! Please provide your order number and I'll look it up for you.",
      "Size Guide":
        'Here\'s our size guide! For our premium t-shirts: S (36-38"), M (38-40"), L (40-42"), XL (42-44"), XXL (44-46"). Need help choosing?',
      "Return Policy":
        "We offer easy 30-day returns! Items must be unworn with tags. Free return shipping for exchanges. Would you like to start a return?",
      "Shipping Info":
        "We offer free shipping on orders over BDT 1000! Standard delivery takes 3-5 business days. Express delivery available in 1-2 days.",
      "Product Care":
        "To keep your ES VIBES tee looking fresh: Machine wash cold, tumble dry low, iron inside out. Avoid bleach and dry cleaning.",
      "Custom Design":
        "Love custom designs! We can create personalized tees with your artwork or text. Minimum order is 5 pieces. Interested in learning more?",
    };
    return (
      responses[userMessage] ||
      "Thanks for your message! Our team will get back to you shortly. Is there anything else I can help you with?"
    );
  };

  const handleQuickOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black group-hover:scale-110 transition-transform duration-300"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed md:bottom-6 right-2 md:right-6 w-[95%] h-screen md:w-[400px] md:h-[650px] bg-black rounded-2xl shadow-2xl border border-gray-800 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-black border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">ES</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  ES VIBES Support
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] ${msg.isBot ? "order-2" : "order-1"}`}
                >
                  {msg.isBot && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black text-xs font-bold">ES</span>
                      </div>
                      <span className="text-gray-400 text-xs">Support</span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.isBot
                        ? "bg-gray-800 text-white rounded-tl-md"
                        : "bg-white text-black rounded-tr-md"
                    } shadow-sm`}
                  >
                    {/* Image Display */}
                    {msg.image && (
                      <div className="mb-2">
                        <img
                          src={msg.image}
                          alt={msg.imageName || "Uploaded image"}
                          className="max-w-full h-auto rounded-lg shadow-sm"
                          style={{ maxHeight: "200px" }}
                        />
                        {msg.imageName && (
                          <p className="text-xs text-gray-500 mt-1">
                            {msg.imageName}
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        msg.isBot ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">ES</span>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-md ml-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="p-4 border-t border-gray-800 bg-gray-900/30">
              <div className="relative">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-xs">
                      Image to send:
                    </span>
                    <button
                      onClick={removeImage}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto rounded-md"
                    style={{ maxHeight: "100px" }}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {selectedImage?.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Options */}
          {messages.length === 1 && !imagePreview && (
            <div className="p-4 border-t border-gray-800 bg-gray-900/30">
              <p className="text-gray-400 text-xs mb-2">Quick options:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuickOption(option)}
                    className={`text-xs p-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
                      selectedOption === option
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-500 hover:bg-gray-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-black">
            <div className="flex gap-2">
              {/* Image Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-700"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={selectedOption || message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setSelectedOption("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder={
                    imagePreview
                      ? "Add a message (optional)..."
                      : "Type your message..."
                  }
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!message.trim() && !selectedOption && !selectedImage}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
