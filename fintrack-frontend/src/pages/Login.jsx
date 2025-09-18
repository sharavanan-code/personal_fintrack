// src/pages/Login.jsx
import React, { useState } from "react";
import { login, saveToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const token = res.data?.token ?? res.data; // handle either shape
      saveToken(token);
      nav("/dashboard");
    } catch (err) {
      alert(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input type="password" className="w-full p-2 border" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="w-full p-2 bg-green-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
