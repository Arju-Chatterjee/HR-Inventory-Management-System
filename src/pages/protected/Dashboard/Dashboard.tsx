import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { customerOrders, dailyStockStatus, inventoryItems, monthlyPerformance, recentActivities, topSellingProducts, warehouseDetails } from '../../../data/inventoryData';

const Dashboard = () => {

  // Calculate summary statistics
  const totalItems = inventoryItems.length;
  const inStockItems = inventoryItems.filter(i => i.status === 'In Stock').length;
  const lowStockItems = inventoryItems.filter(i => i.status === 'Low Stock').length;
  const outOfStockItems = inventoryItems.filter(i => i.status === 'Out of Stock').length;

  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalStockQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);

  const pendingOrders = customerOrders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const completedOrders = customerOrders.filter(o => o.status === 'Delivered').length;

  // Current month data
  const currentMonthData = monthlyPerformance[monthlyPerformance.length - 1];

  // Category distribution for pie chart
  const categoryDistribution = [
    { name: 'Solar Panels', value: 35, color: '#4F46E5' },
    { name: 'Inverters', value: 20, color: '#06B6D4' },
    { name: 'Batteries', value: 15, color: '#10B981' },
    { name: 'Water Pumps', value: 12, color: '#F59E0B' },
    { name: 'Accessories', value: 10, color: '#8B5CF6' },
    { name: 'Others', value: 8, color: '#EC4899' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '🛒';
      case 'stock':
        return '📦';
      case 'alert':
        return '⚠️';
      case 'delivery':
        return '🚚';
      default:
        return '📋';
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Welcome back! Here's your solar equipment inventory overview</p>
      </div>

      {/* Summary Cards - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-5 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Items</p>
              <h3 className="text-3xl font-bold mt-2">{totalStockQuantity}</h3>
              <p className="text-blue-100 text-xs mt-2">Across {totalItems} products</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-5 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Inventory Value</p>
              <h3 className="text-3xl font-bold mt-2">₹{(totalInventoryValue / 10000000).toFixed(1)}Cr</h3>
              <p className="text-green-100 text-xs mt-2">Current stock value</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-5 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Active Orders</p>
              <h3 className="text-3xl font-bold mt-2">{pendingOrders}</h3>
              <p className="text-yellow-100 text-xs mt-2">{completedOrders} completed this month</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-5 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Monthly Revenue</p>
              <h3 className="text-3xl font-bold mt-2">₹{(currentMonthData.revenue / 100000).toFixed(1)}L</h3>
              <p className="text-purple-100 text-xs mt-2">Profit: ₹{(currentMonthData.profit / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">In Stock</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{inStockItems}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{lowStockItems}</p>
            </div>
            <div className="text-3xl">⚠️</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{outOfStockItems}</p>
            </div>
            <div className="text-3xl">❌</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue & Profit Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} name="Revenue (₹)" />
              <Area type="monotone" dataKey="profit" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Profit (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Stock Status */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Stock Status (Last 6 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyStockStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" fill="#10B981" name="In Stock" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lowStock" fill="#F59E0B" name="Low Stock" radius={[8, 8, 0, 0]} />
              <Bar dataKey="outOfStock" fill="#EF4444" name="Out of Stock" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Performance */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders Completed (6 Months)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ordersCompleted" stroke="#8B5CF6" strokeWidth={3} name="Orders Completed" />
              <Line type="monotone" dataKey="itemsSold" stroke="#06B6D4" strokeWidth={3} name="Items Sold" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <div className="lg:col-span-2 bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Solar Products</h3>
          <div className="space-y-3">
            {topSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.unitsSold} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₹{(product.revenue / 100000).toFixed(1)}L</p>
                  <p className={`text-xs font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {product.trend === 'up' ? '↑' : '↓'} Trending {product.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className={`p-3 rounded-lg border ${getActivityColor(activity.status)}`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{activity.message}</p>
                    <p className="text-xs opacity-75 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warehouse Performance */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Warehouse Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {warehouseDetails.map((warehouse) => (
            <div key={warehouse.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{warehouse.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${warehouse.utilizationPercent >= 80 ? 'bg-red-100 text-red-700' :
                    warehouse.utilizationPercent >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                  }`}>
                  {warehouse.utilizationPercent}%
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">{warehouse.location}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${warehouse.utilizationPercent}%`,
                    backgroundColor: warehouse.utilizationPercent >= 80 ? '#EF4444' :
                      warehouse.utilizationPercent >= 60 ? '#F59E0B' : '#10B981'
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {warehouse.currentStock.toLocaleString()} / {warehouse.capacity.toLocaleString()} units
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Avg Order Value</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">₹3.2L</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Order Fulfillment</p>
            <p className="text-2xl font-bold text-green-600 mt-2">94%</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Stock Turnover</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">5.2x</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Avg Lead Time</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">6 days</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Return Rate</p>
            <p className="text-2xl font-bold text-pink-600 mt-2">1.8%</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Customer Satisfaction</p>
            <p className="text-2xl font-bold text-indigo-600 mt-2">4.7★</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
