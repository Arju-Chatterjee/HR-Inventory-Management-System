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
    sku: "ELEC-001",
    name: "Laptop Dell XPS 15",
    category: "Electronics",
    quantity: 45,
    minStock: 10,
    price: 85000,
    cost: 70000,
    supplier: "Tech Suppliers Ltd",
    location: "Warehouse A - A1",
    status: "In Stock",
    lastUpdated: "2025-11-20",
  },
  {
    id: 2,
    sku: "ELEC-002",
    name: "Wireless Mouse Logitech",
    category: "Electronics",
    quantity: 8,
    minStock: 15,
    price: 1200,
    cost: 800,
    supplier: "Tech Suppliers Ltd",
    location: "Warehouse A - A2",
    status: "Low Stock",
    lastUpdated: "2025-11-22",
  },
  {
    id: 3,
    sku: "FURN-001",
    name: "Office Chair Ergonomic",
    category: "Furniture",
    quantity: 0,
    minStock: 5,
    price: 12000,
    cost: 9000,
    supplier: "Furniture Pro",
    location: "Warehouse B - B1",
    status: "Out of Stock",
    lastUpdated: "2025-11-18",
  },
  {
    id: 4,
    sku: "ELEC-003",
    name: "LED Monitor 27 inch",
    category: "Electronics",
    quantity: 32,
    minStock: 8,
    price: 18000,
    cost: 14000,
    supplier: "Tech Suppliers Ltd",
    location: "Warehouse A - A3",
    status: "In Stock",
    lastUpdated: "2025-11-21",
  },
  {
    id: 5,
    sku: "CLOT-001",
    name: "Corporate T-Shirt",
    category: "Clothing",
    quantity: 120,
    minStock: 50,
    price: 500,
    cost: 300,
    supplier: "Textile Hub",
    location: "Warehouse C - C1",
    status: "In Stock",
    lastUpdated: "2025-11-19",
  },
  {
    id: 6,
    sku: "FOOD-001",
    name: "Coffee Beans Premium",
    category: "Food Items",
    quantity: 12,
    minStock: 20,
    price: 800,
    cost: 500,
    supplier: "Food Distributors",
    location: "Warehouse D - D1",
    status: "Low Stock",
    lastUpdated: "2025-11-23",
  },
  {
    id: 7,
    sku: "FURN-002",
    name: "Standing Desk",
    category: "Furniture",
    quantity: 25,
    minStock: 5,
    price: 25000,
    cost: 18000,
    supplier: "Furniture Pro",
    location: "Warehouse B - B2",
    status: "In Stock",
    lastUpdated: "2025-11-20",
  },
  {
    id: 8,
    sku: "ELEC-004",
    name: "Keyboard Mechanical RGB",
    category: "Electronics",
    quantity: 6,
    minStock: 10,
    price: 5500,
    cost: 4000,
    supplier: "Tech Suppliers Ltd",
    location: "Warehouse A - A4",
    status: "Low Stock",
    lastUpdated: "2025-11-24",
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
    itemCount: 4,
  },
  {
    id: 2,
    name: "Furniture",
    description: "Office and home furniture",
    itemCount: 2,
  },
  {
    id: 3,
    name: "Clothing",
    description: "Apparel and accessories",
    itemCount: 1,
  },
  {
    id: 4,
    name: "Food Items",
    description: "Food and beverages",
    itemCount: 1,
  },
];

export const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Tech Suppliers Ltd",
    contact: "Rajesh Kumar",
    email: "contact@techsuppliers.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",
    itemsSupplied: 4,
  },
  {
    id: 2,
    name: "Furniture Pro",
    contact: "Priya Sharma",
    email: "info@furniturepro.com",
    phone: "+91 98765 43211",
    address: "Delhi, NCR",
    itemsSupplied: 2,
  },
  {
    id: 3,
    name: "Textile Hub",
    contact: "Amit Patel",
    email: "sales@textilehub.com",
    phone: "+91 98765 43212",
    address: "Ahmedabad, Gujarat",
    itemsSupplied: 1,
  },
  {
    id: 4,
    name: "Food Distributors",
    contact: "Sneha Singh",
    email: "orders@fooddist.com",
    phone: "+91 98765 43213",
    address: "Bangalore, Karnataka",
    itemsSupplied: 1,
  },
];
