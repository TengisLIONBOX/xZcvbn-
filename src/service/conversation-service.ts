import { Conversation } from "@prisma/client";
import { SimpleResponse } from "zenly/types/simple-response";
import { prisma } from "zenly/utils/prisma";

export const getAllConversations = async (): Promise<
  SimpleResponse<Conversation[]>
> => {
  try {
    const response = await prisma.conversation.findMany({
      include: {
        users: { include: { user: true } },
      },
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

export const getConversation = async (id: string) => {
  try {
    const result = await prisma.conversation.findUnique({
      where: { id: "aaVYSqYRZymWGTKesNJCs" },
    });
    return { response: result };
  } catch (error) {
    return { error };
  }
};
