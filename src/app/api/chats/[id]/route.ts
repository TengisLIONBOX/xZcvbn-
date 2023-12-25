import { NextRequest, NextResponse } from "next/server";
import {
  getChatsByConversationById,
  sendChat,
} from "zenly/service/chat-service";
import { getPathVariable } from "zenly/utils/url";

export const GET = async (request: NextRequest) => {
  const conversationId = getPathVariable(request, "/api/chats/");
  const { response, error } = await getChatsByConversationById(conversationId);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(response);
};

export const POST = async (request: NextRequest) => {
  const conversationId = getPathVariable(request, "/api/chats/");
  const data = await request.json();
  console.log(conversationId);

  const { senderId, content } = data;
  const { response, error } = await sendChat(conversationId, senderId, content);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(response);
};
