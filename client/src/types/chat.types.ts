export type ChatRole = "user" | "bot";

export type loading = true | false;

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface ChatApiResponse {
  reply: string;
  source?: string;
}

export interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  onReset: () => void;
  loading: loading;
}

export interface ChatMessageHistory {
  role: "user" | "model";
  parts: { text: string }[];
}
