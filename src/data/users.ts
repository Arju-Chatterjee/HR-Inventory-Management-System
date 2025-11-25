export interface User {
  id: number;
  username: string;
  password: string;
  role: "Super Admin" | "Manager" | "Employee";
  fullName: string;
  email: string;
  department: string;
  phone: string;
}

export const DUMMY_USERS: User[] = [
  {
    id: 1,
    username: "Admin",
    password: "12345",
    role: "Super Admin",
    fullName: "John Anderson",
    email: "john.anderson@dummyhr.com",
    department: "Administration",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    username: "manager_sarah",
    password: "sarah@2025",
    role: "Manager",
    fullName: "Sarah Williams",
    email: "sarah.williams@dummyhr.com",
    department: "Warehouse Management",
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    username: "emp_rajesh",
    password: "rajesh123",
    role: "Employee",
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@dummyhr.com",
    department: "Inventory Operations",
    phone: "+91 98765 43212",
  },
];

export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  const user = DUMMY_USERS.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};
