import Link from "next/link";

import CartItem from "../../cart/_components/CartItem";
import CartHeader from "../../cart/_components/CartHeader";
import getCartById from "@/app/backend/queries/getCartById";
import mainPrice from "@/helpers/mainPrice";
import ShippingOption from "./ShippingOption";
import GrandTotal from "./GrandTotal";

import DeliveryOption from "./DeliveryOption";

import CheckoutSubmitter from "./CheckoutSubmitter";
import VoucherInput from "./VoucherInput";
import CheckoutButton from "./CheckoutButton";

export default async function CheckoutPage() {
  const carts = await getCartById();

  let totalPrice = carts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      {carts.length > 0 && carts ? (
        <>
          {" "}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2">
              <svg
                className="size-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0v6a2 2 0 11-4 0v-6m6 0a2 2 0 11-4 0"
                />
              </svg>
              <span className="text-white font-medium">
                {carts?.length} {carts?.length === 1 ? "Item" : "Items"} in
                Checkout
              </span>
            </div>
          </div>
          <CartHeader mode="checkout" />
          <div className="mt-4">
            {carts.length > 0 &&
              carts &&
              carts.map((cartItem) => (
                <CartItem
                  mode="checkout"
                  productId={cartItem?.productId}
                  cartId={cartItem?._id}
                  size={cartItem?.size}
                  title={cartItem?.productId?.title}
                  stock={cartItem?.stock}
                  thumbnail={cartItem?.productId?.thumbnail}
                  price={cartItem?.price}
                  quantity={cartItem?.quantity}
                  key={cartItem?._id}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center  items-center flex-col gap-4 min-h-[80vh]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-frown"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1={9} x2="9.01" y1={9} y2={9} />
            <line x1={15} x2="15.01" y1={9} y2={9} />
          </svg>
          <p>Your shopping cart is currently empty.</p>
          <div className="flex gap-2 items-center">
            {" "}
            <Link href="/" className="btn">
              Go To Home
            </Link>
            <Link href="/shop" className="variable-btn nav-border">
              Go To Shop
            </Link>
          </div>
        </div>
      )}

      {carts.length > 0 && (
        <CheckoutSubmitter totalPrice={totalPrice} cartItems={carts}>
          {/* Shipping Option */}
          <ShippingOption />
          {/* Delivery Option */}
          <DeliveryOption />
          {/* Summary */}
          <div className="border border-gray-700 mt-4 p-6 bg-gray-900 h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({carts?.length} items)</span>
                <span>{mainPrice(totalPrice)}</span>
              </div>

              {/* Voucher Input */}
              <VoucherInput totalPrice={totalPrice} />
              <hr className="my-4 border-gray-700" />
              <GrandTotal totalPrice={totalPrice} />
              <CheckoutButton totalItems={carts.length} />
            </div>
          </div>
        </CheckoutSubmitter>
      )}
    </div>
  );
}
