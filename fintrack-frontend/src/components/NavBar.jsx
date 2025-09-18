// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, isAuthenticated } from "../services/auth";

export default function NavBar() {
  const nav = useNavigate();
  const logout = () => { removeToken(); nav("/login"); };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-bold text-lg">FinTrack</Link>
        {isAuthenticated() && (
          <>
            <Link to="/income" className="text-sm">Add Income</Link>
            <Link to="/expense" className="text-sm">Add Expense</Link>
          </>
        )}
      </div>

      <div>
        {!isAuthenticated() ? (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-600">Logout</button>
        )}
      </div>
    </nav>
  );
}
