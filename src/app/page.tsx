// "use client";
// // import axios from "axios";
// // import { useUsers } from "zenly/hooks/UserUsers";
// // import { useEffect, useState } from "react";
// import { ChatList } from "zenly/component/chat/Chatlist";
// import { ChatInput } from "zenly/component/chat/Chatinput";

// export default function Home() {
//   // const { user, setUser } = useUsers();

//   // const [isLoading, setIsLoading] = useState(false);

//   // useEffect(() => {
//   //   if (!user) {
//   //     axios
//   //       .get("/api/users/me")
//   //       .then(({ data }) => {
//   //         setUser(data.response);
//   //       })
//   //       .finally(() => {
//   //         setIsLoading(false);
//   //       });
//   //   }
//   // }, [user]);

//   // if (isLoading) return <>Loading...</>;
//   // if (user)
//   //   return (
//   //     <div>
//   //       <h1>Hello {user.name}</h1>
//   //       <a href="/api/auth/logout">Гарах</a>
//   //     </div>
//   //   );
//   return (
//     <div>
//       {/* <a href="/api/auth/login">Нэвтрэх</a> */}
//       <ChatList />
//       <ChatInput />
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useUsers } from "zenly/hooks/UserUsers";
import { User } from "@prisma/client";
import { fetcher } from "zenly/utils/fetcher";
import useSWR from "swr";
import { getPathVariable } from "zenly/utils/url";

export default function Home() {
  const { user } = useUsers();
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useSWR("/api/users", fetcher);
  console.log("usersData:", usersData);

  if (!user) return <div>loading...</div>;

  return (
    <div className="flex w-full h-screen flex-col py-12 px-9">
      <div className="flex gap-4 items-center">
        {/* <Image
          src={user.imageUrl}
          alt={user.name}
          width={36}
          height={36}
          className="rounded-full"
        /> */}
        <p className="font-bold">{user.name}</p>
      </div>
      <div className="border-t border-b py-4 my-4 border-white/30">
        {usersData?.map((user: User) => (
          <Link
            href={`/new?to=${user.id}`}
            className="flex gap-6 items-center"
            key={user.id}
          >
            {/* <Image
              src={user.imageUrl}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full"
            /> */}
            <div>
              <p>{user.name}</p>
              <p>Start conversation...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
