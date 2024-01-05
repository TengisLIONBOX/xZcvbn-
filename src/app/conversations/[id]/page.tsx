"use client";
import { Chat } from "@prisma/client";
import axios from "axios";
import { useUser } from "zenly/hooks/userUser";
import { fetcher } from "zenly/utils/fetcher";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = useUser();
  const { data, isLoading, error } = useSWR(`/api/chats/${id}`, fetcher);
  const [input, setInput] = useState<string>("");
  const [isUserMessage, setIsUserMessage] = useState<boolean>(false);

  useEffect(() => {
    if (data?.senderId === user?.id) {
      setIsUserMessage(true);
    }
  }, [data, user, isUserMessage]);

  if (isLoading) return <>Loading...</>;
  if (error) return <>{error.message}</>;

  const name = user?.name;

  const sendChat = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await axios.post(`/api/chats/${id}`, {
        content: input,
        senderId: user?.id,
      });

      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col p-6">
      <Link href={"/"} className="btn btn-circle btn-ghost mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </Link>
      <ul className="flex-1 overflow-y-auto flex flex-col items-start">
        {data.map((chat: Chat) => (
          <div
            className={`inline-block ${
              isUserMessage ? " ml-auto " : "left-1"
            } mb-2`}
            key={chat.id}
          >
            <div>
              <p className={`text-xs ${isUserMessage ? "hidden" : ""} mb-1`}>
                {name}
              </p>
              <p
                className={`p-3 rounded shadow ${
                  isUserMessage ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {chat.content}
              </p>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center mt-4">
        <input
          className="border p-2 rounded w-full mr-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendChat}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
