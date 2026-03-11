import axios from "axios";

const API = "http://localhost:3001/accounts";

export const getAccounts = () => axios.get(API).then(r => r.data);

export const updateAccountStatus = (id, status) =>
  axios.patch(`${API}/${id}`, { status }).then(r => r.data);