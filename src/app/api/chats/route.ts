import { NextRequest, NextResponse } from "next/server";
import { sendChat, getAllChats } from "zenly/service/chat-service";

export const GET = async (request: NextRequest) => {
  const { response, error } = await getAllChats();
  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json(response);
};

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { content } = data;
  const { conversationId } = data;
  const { senderId } = data;
  const { response, error } = await sendChat(conversationId, senderId, content);
  if (error) return NextResponse.json(error, { status: 500 });
  return NextResponse.json(response);
};
