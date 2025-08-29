import Link from "next/link";

export default function OrderHeader({ transactionId }) {
  return (
    <div className="bg-black border-b border-gray-800">
      <div className=" mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/creator/orders"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-lg hover:bg-secondary flex items-center justify-center mr-3 bg-black transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left-icon lucide-arrow-left"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </div>
              Back to Orders
            </Link>
            <div className="h-8 w-px bg-gray-700" />
            <div>
              <h1 className="text-3xl font-bold text-white">Order Details</h1>
              <p className="text-gray-400 mt-1">
                Transaction ID: {transactionId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors border border-gray-700">
              <i className="fas fa-print mr-2" />
              Print Invoice
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
              <i className="fas fa-edit mr-2" />
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
