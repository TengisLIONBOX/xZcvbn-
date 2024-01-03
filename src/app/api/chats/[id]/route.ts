import { NextRequest, NextResponse } from "next/server";
import {
  getChatsByConversationById,
  sendChat,
} from "zenly/service/chat-service";
import { getPathVariable } from "zenly/utils/url";

export const GET = async (request: NextRequest) => {
  try {
    const conversationId = getPathVariable(request, "/api/chats/");

    const { response } = await getChatsByConversationById(conversationId);

    console.log({ response });
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const conversationId = getPathVariable(request, "/api/chats/");
  const data = await request.json();
  const { senderId, content } = data;
  const { response, error } = await sendChat(conversationId, senderId, content);

  console.log(response);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ response });
};
