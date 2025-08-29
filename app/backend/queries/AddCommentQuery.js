import { auth } from "@/auth";
import { dbConnect } from "../connection/dbConnect";
import { ReviewsModel } from "../models/ReviewsModel";

export default async function AddCommentQuery(productId, comment) {
  
  try {
    const loggedUser = await auth();
    const newcomment = {
      user: loggedUser?.user?.id,
      content: comment,
      productId,
    };
    await dbConnect();
    const response = await ReviewsModel.create(newcomment);
  } catch (err) {
    throw new Error(err.message);
  }
}
