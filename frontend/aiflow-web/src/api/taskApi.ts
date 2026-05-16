import axios from "axios";

const BASE = "http://localhost:8080/api/tasks";

export const getPendingTasks = () => axios.get(`${BASE}/pending`);
export const approveTask = (id: number) => axios.post(`${BASE}/${id}/approve`,{actionBy: "manager",comment: "approved"});
export const rejectTask = (id: number) => axios.post(`${BASE}/${id}/reject`,{actionBy: "manager",comment: "rejected"});
