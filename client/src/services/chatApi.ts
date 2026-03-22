import axios from "axios";
import type { ChatMessageHistory } from "../types/chat.types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage(
  message: string,
  history: ChatMessageHistory[] = [],
) {
  const response = await axios.post(`${API_BASE_URL}/chat`, {
    message,
    history,
  });

  return response.data;
}
