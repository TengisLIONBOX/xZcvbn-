"use client";
import { Chat } from "@prisma/client";
import axios from "axios";
import { useUser } from "zenly/hooks/userUser";
import { fetcher } from "zenly/utils/fetcher";
import { useState } from "react";
import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = useUser();
  const { data, isLoading, error } = useSWR(`/api/chats/${id}`, fetcher);
  const [input, setInput] = useState("");

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  const sendChat = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`/api/chats/${id}`, {
        content: input,
        senderId: user!.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {data &&
          Array.isArray(data) &&
          data.map((chat: Chat) => <li key={chat.id}>{chat.content}</li>)}
      </ul>
      <form onSubmit={sendChat}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-black"
        />
        <button>Send</button>
      </form>
    </div>
  );
}
