"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then(({ data }) => {
        setUser(data.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <>Loading...</>;
  if (user)
    return (
      <div>
        <h1>Hello {user.name}</h1>
        <a href="/api/auth/logout">Гарах</a>
      </div>
    );
  return (
    <div>
      <a href="/api/auth/login">Нэвтрэх</a>
      {/* <ChatList /> */}
      {/* <ChatInput /> */}
    </div>
  );
}
