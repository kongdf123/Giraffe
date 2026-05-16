import axios from "axios";

const BASE = "http://localhost:8080/api/workflows";

export const getWorkflows = () => axios.get(BASE);

export const submitWorkflow = (id: number) =>
  axios.post(`${BASE}/${id}/submit`);