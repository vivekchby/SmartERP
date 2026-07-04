import { useEffect, useState } from "react";
import StatCard from "../../components/Dashboard/StatCard";
import QuickActions from "../../components/Dashboard/QuickActions";
import {
Users,
Truck,
Boxes,
Building2,
Receipt,
ShoppingCart,
Package,
Wallet,
} from "lucide-react";
import {
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import TopProducts from "../../components/Dashboard/TopProducts";
import DashboardLayout from "../../layouts/DashboardLayout";

import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import MonthlySalesChart from "../../components/Dashboard/MonthlySalesChart";
import MonthlyPurchaseChart from "../../components/Dashboard/MonthlyPurchaseChart";
import RecentSales from "../../components/Dashboard/RecentSales";
import LowStock from "../../components/Dashboard/LowStock";


import { getDashboard } from "../../services/dashboardApi";

const initialDashboard = {
  customers: 0,
  suppliers: 0,
  products: 0,
  companies: 0,
  total_purchase: 0,
  total_sales: 0,
  current_inventory: 0,
};

function Dashboard() {
  const [dashboard, setDashboard] =
    useState(initialDashboard);

    const [analytics, setAnalytics] = useState({
  monthlySales: [],
  monthlyPurchase: [],
  recentSales: [],
  lowStock: [],
  topProducts: [],
});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    setLoading(true);

    const response = await getDashboard();

    setDashboard(response.dashboard);

    setAnalytics({
  monthlySales: response.monthlySales,
  monthlyPurchase: response.monthlyPurchase,
  recentSales: response.recentSales,
  lowStock: response.lowStock,
  topProducts: response.topProducts,
});

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

  if (loading) {
  return (
    <DashboardLayout>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "80vh",
        }}
      >
        <CircularProgress
          size={60}
        />
      </Grid>

    </DashboardLayout>
  );
}

  

    return (
    
  <DashboardLayout>

    <DashboardHeader />

    {/* KPI Cards */}
    <Grid container spacing={3}>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Customers"
          value={dashboard.customers}
          subtitle="Active"
          icon={<Users size={28} />}
          color="#2563EB"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Suppliers"
          value={dashboard.suppliers}
          subtitle="Registered"
          icon={<Truck size={28} />}
          color="#16A34A"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Products"
          value={dashboard.products}
          subtitle="Inventory"
          icon={<Boxes size={28} />}
          color="#F59E0B"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Companies"
          value={dashboard.companies}
          subtitle="Business"
          icon={<Building2 size={28} />}
          color="#7C3AED"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Sales"
          value={`₹ ${Number(dashboard.total_sales).toLocaleString()}`}
          subtitle="Overall"
          icon={<Receipt size={28} />}
          color="#DC2626"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Purchase"
          value={`₹ ${Number(dashboard.total_purchase).toLocaleString()}`}
          subtitle="Overall"
          icon={<ShoppingCart size={28} />}
          color="#14B8A6"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Inventory"
          value={dashboard.current_inventory}
          subtitle="Items"
          icon={<Package size={28} />}
          color="#EC4899"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Inventory Value"
          value={`₹ ${Number(dashboard.inventoryValue).toLocaleString()}`}
          subtitle="Current Value"
          icon={<Wallet size={28} />}
          color="#2563EB"
        />
      </Grid>

    </Grid>

    {/* Charts */}

    <Grid container spacing={3} sx={{ mt: 1 }}>

      <Grid item xs={12} lg={8}>
        <MonthlySalesChart
          data={analytics.monthlySales}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <MonthlyPurchaseChart
          data={analytics.monthlyPurchase}
        />
      </Grid>

    </Grid>

    {/* Tables */}

    <Grid container spacing={3} sx={{ mt: 1 }}>

      <Grid item xs={12} lg={7}>
        <RecentSales
          sales={analytics.recentSales}
        />
      </Grid>

      <Grid item xs={12} lg={5}>
        <LowStock
          items={analytics.lowStock}
        />
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>

  <Grid item xs={12} md={6}>
    <TopProducts
      products={analytics.topProducts}
    />
  </Grid>

  <Grid item xs={12} md={6}>
    <QuickActions />
  </Grid>

</Grid>

    </Grid>

  </DashboardLayout>
);
    
  
}

export default Dashboard;