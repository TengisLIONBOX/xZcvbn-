"use client";

// import Image from "next/image";
import Link from "next/link";
import { useUser } from "zenly/hooks/userUser";
import { fetcher } from "zenly/utils/fetcher";
import useSWR from "swr";

export default function Home() {
  const { user } = useUser();
  const {
    data: conversationsData,
    isLoading: usersLoading,
    error: usersError,
  } = useSWR("/api/conversations", fetcher);
  console.log("conversationsData:", conversationsData);

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
        <hr />
        {conversationsData?.map((conversation: any) => (
          <Link
            href={`/conversations/${conversation.id}`}
            className="flex gap-6 items-center"
            key={conversation.id}
          >
            {/* <Image src={`${user.imageUrl}`} alt={user.name} width={48} height={48} className="rounded-full" /> */}
            <div>
              <p>{conversation.id}</p>
            </div>
          </Link>
        ))}
        <hr />
      </div>
    </div>
  );
}
