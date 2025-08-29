"use client";

import { useState } from "react";

const deliveryOptions = [
  {
    id: 1,
    title: "Bkash",
  },
  {
    id: 2,
    title: "Nagad",
  },
  {
    id: 3,
    title: "Rocket",
  },
];

export default function DeliveryOption() {
  const [deliveryOption, setDeliveryOption] = useState(deliveryOptions[0]);

  return (
    <div className="border border-gray-700 p-4 space-y-2">
      <h2 className="font-semibold text-lg mb-2">Delivery Option</h2>
      <div className="space-y-2">
        <input
          type="hidden"
          value={deliveryOption.title}
          readOnly
          name="paymentMethod"
          className="bg-gray-800 border border-gray-600 px-4 py-2 w-full"
        />
        {deliveryOptions.map((delivery) => (
          <button
          type="button"
            onClick={() => setDeliveryOption(delivery)}
            key={delivery.id}
            className={`w-full border border-gray-600 px-4 py-2 text-left transition hover:bg-gray-800 ${
              delivery.id === deliveryOption.id ? "bg-gray-800" : ""
            }`}
          >
            {delivery.title}
          </button>
        ))}
      </div>
    </div>
  );
}
