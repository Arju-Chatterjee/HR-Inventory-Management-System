export interface CustomerOrder {
  orderId: number;
  orderNumber: string;
  orderDate: string;
  orderStatus:
    | "Order Placed"
    | "Processing"
    | "Dispatched"
    | "Delivered"
    | "Cancelled";

  customer: {
    name: string;
    phone: string;
    email: string;
    deliveryAddress: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
  };

  products: Array<{
    itemSku: string;
    itemName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
    warehouse: string;
  }>;

  delivery: {
    deliveryPersonName: string;
    deliveryPersonPhone: string;
    expectedDate: string;
    actualDate?: string;
  };

  payment: {
    paymentMethod:
      | "Cash on Delivery"
      | "Online Payment"
      | "Bank Transfer"
      | "UPI";
    paymentStatus: "Pending" | "Paid" | "Partial";
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    transactionId?: string;
    paymentDate?: string;
  };

  subtotal: number;
  tax: number;
  deliveryCharges: number;
  discount: number;
  grandTotal: number;
  notes?: string;
  invoiceNumber: string;
}

export const customerOrders: CustomerOrder[] = [
  {
    orderId: 1,
    orderNumber: "ORD-2025-1001",
    orderDate: "2025-11-20",
    orderStatus: "Delivered",
    customer: {
      name: "Rajesh Sharma",
      phone: "+91 98765 12345",
      email: "rajesh.sharma@email.com",
      deliveryAddress: {
        street: "123, Green Valley Apartments, MG Road",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
      },
    },
    products: [
      {
        itemSku: "SOL-PNL-001",
        itemName: "Monocrystalline Solar Panel 540W",
        quantity: 10,
        pricePerUnit: 18500,
        totalPrice: 185000,
        warehouse: "Warehouse A",
      },
      {
        itemSku: "SOL-INV-002",
        itemName: "Hybrid Solar Inverter 10KW",
        quantity: 1,
        pricePerUnit: 85000,
        totalPrice: 85000,
        warehouse: "Warehouse B",
      },
    ],
    delivery: {
      deliveryPersonName: "Amit Kumar",
      deliveryPersonPhone: "+91 87654 32109",
      expectedDate: "2025-11-23",
      actualDate: "2025-11-23",
    },
    payment: {
      paymentMethod: "Online Payment",
      paymentStatus: "Paid",
      totalAmount: 285840,
      paidAmount: 285840,
      dueAmount: 0,
      transactionId: "TXN20251120001",
      paymentDate: "2025-11-20",
    },
    subtotal: 270000,
    tax: 13500,
    deliveryCharges: 2340,
    discount: 0,
    grandTotal: 285840,
    invoiceNumber: "INV-2025-1001",
    notes: "Residential installation - Koregaon Park area",
  },
  {
    orderId: 2,
    orderNumber: "ORD-2025-1002",
    orderDate: "2025-11-21",
    orderStatus: "Dispatched",
    customer: {
      name: "Priya Desai",
      phone: "+91 98765 23456",
      email: "priya.desai@email.com",
      deliveryAddress: {
        street: "45, Sunrise Villa, SG Highway",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380015",
      },
    },
    products: [
      {
        itemSku: "SOL-PUMP-002",
        itemName: "Solar Submersible Pump 3HP",
        quantity: 2,
        pricePerUnit: 55000,
        totalPrice: 110000,
        warehouse: "Warehouse D",
      },
      {
        itemSku: "SOL-ACC-001",
        itemName: "Solar Charge Controller 40A",
        quantity: 2,
        pricePerUnit: 8500,
        totalPrice: 17000,
        warehouse: "Warehouse E",
      },
    ],
    delivery: {
      deliveryPersonName: "Vikram Patel",
      deliveryPersonPhone: "+91 87654 43210",
      expectedDate: "2025-11-26",
    },
    payment: {
      paymentMethod: "Bank Transfer",
      paymentStatus: "Partial",
      totalAmount: 135540,
      paidAmount: 68000,
      dueAmount: 67540,
      transactionId: "TXN20251121001",
      paymentDate: "2025-11-21",
    },
    subtotal: 127000,
    tax: 6350,
    deliveryCharges: 2190,
    discount: 0,
    grandTotal: 135540,
    invoiceNumber: "INV-2025-1002",
    notes: "Agricultural use - Farm irrigation system",
  },
  {
    orderId: 3,
    orderNumber: "ORD-2025-1003",
    orderDate: "2025-11-22",
    orderStatus: "Processing",
    customer: {
      name: "Suresh Reddy",
      phone: "+91 98765 34567",
      email: "suresh.reddy@email.com",
      deliveryAddress: {
        street: "789, Tech Park Plaza, HITEC City",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500081",
      },
    },
    products: [
      {
        itemSku: "SOL-HOME-001",
        itemName: "Complete Solar Home System 3KW",
        quantity: 1,
        pricePerUnit: 180000,
        totalPrice: 180000,
        warehouse: "Warehouse H",
      },
    ],
    delivery: {
      deliveryPersonName: "Kiran Singh",
      deliveryPersonPhone: "+91 87654 54321",
      expectedDate: "2025-11-28",
    },
    payment: {
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      totalAmount: 191700,
      paidAmount: 191700,
      dueAmount: 0,
      transactionId: "UPI20251122001",
      paymentDate: "2025-11-22",
    },
    subtotal: 180000,
    tax: 9000,
    deliveryCharges: 2700,
    discount: 0,
    grandTotal: 191700,
    invoiceNumber: "INV-2025-1003",
    notes: "Complete home backup solution",
  },
  {
    orderId: 4,
    orderNumber: "ORD-2025-1004",
    orderDate: "2025-11-23",
    orderStatus: "Order Placed",
    customer: {
      name: "Anita Mehta",
      phone: "+91 98765 45678",
      email: "anita.mehta@email.com",
      deliveryAddress: {
        street: "56, Palm Heights, Linking Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400050",
      },
    },
    products: [
      {
        itemSku: "SOL-PNL-002",
        itemName: "Polycrystalline Solar Panel 330W",
        quantity: 15,
        pricePerUnit: 12000,
        totalPrice: 180000,
        warehouse: "Warehouse A",
      },
      {
        itemSku: "SOL-BAT-001",
        itemName: "Lithium Battery 150Ah 12V",
        quantity: 4,
        pricePerUnit: 28000,
        totalPrice: 112000,
        warehouse: "Warehouse C",
      },
    ],
    delivery: {
      deliveryPersonName: "Ramesh Yadav",
      deliveryPersonPhone: "+91 87654 65432",
      expectedDate: "2025-11-30",
    },
    payment: {
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      totalAmount: 311400,
      paidAmount: 0,
      dueAmount: 311400,
    },
    subtotal: 292000,
    tax: 14600,
    deliveryCharges: 4800,
    discount: 0,
    grandTotal: 311400,
    invoiceNumber: "INV-2025-1004",
    notes: "Rooftop installation with battery backup",
  },
  {
    orderId: 5,
    orderNumber: "ORD-2025-1005",
    orderDate: "2025-11-24",
    orderStatus: "Delivered",
    customer: {
      name: "Deepak Verma",
      phone: "+91 98765 56789",
      email: "deepak.verma@email.com",
      deliveryAddress: {
        street: "321, Silicon City, Electronics City",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560100",
      },
    },
    products: [
      {
        itemSku: "SOL-LIGHT-001",
        itemName: "Solar Street Light 60W",
        quantity: 10,
        pricePerUnit: 15000,
        totalPrice: 150000,
        warehouse: "Warehouse G",
      },
    ],
    delivery: {
      deliveryPersonName: "Sunil Kumar",
      deliveryPersonPhone: "+91 87654 76543",
      expectedDate: "2025-11-25",
      actualDate: "2025-11-25",
    },
    payment: {
      paymentMethod: "Online Payment",
      paymentStatus: "Paid",
      totalAmount: 159750,
      paidAmount: 159750,
      dueAmount: 0,
      transactionId: "TXN20251124001",
      paymentDate: "2025-11-24",
    },
    subtotal: 150000,
    tax: 7500,
    deliveryCharges: 2250,
    discount: 0,
    grandTotal: 159750,
    invoiceNumber: "INV-2025-1005",
    notes: "Township street lighting project",
  },
  {
    orderId: 6,
    orderNumber: "ORD-2025-1006",
    orderDate: "2025-11-24",
    orderStatus: "Processing",
    customer: {
      name: "Kavita Singh",
      phone: "+91 98765 67890",
      email: "kavita.singh@email.com",
      deliveryAddress: {
        street: "88, Royal Gardens, Civil Lines",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302006",
      },
    },
    products: [
      {
        itemSku: "SOL-INV-002",
        itemName: "Hybrid Solar Inverter 10KW",
        quantity: 2,
        pricePerUnit: 85000,
        totalPrice: 170000,
        warehouse: "Warehouse B",
      },
      {
        itemSku: "SOL-STR-001",
        itemName: "Solar Panel Mounting Structure",
        quantity: 5,
        pricePerUnit: 12000,
        totalPrice: 60000,
        warehouse: "Warehouse F",
      },
    ],
    delivery: {
      deliveryPersonName: "Manoj Sharma",
      deliveryPersonPhone: "+91 87654 87654",
      expectedDate: "2025-11-29",
    },
    payment: {
      paymentMethod: "Bank Transfer",
      paymentStatus: "Paid",
      totalAmount: 245250,
      paidAmount: 245250,
      dueAmount: 0,
      transactionId: "TXN20251124002",
      paymentDate: "2025-11-24",
    },
    subtotal: 230000,
    tax: 11500,
    deliveryCharges: 3750,
    discount: 0,
    grandTotal: 245250,
    invoiceNumber: "INV-2025-1006",
    notes: "Commercial building installation",
  },
  {
    orderId: 7,
    orderNumber: "ORD-2025-1007",
    orderDate: "2025-11-25",
    orderStatus: "Dispatched",
    customer: {
      name: "Nikhil Kapoor",
      phone: "+91 98765 78901",
      email: "nikhil.kapoor@email.com",
      deliveryAddress: {
        street: "12, Green Avenue, Sector 18",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201301",
      },
    },
    products: [
      {
        itemSku: "SOL-PNL-001",
        itemName: "Monocrystalline Solar Panel 540W",
        quantity: 8,
        pricePerUnit: 18500,
        totalPrice: 148000,
        warehouse: "Warehouse A",
      },
      {
        itemSku: "SOL-ACC-002",
        itemName: "MC4 Connector Set (100 pairs)",
        quantity: 2,
        pricePerUnit: 3500,
        totalPrice: 7000,
        warehouse: "Warehouse E",
      },
    ],
    delivery: {
      deliveryPersonName: "Arun Verma",
      deliveryPersonPhone: "+91 87654 98765",
      expectedDate: "2025-11-27",
    },
    payment: {
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      totalAmount: 165075,
      paidAmount: 165075,
      dueAmount: 0,
      transactionId: "UPI20251125001",
      paymentDate: "2025-11-25",
    },
    subtotal: 155000,
    tax: 7750,
    deliveryCharges: 2325,
    discount: 0,
    grandTotal: 165075,
    invoiceNumber: "INV-2025-1007",
    notes: "Residential rooftop setup",
  },
  {
    orderId: 8,
    orderNumber: "ORD-2025-1008",
    orderDate: "2025-11-25",
    orderStatus: "Order Placed",
    customer: {
      name: "Sneha Joshi",
      phone: "+91 98765 89012",
      email: "sneha.joshi@email.com",
      deliveryAddress: {
        street: "99, Pearl Residency, Anna Nagar",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600040",
      },
    },
    products: [
      {
        itemSku: "SOL-PUMP-001",
        itemName: "Solar Water Pump 1HP",
        quantity: 3,
        pricePerUnit: 32000,
        totalPrice: 96000,
        warehouse: "Warehouse D",
      },
    ],
    delivery: {
      deliveryPersonName: "Raja Murugan",
      deliveryPersonPhone: "+91 87654 09876",
      expectedDate: "2025-12-01",
    },
    payment: {
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      totalAmount: 102240,
      paidAmount: 0,
      dueAmount: 102240,
    },
    subtotal: 96000,
    tax: 4800,
    deliveryCharges: 1440,
    discount: 0,
    grandTotal: 102240,
    invoiceNumber: "INV-2025-1008",
    notes: "Farm water supply system",
  },
  {
    orderId: 9,
    orderNumber: "ORD-2025-1009",
    orderDate: "2025-11-26",
    orderStatus: "Processing",
    customer: {
      name: "Rakesh Agarwal",
      phone: "+91 98765 90123",
      email: "rakesh.agarwal@email.com",
      deliveryAddress: {
        street: "67, Business Park, Vastrapur",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380015",
      },
    },
    products: [
      {
        itemSku: "SOL-HOME-001",
        itemName: "Complete Solar Home System 3KW",
        quantity: 3,
        pricePerUnit: 180000,
        totalPrice: 540000,
        warehouse: "Warehouse H",
      },
    ],
    delivery: {
      deliveryPersonName: "Prakash Patel",
      deliveryPersonPhone: "+91 87654 10987",
      expectedDate: "2025-12-03",
    },
    payment: {
      paymentMethod: "Bank Transfer",
      paymentStatus: "Partial",
      totalAmount: 575100,
      paidAmount: 300000,
      dueAmount: 275100,
      transactionId: "TXN20251126001",
      paymentDate: "2025-11-26",
    },
    subtotal: 540000,
    tax: 27000,
    deliveryCharges: 8100,
    discount: 0,
    grandTotal: 575100,
    invoiceNumber: "INV-2025-1009",
    notes: "Office building power backup - 3 units",
  },
  {
    orderId: 10,
    orderNumber: "ORD-2025-1010",
    orderDate: "2025-11-26",
    orderStatus: "Cancelled",
    customer: {
      name: "Pooja Nair",
      phone: "+91 98765 01234",
      email: "pooja.nair@email.com",
      deliveryAddress: {
        street: "23, Lake View Apartments, MG Road",
        city: "Kochi",
        state: "Kerala",
        pincode: "682016",
      },
    },
    products: [
      {
        itemSku: "SOL-PNL-002",
        itemName: "Polycrystalline Solar Panel 330W",
        quantity: 6,
        pricePerUnit: 12000,
        totalPrice: 72000,
        warehouse: "Warehouse A",
      },
    ],
    delivery: {
      deliveryPersonName: "Not Assigned",
      deliveryPersonPhone: "N/A",
      expectedDate: "2025-11-30",
    },
    payment: {
      paymentMethod: "Online Payment",
      paymentStatus: "Pending",
      totalAmount: 76680,
      paidAmount: 0,
      dueAmount: 0,
    },
    subtotal: 72000,
    tax: 3600,
    deliveryCharges: 1080,
    discount: 0,
    grandTotal: 76680,
    invoiceNumber: "INV-2025-1010",
    notes: "Order cancelled by customer - Budget constraints",
  },
];
