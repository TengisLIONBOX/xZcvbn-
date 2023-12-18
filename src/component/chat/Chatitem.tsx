"use client";
import { useEffect, useState } from "react";
import { Chat } from "zenly/types";

type ChatItemProps = { chat: Chat };
export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const [isUserMessage, setUserMessage] = useState(false);
  useEffect(() => {
    if (chat.senderId === localStorage.getItem("senderId")) {
      setUserMessage(true);
    } else {
    }
  }, []);

  return (
    <div
      className={`inline-block p-2 m-2 rounded shadow ${
        isUserMessage ? "bg-blue-500 text-white ml-auto " : "bg-white left-1"
      }`}
    >
      {chat.content}
    </div>
  );
};
