/* eslint-disable react/no-unescaped-entities */
"use client";
import { doSignOut } from "@/app/backend/actions";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserIcon({
  icon,
  user = {
    name: "John Doe",
    role: "Administrator",
  },
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Sample notification data - replace with your actual data
  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "You have a new order from customer #12345",
      time: "2 minutes ago",
      isRead: false,
      type: "order",
    },
    {
      id: 2,
      title: "Payment Confirmed",
      message: "Payment of $299.99 has been processed successfully",
      time: "1 hour ago",
      isRead: false,
      type: "payment",
    },
    {
      id: 3,
      title: "System Update",
      message: "Your dashboard has been updated with new features",
      time: "3 hours ago",
      isRead: true,
      type: "system",
    },
    {
      id: 4,
      title: "Message from Support",
      message: "Your ticket #ST-001 has been resolved",
      time: "1 day ago",
      isRead: true,
      type: "support",
    },
    {
      id: 5,
      title: "Welcome!",
      message: "Welcome to your new dashboard. Explore all the features.",
      time: "2 days ago",
      isRead: true,
      type: "welcome",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    }

    if (isUserMenuOpen || isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen, isNotificationOpen]);

  const handleLogout = async () => {
    await doSignOut();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6" />
            </svg>
          </div>
        );
      case "payment":
        return (
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        );
      case "system":
        return (
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        );
      case "support":
        return (
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center gap-3 ml-auto relative">
      {/* Notification Bell */}
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="text-gray-400 hover:text-white relative transition-colors p-2 rounded-lg hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bell"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {isNotificationOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-black rounded-lg shadow-2xl border border-gray-800 z-50 animate-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-gray-400">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer ${
                      !notification.isRead ? "bg-gray-900/50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-sm font-medium ${
                              notification.isRead
                                ? "text-gray-300"
                                : "text-white"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500 mt-2 block">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="text-gray-400"
                    >
                      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">No notifications</p>
                  <p className="text-gray-500 text-xs mt-1">
                    You're all caught up!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-800">
                <div className="flex gap-2">
                  <button className="flex-1 text-xs text-gray-400 hover:text-white transition-colors py-2 hover:bg-gray-800 rounded">
                    Mark all as read
                  </button>
                  <button className="flex-1 text-xs text-gray-400 hover:text-white transition-colors py-2 hover:bg-gray-800 rounded">
                    View all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Avatar Button */}
      <div className="relative" ref={userDropdownRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
        >
          <span className="text-sm font-semibold text-white">{icon}</span>
        </button>

        {/* User Dropdown Modal */}
        {isUserMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-black rounded-lg shadow-2xl border border-gray-800 z-50 animate-in slide-in-from-top-2 duration-200">
            {/* User Info Section */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-700 capitalize text-white mt-1">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/creator/inbox"
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-secondary flex items-center gap-3 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Inbox
              </Link>

              <div className="border-t border-gray-800 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-secondary flex items-center gap-3 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile */}
      {(isUserMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </div>
  );
}
