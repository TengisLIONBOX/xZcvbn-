"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUsers } from "zenly/hooks/UserUsers";
import { useEffect } from "react";

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const { setUser } = useUsers();
  const router = useRouter();
  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => {
        setUser(res.data.response);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return <>{children}</>;
};
