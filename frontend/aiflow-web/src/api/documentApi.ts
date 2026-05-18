import axios from "axios";

export const uploadDocument = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post("http://localhost:8000/api/documents/upload", formData);
};

export const fetchDocuments = () =>
  axios.get<string[]>("http://localhost:8000/api/documents");