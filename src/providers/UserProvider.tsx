"use client";

import { UserContext } from "zenly/contexts/UserContext";
import { User } from "zenly/types/Users";
import { useState } from "react";

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
