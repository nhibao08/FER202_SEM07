import axios from "axios";

const BASE_URL = "http://localhost:3001";

export async function getUsers() {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
}

export async function getExpenses() {
  const res = await axios.get(`${BASE_URL}/expenses`);
  return res.data;
}

export async function addExpenseApi(expense) {
  const res = await axios.post(`${BASE_URL}/expenses`, expense);
  return res.data;
}

export async function updateExpenseApi(id, expense) {
  const res = await axios.put(`${BASE_URL}/expenses/${id}`, expense);
  return res.data;
}

export async function deleteExpenseApi(id) {
  await axios.delete(`${BASE_URL}/expenses/${id}`);
  return id;
}