import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { orderModel } from "../models/orderModel";
import { auth } from "@/auth";

export default async function isReviewd(productId) {
  const logged = await auth();

  try {
    await dbConnect();

    const successedOrders = await orderModel.find({
      delivered: "Success",
      user: logged?.user?.id,
    });

    // Check if the product exists in any of the successful orders
    const isFound = successedOrders.some((order) => {
      const items = formateMongo(order.items);
      return items.some((item) => item.product === productId);
    });

    return {
      ok: isFound,
    };
  } catch (err) {
    throw new Error(err);
  }
}
