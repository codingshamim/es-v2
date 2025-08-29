"use client";
import { useState } from "react";
import { CommonContext } from "../context";

export default function CommonProviders({ children }) {
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
  });
  const [checkout, setCheckout] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(null);

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
