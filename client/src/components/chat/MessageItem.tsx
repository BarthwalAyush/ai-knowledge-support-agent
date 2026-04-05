import type { ChatRole } from "../../types/chat.types";
import ReactMarkdown from "react-markdown";

interface MessageItemProps {
  role: ChatRole;
  text: string;
}

function MessageItem({ role, text }: MessageItemProps) {
  const isUser = role === "user";

  return (
    <div
      style={{
        ...styles.wrapper,
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      {!isUser && (
        <div style={styles.avatarAgent}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v2h2a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2v-2a2 2 0 0 1 2-2h2V9H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4z"></path>
          </svg>
        </div>
      )}

      <div
        style={{
          ...styles.bubble,
          backgroundColor: isUser ? "#111827" : "#F3F4F6",
          color: isUser ? "#FFFFFF" : "#111827",
          borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
        }}
      >
        <ReactMarkdown
          components={{
            p: ({ ...props }) => <p style={{ margin: 0 }} {...props} />,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>

      {isUser && (
        <div style={styles.avatarUser}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    width: "100%",
    marginBottom: "24px",
    gap: "12px",
    alignItems: "flex-end",
  },
  avatarAgent: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#E5E7EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "#374151",
  },
  avatarUser: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#D1D5DB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "#374151",
  },
  bubble: {
    padding: "12px 18px",
    maxWidth: "75%",
    lineHeight: 1.6,
    fontSize: "15px",
    wordBreak: "break-word",
  },
};

export default MessageItem;
