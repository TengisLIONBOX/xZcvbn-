"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getPathVariable } from "zenly/utils/url";
import { useUser } from "zenly/hooks/userUser";
import { fetcher } from "zenly/utils/fetcher";
import useSWR from "swr";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  // const [group, setGroup] = useState("");
  // const [grp, setGrp] = useState(true);
  // const [me, setMe] = useState("");

  const { user } = useUser();
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useSWR("/api/users", fetcher);

  if (!user) return <div>loading...</div>;
  let local = getPathVariable;

  const sendMessage = async () => {
    await axios.post("http://localhost:3000/api/chats", {
      conversationId: local,
      senderId: user.id,
      content: message,
    });
    setMessage("");
  };

  // const setGroupf = () => {
  //   localStorage.setItem("conversationId", group);
  //   window.location.reload();
  // };

  console.log("asa", getPathVariable);

  // useEffect(() => {
  //   if (!local) {
  //     setGrp(false);
  //   }
  // }, []);

  // if (!sender) {
  //   const nickname = prompt("Нэрээ оруулна уу");
  //   localStorage.setItem("senderId", me);
  //   setMe(nickname + "");
  // }

  const group_exit = () => {
    localStorage.removeItem("conversationId");
    location.reload();
  };

  return (
    <div className="p-2">
      <>
        <button
          onClick={group_exit}
          className="p-2 bg-red-500 text-white rounded mt-2"
        >
          EXIT GROUP
        </button>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded mt-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </>
    </div>
  );
};
