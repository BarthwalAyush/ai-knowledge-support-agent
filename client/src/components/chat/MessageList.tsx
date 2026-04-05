import type { ChatMessage } from "../../types/chat.types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages?: ChatMessage[];
}

function MessageList({ messages = [] }: MessageListProps) {
  if (!messages.length) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.iconWrapper}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2 style={styles.emptyTitle}>How can I help you today?</h2>
        <p style={styles.emptySubtitle}>Ask me anything to get started.</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {messages.map((item, index) => (
        <MessageItem key={index} role={item.role} text={item.text} />
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  list: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#6B7280",
    textAlign: "center",
    padding: "40px 20px",
  },
  iconWrapper: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    backgroundColor: "#F3F4F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    color: "#9CA3AF",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "8px",
    marginTop: 0,
  },
  emptySubtitle: {
    fontSize: "15px",
    margin: 0,
  },
};

export default MessageList;
