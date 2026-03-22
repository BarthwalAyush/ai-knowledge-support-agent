import type { ChatMessage } from "../../types/chat.types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages?: ChatMessage[];
}

function MessageList({ messages = [] }: MessageListProps) {
  if (!messages.length) {
    return (
      <div style={styles.empty}>No messages yet. Start the conversation.</div>
    );
  }

  return (
    <>
      {messages.map((item, index) => (
        <MessageItem key={index} role={item.role} text={item.text} />
      ))}
    </>
  );
}

const styles = {
  empty: {
    color: "#6b7280",
  },
};

export default MessageList;
