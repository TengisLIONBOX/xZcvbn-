import { NextRequest, NextResponse } from "next/server";
import { getConversation } from "zenly/service/conversation-service";
import { getPathVariable } from "zenly/utils/url";

export const GET = async (request: NextRequest) => {
  const _id = getPathVariable(request, "/api/conversations/");
  const { response, error } = await getConversation(_id);
  if (error) {
    return NextResponse.json(error, { status: 404 });
  }
  return NextResponse.json(response);
};

// PATCH/PUT -> /api/conversations/12
export const PATCH = (request: NextRequest) => {};

// DELETE -> /api/conversations/12
export const DELETE = (request: NextRequest) => {};
