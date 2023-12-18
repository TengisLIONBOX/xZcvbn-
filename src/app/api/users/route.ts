import { NextResponse } from "next/server";
import { getAllUsers } from "zenly/service/user-service";

export const GET = async () => {
  const { response, error } = await getAllUsers();
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ response });
};
