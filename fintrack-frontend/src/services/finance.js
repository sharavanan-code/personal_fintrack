import API from "./api";

export const addIncome = async (data) => {
  return API.post("/finance/income", data);
};

export const addExpense = async (data) => {
  return API.post("/finance/expense", data);
};

export const getSummary = async () => {
  return API.get("/finance/summary");
};
