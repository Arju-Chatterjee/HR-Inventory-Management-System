export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  cost: number;
  supplier: string;
  location: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
}

export interface CustomerOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  items: string[];
  totalValue: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  orderDate: string;
  deliveryDate?: string;
}

export interface WarehouseDetail {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  utilizationPercent: number;
  manager: string;
}

export interface MonthlyPerformance {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  itemsSold: number;
  ordersCompleted: number;
}

export interface RecentActivity {
  id: number;
  type: "order" | "stock" | "alert" | "delivery";
  message: string;
  timestamp: string;
  status: "success" | "warning" | "error" | "info";
}

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  itemsSupplied: number;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    sku: "SOL-PNL-001",
    name: "Monocrystalline Solar Panel 540W",
    category: "Solar Panels",
    quantity: 150,
    minStock: 30,
    price: 18500,
    cost: 14000,
    supplier: "SunPower Solutions",
    location: "Warehouse A - Solar Panels A1",
    status: "In Stock",
    lastUpdated: "2025-11-20",
  },
  {
    id: 2,
    sku: "SOL-PNL-002",
    name: "Polycrystalline Solar Panel 330W",
    category: "Solar Panels",
    quantity: 8,
    minStock: 20,
    price: 12000,
    cost: 9000,
    supplier: "SunPower Solutions",
    location: "Warehouse A - Solar Panels A2",
    status: "Low Stock",
    lastUpdated: "2025-11-22",
  },
  {
    id: 3,
    sku: "SOL-INV-001",
    name: "On-Grid Solar Inverter 5KW",
    category: "Inverters",
    quantity: 0,
    minStock: 10,
    price: 45000,
    cost: 35000,
    supplier: "PowerTech Inverters",
    location: "Warehouse B - Inverters B1",
    status: "Out of Stock",
    lastUpdated: "2025-11-18",
  },
  {
    id: 4,
    sku: "SOL-INV-002",
    name: "Hybrid Solar Inverter 10KW",
    category: "Inverters",
    quantity: 32,
    minStock: 8,
    price: 85000,
    cost: 68000,
    supplier: "PowerTech Inverters",
    location: "Warehouse B - Inverters B2",
    status: "In Stock",
    lastUpdated: "2025-11-21",
  },
  {
    id: 5,
    sku: "SOL-BAT-001",
    name: "Lithium Battery 150Ah 12V",
    category: "Batteries",
    quantity: 45,
    minStock: 15,
    price: 28000,
    cost: 22000,
    supplier: "EnergyStore Batteries",
    location: "Warehouse C - Batteries C1",
    status: "In Stock",
    lastUpdated: "2025-11-19",
  },
  {
    id: 6,
    sku: "SOL-PUMP-001",
    name: "Solar Water Pump 1HP",
    category: "Solar Water Pumps",
    quantity: 12,
    minStock: 20,
    price: 32000,
    cost: 25000,
    supplier: "AquaSolar Systems",
    location: "Warehouse D - Pumps D1",
    status: "Low Stock",
    lastUpdated: "2025-11-23",
  },
  {
    id: 7,
    sku: "SOL-PUMP-002",
    name: "Solar Submersible Pump 3HP",
    category: "Solar Water Pumps",
    quantity: 25,
    minStock: 10,
    price: 55000,
    cost: 42000,
    supplier: "AquaSolar Systems",
    location: "Warehouse D - Pumps D2",
    status: "In Stock",
    lastUpdated: "2025-11-20",
  },
  {
    id: 8,
    sku: "SOL-ACC-001",
    name: "Solar Charge Controller 40A",
    category: "Accessories",
    quantity: 6,
    minStock: 15,
    price: 8500,
    cost: 6500,
    supplier: "SolarTech Components",
    location: "Warehouse E - Accessories E1",
    status: "Low Stock",
    lastUpdated: "2025-11-24",
  },
  {
    id: 9,
    sku: "SOL-ACC-002",
    name: "MC4 Connector Set (100 pairs)",
    category: "Accessories",
    quantity: 80,
    minStock: 30,
    price: 3500,
    cost: 2500,
    supplier: "SolarTech Components",
    location: "Warehouse E - Accessories E2",
    status: "In Stock",
    lastUpdated: "2025-11-22",
  },
  {
    id: 10,
    sku: "SOL-STR-001",
    name: "Solar Panel Mounting Structure",
    category: "Mounting Structures",
    quantity: 95,
    minStock: 25,
    price: 12000,
    cost: 9000,
    supplier: "MetalWorks Structures",
    location: "Warehouse F - Structures F1",
    status: "In Stock",
    lastUpdated: "2025-11-21",
  },
  {
    id: 11,
    sku: "SOL-LIGHT-001",
    name: "Solar Street Light 60W",
    category: "Solar Lighting",
    quantity: 40,
    minStock: 20,
    price: 15000,
    cost: 11000,
    supplier: "BrightSolar Lights",
    location: "Warehouse G - Lighting G1",
    status: "In Stock",
    lastUpdated: "2025-11-20",
  },
  {
    id: 12,
    sku: "SOL-HOME-001",
    name: "Complete Solar Home System 3KW",
    category: "Home Solutions",
    quantity: 18,
    minStock: 5,
    price: 180000,
    cost: 145000,
    supplier: "HomeSolar Solutions",
    location: "Warehouse H - Complete Systems H1",
    status: "In Stock",
    lastUpdated: "2025-11-19",
  },
];

export const warehouseDetails: WarehouseDetail[] = [
  {
    id: 1,
    name: "Warehouse A",
    location: "Pune, Maharashtra",
    capacity: 10000,
    currentStock: 8500,
    utilizationPercent: 85,
    manager: "Rajesh Kumar",
  },
  {
    id: 2,
    name: "Warehouse B",
    location: "Ahmedabad, Gujarat",
    capacity: 8000,
    currentStock: 5760,
    utilizationPercent: 72,
    manager: "Priya Sharma",
  },
  {
    id: 3,
    name: "Warehouse C",
    location: "Bangalore, Karnataka",
    capacity: 12000,
    currentStock: 7800,
    utilizationPercent: 65,
    manager: "Amit Patel",
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Solar Panels",
    description: "Monocrystalline and Polycrystalline solar panels",
    itemCount: 2,
  },
  {
    id: 2,
    name: "Inverters",
    description: "On-grid, Off-grid, and Hybrid solar inverters",
    itemCount: 2,
  },
  {
    id: 3,
    name: "Batteries",
    description: "Lithium-ion and Lead-acid solar batteries",
    itemCount: 1,
  },
  {
    id: 4,
    name: "Solar Water Pumps",
    description: "Submersible and surface solar water pumps",
    itemCount: 2,
  },
  {
    id: 5,
    name: "Accessories",
    description: "Cables, connectors, charge controllers",
    itemCount: 2,
  },
  {
    id: 6,
    name: "Mounting Structures",
    description: "Panel mounting and installation structures",
    itemCount: 1,
  },
  {
    id: 7,
    name: "Solar Lighting",
    description: "Street lights and home lighting solutions",
    itemCount: 1,
  },
  {
    id: 8,
    name: "Home Solutions",
    description: "Complete solar power backup systems for homes",
    itemCount: 1,
  },
];

export const recentActivities: RecentActivity[] = [
  {
    id: 1,
    type: "order",
    message: "New order #ORD-2025-106 received from Green Energy Corp",
    timestamp: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    type: "alert",
    message: "Low stock alert: Solar Charge Controller 40A",
    timestamp: "15 min ago",
    status: "warning",
  },
  {
    id: 3,
    type: "delivery",
    message: "Order #ORD-2025-102 delivered to Eco Farms",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "stock",
    message: "50 units of Solar Panels received at Warehouse A",
    timestamp: "2 hours ago",
    status: "info",
  },
  {
    id: 5,
    type: "alert",
    message: "Out of stock: On-Grid Solar Inverter 5KW",
    timestamp: "3 hours ago",
    status: "error",
  },
  {
    id: 6,
    type: "order",
    message: "Order #ORD-2025-104 moved to processing",
    timestamp: "4 hours ago",
    status: "info",
  },
  {
    id: 7,
    type: "delivery",
    message: "Order #ORD-2025-105 delivered to Urban Solar Co",
    timestamp: "5 hours ago",
    status: "success",
  },
  {
    id: 8,
    type: "stock",
    message: "Stock transfer completed: Mounting Structures to Warehouse F",
    timestamp: "6 hours ago",
    status: "info",
  },
];

// Customer Orders
export const customerOrders: CustomerOrder[] = [
  {
    id: 1,
    orderNumber: "ORD-2025-101",
    customerName: "Green Homes Pvt Ltd",
    items: ["Solar Panels 540W (10)", "Inverter 10KW (1)", "Battery (2)"],
    totalValue: 285000,
    status: "Processing",
    orderDate: "2025-11-20",
    deliveryDate: "2025-11-28",
  },
  {
    id: 2,
    orderNumber: "ORD-2025-102",
    customerName: "Eco Farms",
    items: ["Solar Water Pump 3HP (2)", "Mounting Structure (2)"],
    totalValue: 134000,
    status: "Delivered",
    orderDate: "2025-11-18",
    deliveryDate: "2025-11-23",
  },
  {
    id: 3,
    orderNumber: "ORD-2025-103",
    customerName: "Sunshine Builders",
    items: ["Complete Home System 3KW (5)"],
    totalValue: 900000,
    status: "Pending",
    orderDate: "2025-11-22",
  },
  {
    id: 4,
    orderNumber: "ORD-2025-104",
    customerName: "AgroTech Solutions",
    items: ["Solar Pump 1HP (3)", "Solar Panels 330W (6)"],
    totalValue: 168000,
    status: "Processing",
    orderDate: "2025-11-21",
    deliveryDate: "2025-11-27",
  },
  {
    id: 5,
    orderNumber: "ORD-2025-105",
    customerName: "Urban Solar Co",
    items: ["Inverter 5KW (2)", "Battery (4)", "Charge Controller (2)"],
    totalValue: 214000,
    status: "Delivered",
    orderDate: "2025-11-19",
    deliveryDate: "2025-11-24",
  },
];

export const topSellingProducts = [
  {
    name: "Monocrystalline Solar Panel 540W",
    unitsSold: 245,
    revenue: 4532500,
    trend: "up",
  },
  {
    name: "Complete Solar Home System 3KW",
    unitsSold: 42,
    revenue: 7560000,
    trend: "up",
  },
  {
    name: "Hybrid Solar Inverter 10KW",
    unitsSold: 85,
    revenue: 7225000,
    trend: "up",
  },
  {
    name: "Lithium Battery 150Ah 12V",
    unitsSold: 180,
    revenue: 5040000,
    trend: "down",
  },
  {
    name: "Solar Submersible Pump 3HP",
    unitsSold: 95,
    revenue: 5225000,
    trend: "up",
  },
];

export const dailyStockStatus = [
  { date: "20 Nov", inStock: 850, lowStock: 95, outOfStock: 15 },
  { date: "21 Nov", inStock: 870, lowStock: 85, outOfStock: 12 },
  { date: "22 Nov", inStock: 880, lowStock: 92, outOfStock: 10 },
  { date: "23 Nov", inStock: 865, lowStock: 88, outOfStock: 14 },
  { date: "24 Nov", inStock: 890, lowStock: 78, outOfStock: 8 },
  { date: "25 Nov", inStock: 905, lowStock: 70, outOfStock: 5 },
];

export const monthlyPerformance: MonthlyPerformance[] = [
  {
    month: "Jun",
    revenue: 2850000,
    cost: 2100000,
    profit: 750000,
    itemsSold: 245,
    ordersCompleted: 42,
  },
  {
    month: "Jul",
    revenue: 3200000,
    cost: 2400000,
    profit: 800000,
    itemsSold: 298,
    ordersCompleted: 48,
  },
  {
    month: "Aug",
    revenue: 2950000,
    cost: 2200000,
    profit: 750000,
    itemsSold: 267,
    ordersCompleted: 45,
  },
  {
    month: "Sep",
    revenue: 3800000,
    cost: 2850000,
    profit: 950000,
    itemsSold: 342,
    ordersCompleted: 58,
  },
  {
    month: "Oct",
    revenue: 3500000,
    cost: 2600000,
    profit: 900000,
    itemsSold: 315,
    ordersCompleted: 52,
  },
  {
    month: "Nov",
    revenue: 4200000,
    cost: 3100000,
    profit: 1100000,
    itemsSold: 378,
    ordersCompleted: 63,
  },
];

export const suppliers: Supplier[] = [
  {
    id: 1,
    name: "SunPower Solutions",
    contact: "Rajesh Kumar",
    email: "sales@sunpowersolutions.com",
    phone: "+91 98765 43210",
    address: "Pune, Maharashtra",
    itemsSupplied: 2,
  },
  {
    id: 2,
    name: "PowerTech Inverters",
    contact: "Priya Sharma",
    email: "info@powertechinverters.com",
    phone: "+91 98765 43211",
    address: "Ahmedabad, Gujarat",
    itemsSupplied: 2,
  },
  {
    id: 3,
    name: "EnergyStore Batteries",
    contact: "Amit Patel",
    email: "orders@energystorebatt.com",
    phone: "+91 98765 43212",
    address: "Bangalore, Karnataka",
    itemsSupplied: 1,
  },
  {
    id: 4,
    name: "AquaSolar Systems",
    contact: "Sneha Singh",
    email: "contact@aquasolarsys.com",
    phone: "+91 98765 43213",
    address: "Jaipur, Rajasthan",
    itemsSupplied: 2,
  },
  {
    id: 5,
    name: "SolarTech Components",
    contact: "Vikram Desai",
    email: "sales@solartechcomp.com",
    phone: "+91 98765 43214",
    address: "Mumbai, Maharashtra",
    itemsSupplied: 2,
  },
  {
    id: 6,
    name: "MetalWorks Structures",
    contact: "Anita Reddy",
    email: "info@metalworksstruct.com",
    phone: "+91 98765 43215",
    address: "Hyderabad, Telangana",
    itemsSupplied: 1,
  },
  {
    id: 7,
    name: "BrightSolar Lights",
    contact: "Karan Mehta",
    email: "orders@brightsolarlight.com",
    phone: "+91 98765 43216",
    address: "Surat, Gujarat",
    itemsSupplied: 1,
  },
  {
    id: 8,
    name: "HomeSolar Solutions",
    contact: "Pooja Verma",
    email: "contact@homesolarsol.com",
    phone: "+91 98765 43217",
    address: "Delhi, NCR",
    itemsSupplied: 1,
  },
];
