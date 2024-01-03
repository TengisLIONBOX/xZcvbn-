"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "zenly/hooks/userUser";
import { useEffect } from "react";

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const { setUser } = useUser();
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
