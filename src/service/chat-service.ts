import { SimpleResponse } from "zenly/types/simple-response";
import { Chat } from "@prisma/client";
import { prisma } from "zenly/utils/prisma";

export const sendChat = async (
  conversationId: string,
  senderId: string,
  content: string
): Promise<SimpleResponse<Chat>> => {
  try {
    const response = await prisma.chat.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const getChatsByConversationById = async (id: string) => {
  try {
    const result = await prisma.chat.findMany({
      where: { conversationId: id },
    });
    return { response: result };
  } catch (error) {
    return { error };
  }
};
