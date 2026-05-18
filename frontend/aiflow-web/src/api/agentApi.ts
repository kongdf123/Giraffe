import axios from "axios";

export const sendAgentMessage = (message: string) =>
  axios.post("http://localhost:8000/api/agent/chat", { message });

export const sendActionMessage = (message: string) =>
  axios.post("http://localhost:8000/api/agent/action", {
    message
  });