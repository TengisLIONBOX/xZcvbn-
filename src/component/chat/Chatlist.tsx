"use client";
import { nanoid } from "nanoid";
import { Chat } from "zenly/types";
import { ChatItem } from "./Chatitem";
import { useState, useEffect } from "react";
import axios from "axios";

export const ChatList = () => {
  const [chats, setChats] = useState<any[]>([]);
  const local = localStorage.getItem("conversationId");
  const newarr: any = [];
  const ref = async () => {
    const all = await axios.get("http://localhost:3000/api/chats", {});
    setChats(all?.data);
  };

  useEffect(() => {
    ref();
  }, []);
  console.log(chats);
  chats.map((el) => {
    if (el.conversationId === local) {
      return newarr.push(el);
    }
  });
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-start">
      {newarr.map((chat: Chat) => (
        <ChatItem key={nanoid()} chat={chat} />
      ))}
    </div>
  );
};
