import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const Dashboard = () => {

  // Dummy Data for Charts
  const inventoryTurnoverData = [
    { month: 'Jan', value: 4.2 },
    { month: 'Feb', value: 4.5 },
    { month: 'Mar', value: 4.8 },
    { month: 'Apr', value: 5.1 },
    { month: 'May', value: 4.9 },
    { month: 'Jun', value: 5.3 },
  ];

  const stockLevelData = [
    { month: 'Jan', inStock: 850, lowStock: 120, outOfStock: 30 },
    { month: 'Feb', inStock: 920, lowStock: 95, outOfStock: 18 },
    { month: 'Mar', inStock: 880, lowStock: 110, outOfStock: 25 },
    { month: 'Apr', inStock: 950, lowStock: 85, outOfStock: 15 },
    { month: 'May', inStock: 900, lowStock: 100, outOfStock: 20 },
    { month: 'Jun', inStock: 980, lowStock: 70, outOfStock: 10 },
  ];

  const categoryDistribution = [
    { name: 'Electronics', value: 35, color: '#4F46E5' },
    { name: 'Furniture', value: 25, color: '#06B6D4' },
    { name: 'Clothing', value: 20, color: '#10B981' },
    { name: 'Food Items', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 8, color: '#8B5CF6' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, cost: 32000 },
    { month: 'Feb', revenue: 52000, cost: 35000 },
    { month: 'Mar', revenue: 48000, cost: 33000 },
    { month: 'Apr', revenue: 61000, cost: 38000 },
    { month: 'May', revenue: 55000, cost: 36000 },
    { month: 'Jun', revenue: 67000, cost: 40000 },
  ];

  const warehouseData = [
    { name: 'Warehouse A', capacity: 85, color: '#4F46E5' },
    { name: 'Warehouse B', capacity: 72, color: '#06B6D4' },
    { name: 'Warehouse C', capacity: 65, color: '#10B981' },
  ];

  const topProducts = [
    { product: 'Product A', sold: 245 },
    { product: 'Product B', sold: 198 },
    { product: 'Product C', sold: 167 },
    { product: 'Product D', sold: 142 },
    { product: 'Product E', sold: 125 },
  ];

  // Summary Cards Data
  const summaryCards = [
    {
      title: 'Total Items',
      value: '2,847',
      change: '+12.5%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Low Stock Items',
      value: '70',
      change: '-8.2%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'Out of Stock',
      value: '10',
      change: '-15.3%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      title: 'Total Value',
      value: '₹8.5M',
      change: '+18.7%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Welcome back! Here's your inventory overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{card.value}</h3>
                <p className={`text-sm mt-2 font-medium ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change} from last month
                </p>
              </div>
              <div className={`${card.bgColor} ${card.iconColor} p-3 rounded-lg`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Levels Trend */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Levels Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={stockLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="inStock" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="In Stock" />
              <Area type="monotone" dataKey="lowStock" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Low Stock" />
              <Area type="monotone" dataKey="outOfStock" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Out of Stock" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory by Category</h3>
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
        {/* Revenue vs Cost */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue vs Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} name="Revenue" />
              <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={3} name="Cost" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Turnover */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Turnover Rate</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={inventoryTurnoverData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#06B6D4" name="Turnover Rate" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Capacity */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Warehouse Capacity</h3>
          <div className="space-y-4">
            {warehouseData.map((warehouse, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{warehouse.name}</span>
                  <span className="text-sm font-bold text-gray-800">{warehouse.capacity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${warehouse.capacity}%`,
                      backgroundColor: warehouse.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis dataKey="product" type="category" stroke="#6b7280" style={{ fontSize: '12px' }} width={80} />
              <Tooltip />
              <Bar dataKey="sold" fill="#8B5CF6" name="Units Sold" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Table */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Avg Lead Time</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">7.5 days</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Order Accuracy</p>
            <p className="text-2xl font-bold text-green-600 mt-2">98.7%</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Carrying Cost</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">₹2.3M</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <p className="text-sm text-gray-600 font-medium">Shrinkage Rate</p>
            <p className="text-2xl font-bold text-orange-600 mt-2">1.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
