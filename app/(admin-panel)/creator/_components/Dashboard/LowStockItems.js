import { lowStockItems } from "@/app/actions/dashboard.action";
import formatePrice from "@/helpers/formatePrice";
import Image from "next/image";

export default async function LowStockItems() {
  const items = await lowStockItems();

  return (
    <>
      {items?.products.length > 0 && (
        <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Low Stock Alert</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle-icon text-yellow-400 lucide-triangle"
            >
              <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            </svg>
          </div>

          <div className="space-y-3">
            {items?.products.map((product) => (
              <div
                key={product?._id}
                className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-black transition-colors"
              >
                <div className="flex items-center">
                  <Image
                    width={48}
                    height={48}
                    src={product?.thumbnail}
                    alt={product?.title || "Unknown title"}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-white">
                      {product?.title || "Unknown title"}
                    </p>
                    <p className="text-sm text-gray-400">
                      SKU : {product?.sku || "Unknown SKU"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
