export default function RecentActivity() {
  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <i className="fas fa-clock text-gray-400" />
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
          <div>
            <p className="text-gray-300">New order #1847</p>
            <p className="text-gray-500">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
          <div>
            <p className="text-gray-300">Product reviewed</p>
            <p className="text-gray-500">15 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
          <div>
            <p className="text-gray-300">Stock updated</p>
            <p className="text-gray-500">1 hour ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
