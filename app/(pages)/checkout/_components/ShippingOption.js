"use client";

import useCommonState from "@/app/src/hooks/useCommonState";
import mainPrice from "@/helpers/mainPrice";
import { useState } from "react";

export default function ShippingOption() {
  // Fix: useState should contain an array, not multiple arguments
  const [shippingOptions] = useState([
    {
      title: "Inside of Dhaka",
      fee: 40,
    },
    { 
      title: "Outside of Dhaka", 
      fee: 120 
    }
  ]);

  const { common, setCommon } = useCommonState();

  // Handle shipping option selection
  const handleShippingChange = (event) => {
    const selectedIndex = parseInt(event.target.value);
    const selectedOption = shippingOptions[selectedIndex];
    
    setCommon({
      ...common,
      shippingOption: selectedOption
    });
  };

  return (
    <div className="border border-gray-700 p-4">
      <h2 className="font-semibold text-lg mb-2">Shipping Option</h2>
      <select 
        name="shippingOption"
        onChange={handleShippingChange}
        className="bg-black border border-gray-600 px-4 py-2 w-full text-white text-sm"
        defaultValue={0} // Set default to first option
      >
        {shippingOptions.map((shipping, index) => (
          <option key={index} value={index}>
            {shipping?.title} - {mainPrice(shipping?.fee)}
          </option>
        ))}
      </select>
    </div>
  );
}