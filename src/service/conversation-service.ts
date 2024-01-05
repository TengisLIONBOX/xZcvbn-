import { Conversation } from "@prisma/client";
import { SimpleResponse } from "zenly/types/simple-response";
import { prisma } from "zenly/utils/prisma";

export const getAllConversations = async (
  userId: string
): Promise<SimpleResponse<Conversation[]>> => {
  try {
    const response = await prisma.conversation.findMany({
      where: {
        users: { some: { userId } },
      },
      include: {
        users: { include: { user: true } },
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const getConversationsByUserIds = async (userIds: string[]) => {
  try {
    const response = await prisma.conversation.findMany({
      where: {
        users: {
          some: { userId: { in: userIds } },
        },
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const getConversation = async (id: string) => {
  try {
    const response = await prisma.conversation.findUnique({
      where: { id },
      include: { users: { include: { user: true } } },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export const createConversation = async (
  users: string[]
): Promise<SimpleResponse<Conversation>> => {
  try {
    const response = await prisma.conversation.create({
      data: {
        users: {
          create: [
            {
              userId: users[0],
            },
            {
              userId: users[1],
            },
          ],
        },
      },
    });
    return { response };
  } catch (error) {
    return { error };
  }
};
