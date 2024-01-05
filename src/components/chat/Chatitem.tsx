"use client";
import { useEffect, useState } from "react";
import { Chat } from "@prisma/client";

type ChatItemProps = { chat: Chat };
export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const [isUserMessage, setUserMessage] = useState(false);
  useEffect(() => {
    if (chat.senderId === localStorage.getItem("senderId")) {
      setUserMessage(true);
    }
  }, []);

  return (
    <div className={`inline-block ${isUserMessage ? " ml-auto " : " left-1"}`}>
      <div>
        <p className={`text-[12px] ${isUserMessage ? "hidden" : ""}`}>
          {chat.senderId}
        </p>
        <p
          className={`p-2 m-2 rounded shadow ${
            isUserMessage ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {chat.content}
        </p>
      </div>
    </div>
  );
};
