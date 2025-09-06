"use client";

import { useState } from "react";

const deliveryOptions = [
  {
    id: 1,
    title: "Bkash",
    icon: (
      <svg
        width={25}
        height={25}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".a{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;}",
              }}
            />
          </defs>
          <path
            className="a"
            d="M22.9814,8.6317s-4.1632,14.704-3.8089,14.704,16.4755,2.923,16.4755,2.923Z"
          />
          <polyline
            className="a"
            points="22.981 8.632 6.329 6.152 19.172 23.336 21.387 33.522 35.648 26.259 39.368 17.445 30.393 18.946"
          />
          <polyline
            className="a"
            points="37.929 20.855 43 20.855 39.368 17.445"
          />
          <polyline
            className="a"
            points="21.387 33.522 21.741 35.427 13.725 41.848 19.172 23.336"
          />
          <polyline
            className="a"
            points="35.648 26.259 35.117 29.138 22.848 32.778"
          />
          <polyline className="a" points="8.455 8.997 5 8.997 16.044 19.15" />
        </g>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Nagad",
    icon: (
      <svg
        viewBox="0 0 48 48"
        width={25}
        height={25}
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  ".a{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;}",
              }}
            />
          </defs>
          <path
            className="a"
            d="M18.8808,6.3975A19.3468,19.3468,0,1,0,42.3963,19.3847"
          />
          <path
            className="a"
            d="M14.9194,25.893C14.8584,21.68,17.4842,13.8021,26.4,9.955L22.7968,3.5432C17.4231,6.169,10.2174,15.2066,14.9194,25.893Z"
          />
          <path
            className="a"
            d="M22.136,12.4087a16.7784,16.7784,0,0,0-2.9215,8.8424c1.8394-3.7912,7.7259-9.6477,17.4192-9.0767l-.3362-7.347A17.9936,17.9936,0,0,0,25.6848,8.683"
          />
          <path
            className="a"
            d="M34.4651,12.1527A16.506,16.506,0,0,0,23.896,20.28c3.3473-2.56,11.238-5.1453,19.64-.2781l3.0022-6.7141a17.7464,17.7464,0,0,0-9.9239-1.5322"
          />
          <path
            className="a"
            d="M13.4377,20.0692a11.6039,11.6039,0,1,0,19.0467-2.7711"
          />
        </g>
      </svg>
    ),
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
            className={`w-full flex items-center gap-2 border border-gray-600 px-4 py-2 text-left transition hover:bg-secondary ${
              delivery.id === deliveryOption.id ? "bg-secondary" : ""
            }`}
          >
            {delivery?.icon || ""}

            {delivery.title}
          </button>
        ))}
      </div>
    </div>
  );
}
