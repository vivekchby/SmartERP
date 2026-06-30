import { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/Cards/StatCard";

import MonthlySalesChart from "../../components/Analytics/MonthlySalesChart";
import MonthlyPurchaseChart from "../../components/Analytics/MonthlyPurchaseChart";
import InventoryCard from "../../components/Analytics/InventoryCard";
import LowStockTable from "../../components/Analytics/LowStockTable";
import RecentSalesTable from "../../components/Analytics/RecentSalesTable";
import RecentPurchaseTable from "../../components/Analytics/RecentPurchaseTable";

import { getDashboard } from "../../services/dashboardApi";
import { getDashboardAnalytics } from "../../services/dashboardAnalyticsApi";

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

  const [analytics, setAnalytics] =
    useState({
      monthlySales: [],
      monthlyPurchase: [],
      lowStock: [],
      recentSales: [],
      recentPurchase: [],
      inventory: {
        inventory_value: 0,
      },
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardData =
        await getDashboard();

      const analyticsData =
        await getDashboardAnalytics();

      setDashboard(
        dashboardData.dashboard
      );

      setAnalytics(analyticsData);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <CircularProgress />
      </DashboardLayout>
    );
  }

  const cards = [
    {
      title: "Customers",
      value: dashboard.customers,
      color: "#2563EB",
    },
    {
      title: "Suppliers",
      value: dashboard.suppliers,
      color: "#22C55E",
    },
    {
      title: "Products",
      value: dashboard.products,
      color: "#F59E0B",
    },
    {
      title: "Companies",
      value: dashboard.companies,
      color: "#8B5CF6",
    },
    {
      title: "Sales",
      value: `₹${dashboard.total_sales}`,
      color: "#EF4444",
    },
    {
      title: "Purchase",
      value: `₹${dashboard.total_purchase}`,
      color: "#14B8A6",
    },
    {
      title: "Inventory",
      value: dashboard.current_inventory,
      color: "#EC4899",
    },
  ];

    return (
    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        Dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Quick overview of your business performance and inventory health.
      </Typography>

      {/* KPI Cards */}

      <Grid container spacing={3}>

        {cards.map((card) => (
          <Grid
            key={card.title}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <StatCard
              title={card.title}
              value={card.value}
              color={card.color}
            />
          </Grid>
        ))}

      </Grid>

      {/* Charts */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
      >

        <Grid item xs={12} lg={6}>
          <MonthlySalesChart
            data={analytics.monthlySales}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <MonthlyPurchaseChart
            data={analytics.monthlyPurchase}
          />
        </Grid>

      </Grid>

      {/* Inventory Card */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
      >

        <Grid item xs={12} md={4}>
          <InventoryCard
            value={
              analytics.inventory
                ?.inventory_value || 0
            }
          />
        </Grid>

      </Grid>

      {/* Tables */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
      >
        <Grid item xs={12} md={4}>
          <LowStockTable
            data={analytics.lowStock}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <RecentSalesTable
            data={analytics.recentSales}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <RecentPurchaseTable
            data={analytics.recentPurchase}
          />
        </Grid>
      </Grid>

    </DashboardLayout>
  );
}

export default Dashboard;