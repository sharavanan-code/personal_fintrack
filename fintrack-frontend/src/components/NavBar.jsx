// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, isAuthenticated } from "../services/auth";

export default function NavBar() {
  const nav = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    removeToken();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
          FinTrack
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated() ? (
            <>
             <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">
                Dashboard
              </Link>
           
              <Link to="/income" className="text-gray-600 hover:text-indigo-600 transition">
                Add Income
              </Link>
              <Link to="/expense" className="text-gray-600 hover:text-indigo-600 transition">
                Add Expense
              </Link>
               <Link to="/income-history" className="text-gray-600 hover:text-indigo-600 transition">
                Income History
              </Link>
              <Link to="/expense-history" className="text-gray-600 hover:text-indigo-600 transition">
                Expense History
              </Link>
              <Link
                to="/delete-account"
                className="text-red-500 hover:text-red-700 font-semibold transition"
              >
                Delete Account
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-indigo-600 text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
          {isAuthenticated() ? (
            <>
              <Link to="/income" className="block text-gray-600 hover:text-indigo-600 transition">
                Add Income
              </Link>
              <Link to="/expense" className="block text-gray-600 hover:text-indigo-600 transition">
                Add Expense
              </Link>
              <Link to="/income-history" className="block text-gray-600 hover:text-indigo-600 transition">
                Income History
              </Link>
              <Link to="/expense-history" className="block text-sm text-gray-600 hover:text-indigo-600 transition">
                Expense History
              </Link>
              <Link
                to="/delete-account"
                className="block text-red-500 hover:text-red-700 font-semibold transition"
              >
                Delete Account
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-600 hover:text-indigo-600 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
