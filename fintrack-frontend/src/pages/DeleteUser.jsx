// src/pages/DeleteUser.jsx
import React, { useState } from "react";
import { deleteUser, removeToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function DeleteUser() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const nav = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUser();
      removeToken();
      setSuccess("Your account has been deleted.");
      setError("");
      setTimeout(() => nav("/register"), 1500); // redirect after delete
    } catch (err) {
      setError(err.response?.data || "Failed to delete account");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold text-red-600 mb-4">Delete Account</h2>
      <p className="text-gray-700 mb-4">
        This action cannot be undone. Are you sure you want to permanently delete your account?
      </p>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete My Account
      </button>
    </div>
  );
}
