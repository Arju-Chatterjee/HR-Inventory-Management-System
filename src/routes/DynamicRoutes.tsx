import type { FC } from "react";
import Dashboard from "../pages/protected/Dashboard/Dashboard";
import Inventory from "../pages/protected/Inventory/Inventory";

interface RouteConfig {
    path: string;
    component: FC;
}

export const DynamicRoutes: RouteConfig[] = [
    { path: "/dashboard", component: Dashboard },
    { path: "/inventory", component: Inventory }
]