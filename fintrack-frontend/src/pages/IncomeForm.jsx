// src/pages/IncomeForm.jsx
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function IncomeForm(){
  const [form, setForm] = useState({ amount: "", description: "", date: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/finance/income", {
        amount: Number(form.amount),
        description: form.description,
        date: form.date || undefined
      });
      alert("Income saved");
      nav("/dashboard");
    } catch (err) {
      alert(err?.response?.data || "Save failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded mt-6">
      <h2 className="mb-4">Add Income</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})}/>
        <input className="w-full p-2 border" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <input type="date" className="w-full p-2 border" value={form.date} onChange={e=>setForm({...form, date:e.target.value})}/>
        <button className="w-full p-2 bg-blue-600 text-white rounded">Save</button>
      </form>
    </div>
  );
}
