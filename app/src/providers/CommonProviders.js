"use client";
import { useEffect, useState } from "react";
import { CommonContext } from "../context";
import { io } from "socket.io-client";

export default function CommonProviders({ children, authenticatedUser }) {
  const [common, setCommon] = useState({
    topbar: false,
    toast: false,
    toastMessage: "",
    modal: false,
    modalContent: null,
    addressContent: false,
    buyModal: false,
    productId: "",
    toastSuccess: true,
    mode: "",
    quantity: 0,
    hamburger: false,
    modalMode: "",
    isOpenModal: false,
    shippingOption: {
      title: "Inside of Dhaka",
      fee: 40,
    },
    modalTitle: "",
    discountApplied: 0,
    deleteProduct: {
      productId: "",
      title: "",
      sku: "",
      thumbnail: "",
    },
    deleteOrder: {
      orderId: "",
      transactionId: "",
    },
    selectedProducts: [],
    selectedShippingOption: {
      title: "Inside of Dhaka",
      fee: 40,
    },
    payementMethod: "Bkash",
    voucher: { amount: 0 },
    categoryModal: false,
    customerSupportModal: false,
  });
  const [checkout, setCheckout] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const socket = io();
  useEffect(() => {
    socket.emit("authenticatedUser", { authenticatedUser });
  });
  return (
    <CommonContext.Provider
      value={{
        common,
        setCommon,
        checkout,
        setCheckout,
        discountPercentage,
        setDiscountPercentage,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
