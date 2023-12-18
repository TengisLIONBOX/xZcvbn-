"use client";
import { nanoid } from "nanoid";
import { Chat } from "zenly/types";
import { ChatItem } from "./Chatitem";
import { useState, useEffect } from "react";
import axios from "axios";

export const ChatList = () => {
  const [chats, setChats] = useState<any[]>([]);
  const local = localStorage.getItem("conversationId");

  const ref = async () => {
    const all = await axios.get("http://localhost:3000/api/chats", {});
    setChats(all?.data);
  };

  // const a = chats.filter((el) => el.conversationId === local);
  // var a = chats.filter(function (creature) {
  //   return creature.conversationId == local;
  // });

  // const a = chats.map((item) => {
  //   item.filter(function (creature: any) {
  //     return creature.conversationId == local;
  //   });
  // });
  useEffect(() => {
    ref();
  }, []);
  // console.log(a);
  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-start">
      {chats.map((chat: Chat) => (
        <ChatItem key={nanoid()} chat={chat} />
      ))}
    </div>
  );
};
