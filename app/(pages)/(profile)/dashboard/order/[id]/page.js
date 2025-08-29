/* eslint-disable react/no-unescaped-entities */
import getOrder from "@/app/backend/queries/getOrder";
import { PaymentMethod } from "../_components/PaymentMethod";
import ShippingAddress from "../_components/ShippingAddress";
import OrderItem from "../_components/OrderItem";
import mainPrice from "@/helpers/mainPrice";
import Link from "next/link";

// Helper function to format date
const formatDate = (dateString) => {
  try {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Date not available";
  }
};

// Helper function to calculate total
const calculateTotal = (orders = [], shippingFee = 0) => {
  try {
    const subtotal = orders.reduce((sum, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    return {
      subtotal,
      shipping: Number(shippingFee) || 0,
      total: subtotal + (Number(shippingFee) || 0),
    };
  } catch (error) {
    console.error("Calculation error:", error);
    return { subtotal: 0, shipping: 0, total: 0 };
  }
};

// Helper function to get progress steps based on order status
const getProgressSteps = (delivered, paymentStatus, createdAt) => {
  try {
    const orderDate = formatDate(createdAt);
    const deliveredLower = (delivered || "").toLowerCase();
    const paymentLower = (paymentStatus || "").toLowerCase();

    return [
      {
        title: "Order Confirmed",
        completed: true,
        timestamp: orderDate,
        icon: "✓",
      },
      {
        title: "Processing Started",
        completed:
          paymentLower === "confirmed" ||
          paymentLower === "paid" ||
          deliveredLower !== "pending",
        timestamp: paymentLower === "pending" ? "Pending" : orderDate,
        icon:
          paymentLower === "confirmed" ||
          paymentLower === "paid" ||
          deliveredLower !== "pending"
            ? "✓"
            : "2",
      },
      {
        title: "Shipped",
        subtitle: deliveredLower === "shipped" ? "Out for Delivery" : undefined,
        completed:
          deliveredLower === "shipped" || deliveredLower === "delivered",
        timestamp:
          deliveredLower === "shipped" || deliveredLower === "delivered"
            ? "In Transit"
            : "Pending",
        icon:
          deliveredLower === "shipped" || deliveredLower === "delivered"
            ? "✓"
            : "3",
      },
      {
        title: "Delivered",
        completed: deliveredLower === "delivered",
        timestamp: deliveredLower === "delivered" ? "Completed" : "Pending",
        icon: deliveredLower === "delivered" ? "✓" : "4",
      },
    ];
  } catch (error) {
    console.error("Progress steps error:", error);
    return [
      {
        title: "Order Confirmed",
        completed: true,
        timestamp: "Aug 15, 2:30 PM",
        icon: "✓",
      },
      {
        title: "Processing Started",
        completed: true,
        timestamp: "Aug 15, 4:45 PM",
        icon: "✓",
      },
      {
        title: "Shipped",
        subtitle: "Out for Delivery",
        completed: false,
        timestamp: "Pending",
        icon: "3",
      },
      {
        title: "Delivered",
        completed: false,
        timestamp: "Pending",
        icon: "4",
      },
    ];
  }
};

// Helper function to get current status description
const getCurrentStatus = (delivered, paymentStatus) => {
  try {
    const deliveredLower = (delivered || "").toLowerCase();
    const paymentLower = (paymentStatus || "").toLowerCase();

    if (deliveredLower === "delivered") {
      return "Your order has been delivered successfully";
    } else if (deliveredLower === "shipped") {
      return "Your order is on the way to your address";
    } else if (paymentLower === "pending") {
      return "Waiting for payment confirmation to process your order";
    } else if (deliveredLower === "pending") {
      return "Your order is being prepared for shipment. Estimated ship date will be updated soon";
    } else {
      return "Your order status is being updated";
    }
  } catch (error) {
    console.error("Status description error:", error);
    return "Order status information is currently unavailable";
  }
};

// Error component
const OrderNotFound = () => (
  <div className="space-y-8 mt-6">
    <div className="bg-white/[0.02] backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
      <div className="text-red-400 text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-white mb-4">Order Not Found</h2>
      <p className="text-gray-400 mb-6">
        The order you're looking for doesn't exist or may have been removed.
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
        Back to Orders
      </button>
    </div>
  </div>
);

export default async function OrderDetails({ params }) {
  try {
    // Validate params
    if (!params) {
      return <OrderNotFound />;
    }

    const param = await params;
    const orderId = param?.id;

    if (!orderId) {
      return <OrderNotFound />;
    }

    // Fetch order with error handling
    let order;
    try {
      order = await getOrder(orderId);
    } catch (fetchError) {
      console.error("Error fetching order:", fetchError);
      return <OrderNotFound />;
    }

    // Validate order exists
    if (!order) {
      return <OrderNotFound />;
    }

    // Extract order data with safe fallbacks
    const orderId_display = order.transactionId || "Unknown";
    const orders = Array.isArray(order.orders) ? order.orders : [];
    const address = order.address || {};
    const user = order.user || {};
    const shippingOption = order.shippingOption || {};
    const delivered = order.delivered || "pending";
    const paymentStatus = order.paymentStatus || "unknown";
    const paymentMethod = order.paymentMethod || "Not specified";
    const transactionId = order.transactionId || null;
    const createdAt = order.createdAt;

    // Calculate totals
    const { subtotal, shipping, total } = calculateTotal(
      orders,
      shippingOption.fee
    );

    // Get dynamic progress steps
    const progressSteps = getProgressSteps(delivered, paymentStatus, createdAt);

    // Get current status description
    const statusDescription = getCurrentStatus(delivered, paymentStatus);

    // Handle empty orders
    if (orders.length === 0) {
      return (
        <div className="space-y-8 mt-6">
          <div className="bg-white/[0.02] backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8 text-center">
            <div className="text-yellow-400 text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-white mb-4">Empty Order</h2>
            <p className="text-gray-400 mb-6">
              This order exists but contains no items.
            </p>
            <div className="text-sm text-gray-500">
              <p>Order ID: {orderId_display}</p>
              <p>Created: {formatDate(createdAt)}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 mt-6">
        {/* Order Header */}
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">
                Order #{orderId_display.slice(-12)}
              </h2>
              <p className="text-gray-400">Placed on {formatDate(createdAt)}</p>
              {transactionId && (
                <p className="text-gray-500 text-sm mt-1">
                  Transaction ID: {transactionId}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-500">
                {mainPrice(total.toFixed(2))}
              </div>
              <div className="text-sm text-gray-400">Total Amount</div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center relative z-10">
              {progressSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 ${
                      step.completed
                        ? "bg-green-500 text-white transform scale-110"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium text-center text-white">
                    <div>{step.title}</div>
                    {step.subtitle && <div>{step.subtitle}</div>}
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-1">
                    {step.timestamp}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-700">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-full transition-all duration-500"
                style={{
                  width: `${
                    (Math.max(
                      0,
                      progressSteps.filter((step) => step.completed).length - 1
                    ) /
                      Math.max(1, progressSteps.length - 1)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                  delivered?.toLowerCase() === "delivered"
                    ? "bg-green-400"
                    : delivered?.toLowerCase() === "shipped"
                    ? "bg-blue-400"
                    : "bg-yellow-400"
                }`}
              ></div>
              <div>
                <div className="font-medium text-white">
                  {delivered?.toLowerCase() === "delivered"
                    ? "Order Delivered"
                    : delivered?.toLowerCase() === "shipped"
                    ? "Order Shipped"
                    : paymentStatus?.toLowerCase() === "pending"
                    ? "Payment Pending"
                    : "Currently Processing"}
                </div>
                <div className="text-sm text-gray-400">{statusDescription}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <h3 className="text-xl font-bold mb-4 text-white">Order Items</h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderItem order={order} key={order._id} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-700 mt-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">
                  {mainPrice(subtotal.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Shipping ({shippingOption.title || "Standard"}):
                </span>
                <span className="text-white">
                  {mainPrice(shipping.toFixed(2))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax:</span>
                <span className="text-white">BDT 0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-2">
                <span className="text-white">Total:</span>
                <span className="text-green-400">
                  {mainPrice(total.toFixed(2))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <ShippingAddress address={address} user={user} />
          <PaymentMethod
            paymentMethod={paymentMethod}
            paymentStatus={paymentStatus}
            transactionId={transactionId}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            href="/contact"
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </Link>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            Download Invoice
          </button>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="space-y-8 mt-6">
        <div className="bg-white/[0.02] backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">
            Unable to load order details. Please try again later.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}
