import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { orderModel } from "../models/orderModel";
import { UserModel } from "../models/UserModel";

export default async function getOrder(orderId) {
  try {
    await dbConnect();
    if (orderId) {
      const order = await orderModel.find({ transactionId: orderId }).populate({
        path: "user",
        model: UserModel,
        select: ["name", "phone"],
      });

      return formateMongo(order)[0];
    } else {
      return [];
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
}
