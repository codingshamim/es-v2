"use client";
import { useState, useEffect } from "react";
import { Search, Plus, Minus, X, MapPin, Phone, User } from "lucide-react";

export default function OrderCreatePage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
  });
  const [orderDetails, setOrderDetails] = useState({
    paymentMethod: "Bkash",
    shippingOption: {
      title: "Inside of Dhaka",
      fee: 40,
    },
    transactionId: "",
  });

  // Mock products data - replace with your API call
  const mockProducts = [
    {
      _id: "68a74ccd1241571b82fcfd26",
      title: "Sample Product 1",
      price: 110,
      discount: 10,
      sizes: ["S", "M", "L", "XL", "2XL"],
      thumbnail: "https://i.ibb.co.com/DWyckD7/image.png",
      stock: 5,
      category: ["Hoodie"],
    },
    {
      _id: "68a74ccd1241571b82fcfd27",
      title: "Sample Product 2",
      price: 150,
      discount: 15,
      sizes: ["S", "M", "L", "XL"],
      thumbnail: "https://i.ibb.co.com/mCVrkhQ/image.png",
      stock: 10,
      category: ["T-shirt"],
    },
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add product to order
  const addProductToOrder = (product, size) => {
    const existingIndex = selectedProducts.findIndex(
      (item) => item.productId === product._id && item.size === size
    );

    if (existingIndex >= 0) {
      const updated = [...selectedProducts];
      updated[existingIndex].quantity += 1;
      setSelectedProducts(updated);
    } else {
      const finalPrice =
        product.price - (product.price * product.discount) / 100;
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: product._id,
          title: product.title,
          price: finalPrice,
          originalPrice: product.price,
          discount: product.discount,
          size: size,
          quantity: 1,
          thumbnail: product.thumbnail,
        },
      ]);
    }
    setShowProductModal(false);
  };

  // Update quantity
  const updateQuantity = (index, change) => {
    const updated = [...selectedProducts];
    updated[index].quantity = Math.max(1, updated[index].quantity + change);
    setSelectedProducts(updated);
  };

  // Remove product
  const removeProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  // Calculate totals
  const subtotal = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = orderDetails.shippingOption.fee;
  const total = subtotal + shippingFee;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      orders: selectedProducts.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
      address: customerInfo,
      paymentMethod: orderDetails.paymentMethod,
      shippingOption: orderDetails.shippingOption,
      transactionId: orderDetails.transactionId,
      paymentStatus: "pending",
      delivered: "Processing",
    };

    console.log("Order Data:", orderData);
    // Add your API call here
    alert("Order created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create New Order
          </h1>
          <p className="text-gray-400">
            Add products and customer information to create an order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Products & Customer Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Products */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Selected Products
                </h2>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>

              {selectedProducts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                    <Search size={24} />
                  </div>
                  <p>No products selected</p>
                  <p className="text-sm">
                    Click "Add Product" to start building the order
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedProducts.map((item, index) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">
                          Size: {item.size}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          {item.discount > 0 && (
                            <span className="text-gray-400 line-through">
                              ৳{item.originalPrice}
                            </span>
                          )}
                          <span className="text-green-400 font-medium">
                            ৳{item.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="p-1 hover:bg-gray-600 rounded"
                        >
                          <Minus size={16} className="text-gray-400" />
                        </button>
                        <span className="text-white w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="p-1 hover:bg-gray-600 rounded"
                        >
                          <Plus size={16} className="text-gray-400" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-red-400 hover:text-red-300 mt-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <User size={20} />
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 md:col-span-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={customerInfo.city}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, city: e.target.value })
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="District"
                  value={customerInfo.district}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      district: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={customerInfo.postalCode}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Details */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">
                Order Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={orderDetails.paymentMethod}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="Bkash">Bkash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Cash">Cash on Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Shipping Option
                  </label>
                  <select
                    value={orderDetails.shippingOption.title}
                    onChange={(e) => {
                      const fee =
                        e.target.value === "Inside of Dhaka" ? 40 : 80;
                      setOrderDetails({
                        ...orderDetails,
                        shippingOption: { title: e.target.value, fee },
                      });
                    }}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="Inside of Dhaka">Inside Dhaka (৳40)</option>
                    <option value="Outside of Dhaka">
                      Outside Dhaka (৳80)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter transaction ID"
                    value={orderDetails.transactionId}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        transactionId: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({selectedProducts.length} items)</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping Fee</span>
                  <span>৳{shippingFee}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={selectedProducts.length === 0}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-medium"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>

        {/* Product Selection Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Select Product
                </h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-gray-700 rounded-lg p-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-white font-medium mb-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {product.discount > 0 && (
                        <span className="text-gray-400 line-through">
                          ৳{product.price}
                        </span>
                      )}
                      <span className="text-green-400 font-medium">
                        ৳
                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-red-400 text-sm">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">
                      Stock: {product.stock}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => addProductToOrder(product, size)}
                          className="bg-gray-600 hover:bg-blue-600 px-3 py-2 rounded text-white text-sm"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
