"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [group, setGroup] = useState("");
  const [grp, setGrp] = useState(true);
  const [me, setMe] = useState("");

  let local = localStorage.getItem("conversationId");
  let sender = localStorage.getItem("senderId");
  const sendMessage = async () => {
    await axios.post("http://localhost:3000/api/chats", {
      conversationId: local,
      senderId: sender,
      content: message,
    });
    setMessage("");
  };

  const setGroupf = () => {
    localStorage.setItem("conversationId", group);
    window.location.reload();
  };

  useEffect(() => {
    if (!local) {
      setGrp(false);
    }
  }, []);

  if (!sender) {
    const nickname = prompt("Нэрээ оруулна уу");
    localStorage.setItem("senderId", me);
    setMe(nickname + "");
  }

  const group_exit = () => {
    localStorage.removeItem("conversationId");
    location.reload();
  };

  return (
    <div className="p-2">
      {grp ? (
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
      ) : (
        <div>
          Group Id
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded mt-2"
            onClick={setGroupf}
          >
            Set Group
          </button>
        </div>
      )}
    </div>
  );
};
