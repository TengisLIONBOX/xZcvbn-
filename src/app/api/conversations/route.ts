import { NextRequest, NextResponse } from "next/server";
import {
  createConversation,
  getAllConversations,
} from "zenly/service/conversation-service";

// GET -> /api/conversations
export const GET = async (request: NextRequest) => {
  const { response, error } = await getAllConversations();
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ response });
};

// POST -> /api/conversations
export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { users } = data;
  const { response, error } = await createConversation(users);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(response);
};
