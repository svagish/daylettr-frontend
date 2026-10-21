import { api } from "./apiConfig";

export const getCollection = async () => {
  const response = await api.get("/collection");
  return response.data;
};

export const collectNote = async (messageId) => {
  const response = await api.post(`/collection/${messageId}`);
  return response.data;
};

export const removeFromCollection = async (messageId) => {
  await api.delete(`/collection/${messageId}`);
};

export const isCollected = async (messageId) => {
  const response = await api.get(`/collection/has/${messageId}`);
  return response.data.collected;
};
