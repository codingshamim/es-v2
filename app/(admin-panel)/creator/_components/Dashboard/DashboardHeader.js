export default function DashboardHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-gray-400 mt-1">{children}</p>
      </div>
      <div className="flex items-center space-x-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide mr-2 lucide-layout-dashboard-icon lucide-layout-dashboard"
          >
            <rect width={7} height={9} x={3} y={3} rx={1} />
            <rect width={7} height={5} x={14} y={3} rx={1} />
            <rect width={7} height={9} x={14} y={12} rx={1} />
            <rect width={7} height={5} x={3} y={16} rx={1} />
          </svg>
          Export Report
        </button>
      </div>
    </div>
  );
}
