require("dotenv").config();
const cors = require("cors");
const express = require("express");
const pool = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");

const authRoutes = require("./src/routes/authRoutes");

const companyRoutes = require("./src/routes/companyRoutes");

const customerRoutes =
require("./src/routes/customerRoutes");

const supplierRoutes =
require("./src/routes/supplierRoutes");

const stockRoutes =
require("./src/routes/stockRoutes");

const ledgerRoutes = require("./src/routes/ledgerRoutes");

const purchaseRoutes =
require("./src/routes/purchaseRoutes");

const salesRoutes =
require("./src/routes/salesRoutes");

const invoiceRoutes =
require("./src/routes/invoiceRoutes");

const dashboardRoutes =
require("./src/routes/dashboardRoutes");

const reportRoutes =
require("./src/routes/reportRoutes");

const groupRoutes = require("./src/routes/groupRoutes");

const dashboardAnalyticsRoutes = require("./src/routes/dashboardAnalyticsRoutes");

const profileRoutes =
require("./src/routes/profileRoutes");

const voucherRoutes =
require("./src/routes/voucherRoutes");

const app = express();
app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174",]
,    credentials: true,
  })
);

app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json({ message: "API Working" });
});
app.use("/api/auth", authRoutes);

app.use("/api/company", companyRoutes);
  
app.use("/api/stock", stockRoutes);

app.use(["/api/group", "/api/groups"], groupRoutes);

app.use(
  "/api/voucher",
  voucherRoutes
);

app.use("/api/customer", customerRoutes);

app.use("/api/ledger", ledgerRoutes);

app.use("/api/supplier", supplierRoutes);

app.use("/api/purchase", purchaseRoutes);

app.use("/api/sale", salesRoutes);

app.use("/api/invoice", invoiceRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use(["/api/group", "/api/groups"], groupRoutes);

app.use(["/api/report", "/api/reports"], reportRoutes);

app.use(
  "/api/dashboard-analytics",
  dashboardAnalyticsRoutes
);

app.use("/api/users", userRoutes);

app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("SmartERP Backend Running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});