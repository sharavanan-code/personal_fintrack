// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function parseStringSummary(text) {
  // handle backend that returns "Income: X, Expense: Y, Balance: Z"
  const nums = { totalIncome:0, totalExpense:0, balance:0 };
  const m1 = text.match(/Income: *([\d.]+)/i);
  const m2 = text.match(/Expense: *([\d.]+)/i);
  const m3 = text.match(/Balance: *([\d.]+)/i);
  if (m1) nums.totalIncome = Number(m1[1]);
  if (m2) nums.totalExpense = Number(m2[1]);
  if (m3) nums.balance = Number(m3[1]);
  return nums;
}

export default function Dashboard(){
  const [summary, setSummary] = useState({ totalIncome:0, totalExpense:0, balance:0 });

  useEffect(() => {
    api.get("/finance/summary")
      .then(res => {
        const data = res.data;
        if (typeof data === "string") {
          setSummary(parseStringSummary(data));
        } else {
          // support multiple keys
          setSummary({
            totalIncome: data.totalIncome ?? data.total_income ?? data.income ?? 0,
            totalExpense: data.totalExpense ?? data.total_expense ?? data.expense ?? 0,
            balance: data.balance ?? data.remaining ?? 0
          });
        }
      })
      .catch(err => {
        console.error(err);
        alert(err?.response?.data || "Failed to load summary");
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded">Income: {summary.totalIncome}</div>
        <div className="p-4 bg-red-100 rounded">Expense: {summary.totalExpense}</div>
        <div className="p-4 bg-blue-100 rounded">Balance: {summary.balance}</div>
      </div>

      <div className="flex gap-3">
        <Link to="/income" className="px-4 py-2 bg-green-600 text-white rounded">Add Income</Link>
        <Link to="/expense" className="px-4 py-2 bg-red-600 text-white rounded">Add Expense</Link>
      </div>
    </div>
  );
}
