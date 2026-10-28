import { api } from "./apiConfig";

// GET /visitor/streak
// -> {
//     currentStreak, longestStreak, postedToday, lastPostedDate,
//     totalDaysPosted, totalMessagesPosted,
//     recentDays: [{ date, posted, messagesPosted }]  // 7 entries, oldest->newest
// }
export const getStreak = async () => {
  const response = await api.get("/visitor/streak");
  return response.data;
};
