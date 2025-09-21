// src/pages/Register.jsx
import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registered — please login");
      nav("/login");
    } catch (err) {
      alert(err?.response?.data || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-2 border"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full p-2 border"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password with eye toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {/* <span
            className="absolute right-2 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span> */}

          <span
  className="absolute right-2 top-2 cursor-pointer text-gray-600"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword 
    ? <AiFillEyeInvisible /> // Password is visible → show closed eye to indicate clicking will hide it
    : <AiFillEye />          // Password is hidden → show open eye to indicate clicking will show it
  }
</span>

        </div>

        <button className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
