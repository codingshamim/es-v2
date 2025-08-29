import getOrder from "@/app/backend/queries/getOrder";
import OrderItems from "./_components/OrderItems";
import OrderTimeline from "./_components/OrderTimeline";
import ShippingAddress from "./_components/ShippingAddress";

import OrderHeader from "./_components/OrderHeader";
import PaymentInformation from "./_components/PaymentInformation";
import OrderSummary from "./_components/OrderSummary";

import { calculateItemTotal } from "@/helpers/calculateItemTotal";
import CustomerInformation from "./_components/CustomerInformation";
import OrderAction from "./_components/OrderAction";

export default async function OrderViewPage({ params }) {
  const param = await params;
  const order = await getOrder(param?.orderid || null);
  const total = calculateItemTotal(order?.orders);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <OrderHeader transactionId={order?.transactionId} />

      <div className=" mx-auto px-6 py-8">
        {/* Order Status Timeline */}
        <OrderTimeline status={order?.delivered} createdAt={order?.createdAt} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Order Items & Details */}
          <div className="xl:col-span-2 space-y-8">
            {/* Order Items */}
            <OrderItems orders={order?.orders} />

            {/* Shipping Address */}
            <ShippingAddress address={order?.address} />
            {/* Payment Information */}
            <PaymentInformation
              createdAt={order?.createdAt}
              paymentMethod={order?.paymentMethod}
              paymentStatus={order?.paymentStatus}
              transactionId={order?.transactionId}
            />
          </div>

          {/* Right Column - Order Summary & Actions */}
          <div className="space-y-8">
            {/* Order Summary */}
            <OrderSummary
              total={total}
              shippingOption={order?.shippingOption}
            />

            {/* Order Actions */}
            <OrderAction orderId={order?._id} />

            {/* Customer Information */}
            <CustomerInformation user={order?.user} />
          </div>
        </div>
      </div>
    </div>
  );
}
