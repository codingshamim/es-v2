"use client";

import { useState, useRef, useCallback } from "react";
import districts from "@/database/districts.json";
import cities from "@/database/cities.json";
import postcodes from "@/database/postcodes.json";
import generateTransactionId from "@/helpers/generateTransactionId";
import { makeCheckout } from "@/app/actions/checkout.action";
import { useRouter } from "next/navigation";

const shippingOptions = [
  {
    title: "Inside of Dhaka",
    fee: 40,
  },
  {
    title: "Outside of Dhaka",
    fee: 120,
  },
];

// Validation schemas
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/,
  },
  phone: {
    required: true,
    pattern: /^(?:\+8801|01)[3-9]\d{8}$/, // Bangladesh phone number pattern
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  district: {
    required: true,
  },
  city: {
    required: true,
  },
};

export default function CheckoutSubmitter({
  children,
  cartItems = [],
  totalPrice,
}) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const router = useRouter();
  const formRef = useRef(null);

  // Validation function
  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return "";

    if (rule.required && (!value || value.trim() === "")) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be at least ${rule.minLength} characters`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must not exceed ${
        rule.maxLength
      } characters`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      if (name === "name") {
        return "Name can only contain letters and spaces";
      }
      if (name === "phone") {
        return "Please enter a valid Bangladesh phone number";
      }
      return `Invalid ${name} format`;
    }

    return "";
  }, []);

  // Validate all form data
  const validateForm = useCallback(
    (data) => {
      const newErrors = {};

      Object.keys(validationRules).forEach((field) => {
        const error = validateField(field, data[field]);
        if (error) {
          newErrors[field] = error;
        }
      });

      // Validate payment method
      if (!data.paymentMethod) {
        newErrors.paymentMethod = "Payment method is required";
      }

      // Validate shipping option
      if (data.shippingOption === undefined || data.shippingOption === "") {
        newErrors.shippingOption = "Shipping option is required";
      }

      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        newErrors.cart = "Your cart is empty";
      }

      return newErrors;
    },
    [cartItems, validateField]
  );

  // Sanitize input data
  const sanitizeData = useCallback((data) => {
    const sanitized = {};

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        // Basic XSS prevention - strip HTML tags and trim
        sanitized[key] = data[key].replace(/<[^>]*>?/gm, "").trim();
      } else {
        sanitized[key] = data[key];
      }
    });

    return sanitized;
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const form = new FormData(event.target);
      const rawData = Object.fromEntries(form.entries());
      const sanitizedData = sanitizeData(rawData);

      const address = {
        name: sanitizedData?.name || "",
        phone: sanitizedData?.phone || "",
        address: sanitizedData?.address || "",
        city: sanitizedData?.city || "",
        district: sanitizedData?.district || "",
        postalCode: sanitizedData?.postalCode || "",
      };

      const paymentMethod = sanitizedData?.paymentMethod || "";
      const shippingOptionIndex = parseInt(sanitizedData?.shippingOption) || 0;
      const shippingOption = shippingOptions[shippingOptionIndex];

      // Validate form
      const formData = {
        ...address,
        paymentMethod,
        shippingOption: shippingOptionIndex,
      };

      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // Validate cart items structure
      const validCartItems = cartItems.filter(
        (item) =>
          item.productId &&
          item.quantity &&
          item.price &&
          item.size &&
          typeof item.quantity === "number" &&
          typeof item.price === "number" &&
          item.quantity > 0 &&
          item.price > 0
      );

      if (validCartItems.length !== cartItems.length) {
        setSubmitError(
          "Some items in your cart are invalid. Please refresh and try again."
        );
        return;
      }

      const checkout = {
        orders: validCartItems,
        address,
        paymentMethod,
        shippingOption,
        transactionId: generateTransactionId(),
      };

      const checkoutResponse = await makeCheckout(checkout);

      if (checkoutResponse?.error) {
        setSubmitError(
          checkoutResponse.message ||
            "Failed to process checkout. Please try again."
        );
      } else {
        router.push(
          `/order-success?transactionId=${checkoutResponse?.data?.transactionId}&totalAmount=${totalPrice}&name=${checkoutResponse?.data?.name}&fee=${shippingOption.fee}`
        );
        setSubmitSuccess(
          "Order placed successfully! You will receive a confirmation shortly."
        );
        // Optional: Reset form or redirect
        event.target.reset();
        setPostalCode("");
        setFilteredCities([]);
        setSelectedDistrictId(null);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Clear error for the field being changed
      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }

      // Real-time validation
      const fieldError = validateField(name, value);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }

      // District change logic
      if (name === "district") {
        const selected = districts.find((d) => d.name === value);
        if (selected) {
          setSelectedDistrictId(selected.id);
          const matchedCities = cities.filter(
            (city) => city.district_id === selected.id
          );
          setFilteredCities(matchedCities);
          setPostalCode("");

          // Clear city error if district is selected
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.city;
            return updated;
          });
        } else {
          setFilteredCities([]);
          setSelectedDistrictId(null);
          setPostalCode("");
        }
      }

      // City change logic
      if (name === "city") {
        const matchedPostcode = postcodes.find(
          (p) =>
            p.district_id === selectedDistrictId &&
            p.upazila.toLowerCase() === value.toLowerCase()
        );
        setPostalCode(matchedPostcode?.postCode || "");
      }
    },
    [errors, validateField, selectedDistrictId]
  );

  const inputBaseClass =
    "bg-black px-4 py-2 w-full text-white text-sm border transition-colors duration-200 focus:outline-none focus:border-white ";

  const getInputClass = (field) =>
    `${inputBaseClass} ${
      errors[field]
        ? "!border-red-500 focus:ring-red-500"
        : "outline-none border-gray-600 focus:border-white"
    }`;

  return (
    <form onSubmit={handleCheckout} ref={formRef} noValidate>
      {submitError && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-900/20 border border-green-500 text-green-400 px-4 py-3 rounded mb-4">
          {submitSuccess}
        </div>
      )}

      <div className="border border-gray-700 p-4 space-y-4 mt-4">
        <h2 className="font-semibold text-lg">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              onChange={handleChange}
              className={getInputClass("name")}
              maxLength={100}
              disabled={isSubmitting}
              required
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (01XXXXXXXXX) *"
              onChange={handleChange}
              className={getInputClass("phone")}
              maxLength={14}
              disabled={isSubmitting}
              required
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <select
              name="district"
              onChange={handleChange}
              className={getInputClass("district")}
              defaultValue=""
              disabled={isSubmitting}
              required
              aria-invalid={errors.district ? "true" : "false"}
              aria-describedby={errors.district ? "district-error" : undefined}
            >
              <option value="" disabled>
                Select District *
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p
                id="district-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.district}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <select
              name="city"
              onChange={handleChange}
              className={getInputClass("city")}
              defaultValue=""
              disabled={isSubmitting || filteredCities.length === 0}
              required
              aria-invalid={errors.city ? "true" : "false"}
              aria-describedby={errors.city ? "city-error" : undefined}
            >
              <option value="" disabled>
                {filteredCities.length === 0
                  ? "Select District First"
                  : "Select City *"}
              </option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && (
              <p
                id="city-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.city}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code (Optional)"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className={getInputClass("postalCode")}
              maxLength={10}
              disabled={isSubmitting}
            />
          </div>

          {/* Address */}
          <div>
            <textarea
              name="address"
              placeholder="Detailed Address *"
              onChange={handleChange}
              className={`${getInputClass("address")} min-h-[80px] resize-none`}
              maxLength={500}
              disabled={isSubmitting}
              required
              aria-invalid={errors.address ? "true" : "false"}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <p
                id="address-error"
                className="text-red-500 text-xs mt-1"
                role="alert"
              >
                {errors.address}
              </p>
            )}
          </div>
        </div>
      </div>

      {children}
    </form>
  );
}
