import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orders: [
      {
        productId: {
          type: Object
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    address: {
      type: Object,
      required: true,
    },
    delivered: {
      type: String,
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentStatus : {
      type : String,
      default : "pending"
    },
    paymentMethod: { type: String, required: true },
    shippingOption: {
      type: Object,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

export const orderModel =
  mongoose.models.orders ?? mongoose.model("orders", orderSchema);
