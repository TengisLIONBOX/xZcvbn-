"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "zenly/hooks/userUser";
import { fetcher } from "zenly/utils/fetcher";
import useSWR from "swr";

export default function Home() {
  const { user } = useUser();
  const { data, isLoading, error } = useSWR("/api/conversations", fetcher);

  if (!user) return <div>Loading user...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <>{error}</>;

  return (
    <div className="flex w-full h-screen flex-col py-12 px-9">
      <div className="flex gap-4 items-center">
        <Image
          src={user.imageUrl}
          alt={user.name}
          width={36}
          height={36}
          className="rounded-full"
        />
        <p className="font-bold">{user.name}</p>
      </div>
      <div className="border-t border-b py-4 my-4 border-white/30">
        {data?.map((conversation: any) => (
          <div key={conversation.id} className="py-4">
            <hr className="mb-4" />
            <Link
              href={`/conversations/${conversation.id}`}
              key={conversation.id}
            >
              <div className="flex py-2 items-center">
                <Image
                  src={`${user.imageUrl}`}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="font-bold">{conversation.id}</p>
                </div>
              </div>
            </Link>
            <hr className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
