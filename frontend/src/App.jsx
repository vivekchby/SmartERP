import { Routes, Route, Navigate } from "react-router-dom";
import Vouchers from "./pages/Vouchers/Vouchers";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import Company from "./pages/Company/Company";
import Customer from "./pages/Customer/Customer";
import Supplier from "./pages/Supplier/Supplier";
import Stock from "./pages/Stock/Stock";
import Purchase from "./pages/Purchase/Purchase";
import Sales from "./pages/Sales/Sales";
import Reports from "./pages/Reports/Reports";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Groups from "./pages/Groups/Groups";
import TrialBalance from "./pages/Reports/TrialBalance";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>

      {/* Login */}

      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/groups"
  element={
    <ProtectedRoute>
      <Groups />
    </ProtectedRoute>
  }
/>

      {/* Company */}

      <Route
        path="/company"
        element={
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        }
      />

      <Route
  path="/vouchers"
  element={
    <ProtectedRoute>
      <Vouchers />
    </ProtectedRoute>
  }
/>

<Route
path="/trial-balance"
element={
<ProtectedRoute>
<TrialBalance/>
</ProtectedRoute>
}
/>

      {/* Customer */}

      <Route
        path="/customer"
        element={
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        }
      />

      {/* Supplier */}

      <Route
        path="/supplier"
        element={
          <ProtectedRoute>
            <Supplier />
          </ProtectedRoute>
        }
      />

      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      <Route
  path="/register"
  element={<Register />}
/>

      {/* Stock */}

      <Route
        path="/stock"
        element={
          <ProtectedRoute>
            <Stock />
          </ProtectedRoute>
        }
      />

      {/* Purchase */}

      <Route
        path="/purchase"
        element={
          <ProtectedRoute>
            <Purchase />
          </ProtectedRoute>
        }
      />

      {/* Sales */}

      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        }
      />

      {/* Reports */}

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
  path="/users"
  element={
    <ProtectedRoute
      allowedRoles={["Admin"]}
    >
      <Users />
    </ProtectedRoute>
  }
/>
<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;