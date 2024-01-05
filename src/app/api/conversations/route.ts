import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import {
  createConversation,
  getAllConversations,
} from "zenly/service/conversation-service";
import { getUserByEmail } from "zenly/service/user-service";

export const GET = withApiAuthRequired(async function myApiRoute(req) {
  const res = new NextResponse();
  const { user: sessionUser }: any = await getSession(req, res);
  if (!sessionUser)
    return NextResponse.json(
      { error: "User not authorized!" },
      { status: 401 }
    );
  const { email } = sessionUser;
  const { response: user } = await getUserByEmail(email);
  if (!user) return NextResponse.json({ error: "User not found" });
  const { response, error } = await getAllConversations(user.id);
  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ response });
});

// POST -> /api/conversations
export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { users } = data;
  const { response, error } = await createConversation(users);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(response);
};
