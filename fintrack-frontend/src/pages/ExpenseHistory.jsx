import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../services/auth";

export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/expense/history", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expense history", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Expense History</h2>
      <ul className="space-y-2">
        {expenses.map((item) => (
          <li key={item.id} className="border p-3 rounded">
            <p><b>Amount:</b> {item.amount}</p>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Date:</b> {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
