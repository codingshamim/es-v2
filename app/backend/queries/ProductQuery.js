import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

export async function getAllProducts(query) {
  try {
    await dbConnect(); // Establish database connection

    let allProducts = [];

    if (query) {
      const regex = new RegExp(query, "i"); // Case-insensitive regex
      allProducts = await ProductModel.find({
        $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
      }).select({
        title: 1,
        price: 1,
        discount: 1,
        thumbnail: 1,
        description: 1,
        _id: 1,
        slug: 1,
        stock: 1,
      });
    } else {
      allProducts = await ProductModel.find({}).select({
        title: 1,
        price: 1,
        discount: 1,
        thumbnail: 1,
        description: 1,
        _id: 1,
        slug: 1,
        stock: 1,
      });
    }

    return formateMongo(allProducts); // Format the results
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Something went wrong while fetching products");
  }
}
