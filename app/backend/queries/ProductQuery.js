import formateMongo from "@/helpers/formateMongo";
import { dbConnect } from "../connection/dbConnect";
import { ProductModel } from "../models/ProductModel";

export async function getAllProducts(query, filter) {
  try {
    await dbConnect(); // Establish database connection

    let conditions = {};

    // 🔍 Search filter (title or description)
    if (query) {
      const regex = new RegExp(query, "i");
      conditions.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    // 🏷️ Category filter (array support)
    if (filter?.category?.length) {
      // Match products that contain ANY of the categories
      conditions.category = { $in: filter.category };

      // 👉 If you need to match ALL categories instead:
      // conditions.category = { $all: filter.category };
    }

    // Fetch products with filters
    const allProducts = await ProductModel.find(conditions).select({
      title: 1,
      price: 1,
      discount: 1,
      thumbnail: 1,
      description: 1,
      _id: 1,
      slug: 1,
      stock: 1,
      category: 1,
    });

    return formateMongo(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Something went wrong while fetching products");
  }
}
