// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import IncomeForm from "./pages/IncomeForm";
import ExpenseForm from "./pages/ExpenseForm";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/income" element={<ProtectedRoute><IncomeForm/></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><ExpenseForm/></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}
