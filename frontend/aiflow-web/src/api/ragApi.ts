import axios from "axios";

export const sendRagMessage = (message: string) =>
  axios.post("http://localhost:8000/api/agent/rag-chat", {
    message
  });