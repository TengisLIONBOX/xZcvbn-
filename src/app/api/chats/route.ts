import { NextRequest, NextResponse } from "next/server";
import {
  getChatsByConversationById,
  sendChat,
} from "zenly/service/chat-service";
import { getUserByEmail } from "zenly/service/user-service";
import { getPathVariable } from "zenly/utils/url";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = async (request: NextRequest) => {
  const conversationId = getPathVariable(request, "/api/chats/");
  const { response, error } = await getChatsByConversationById(conversationId);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ response });
};
