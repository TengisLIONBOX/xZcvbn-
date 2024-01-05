import { NextRequest, NextResponse } from "next/server";
import {
  getChatsByConversationById,
  sendChat,
} from "zenly/service/chat-service";
import { getUserByEmail } from "zenly/service/user-service";
import { getPathVariable } from "zenly/utils/url";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = async (request: NextRequest) => {
  try {
    const conversationId = getPathVariable(request, "/api/chats/");
    const { response } = await getChatsByConversationById(conversationId);

    // const res = new NextResponse();
    // const { user: sessionUser }: any = await getSession(request, res);
    // const { email } = sessionUser;
    // const { response: user } = await getUserByEmail(email);
    // console.log("asa", user?.id);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in GET request:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = withApiAuthRequired(async function myApiRoute(req) {
  try {
    const res = new NextResponse();
    const { user: sessionUser }: any = await getSession(req, res);
    const conversationId = getPathVariable(req, "/api/chats/");
    const data = await req.json();
    const { content } = data;
    const { email } = sessionUser;
    const { response: user } = await getUserByEmail(email);
    const senderId = user?.id || "";
    const { response, error } = await sendChat(
      conversationId,
      senderId,
      content
    );

    if (error) {
      console.error("Error sending chat:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Authentication Error:", error);
    return NextResponse.json(
      { error: "Authentication Error" },
      { status: 401 }
    );
  }
});
