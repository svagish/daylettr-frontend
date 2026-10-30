import { api } from "./apiConfig";

export const getTodaysNote = async () => {
  const response = await api.get("/message");
  return response.data;
};

export const getYesterdayNotes = async () => {
  const response = await api.get("/message/yesterday");
  return response.data;
};

export const postNote = async (content, previousNoteId, rating) => {
  const payload = {
    content: content,
    previousNoteId: previousNoteId,
    rating: rating,
  };
  const response = await api.post("/message", payload);
  return response.data;
};

export const cooldownStatus = async () => {
  const response = await api.get("/visitor/status");
  return response.data;
};

export const getWordsToday = async () => {
  const response = await api.get("/message/words-today");
  return response.data;
};
