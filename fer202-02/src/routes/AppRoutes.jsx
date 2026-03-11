import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import AccountListPage from "../pages/AccountListPage";
import AccountDetailPage from "../pages/AccountDetailPage";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/accounts"
        element={<PrivateRoute><AccountListPage /></PrivateRoute>}
      />
      <Route
        path="/accounts/:id"
        element={<PrivateRoute><AccountDetailPage /></PrivateRoute>}
      />
    </Routes>
  );
}