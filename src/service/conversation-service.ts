import { prisma } from "zenly/utils/prisma";
import { Prisma, Conversation } from "@prisma/client";
// import { mongoApiRequest } from "zenly/utils/mongoApiReq";

// export const getAllConversations = async (): Promise<
//   SimpleResponse<Conversation[]>
// > => {
//   const { response, error } = await mongoApiRequest(
//     "find",
//     "conversations",
//     {}
//   );
//   if (error) return { error };

//   return { response: response.documents };
// };

// export const createConversation = async (
//   members: string[]
// ): Promise<SimpleResponse<Conversation>> => {
//   const newConversation = {
//     _id: nanoid(),
//     members,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };
//   const { response, error } = await mongoApiRequest(
//     "insertOne",
//     "conversations",
//     {
//       document: newConversation,
//     }
//   );
//   if (error) return { error };

//   return { response: newConversation };
// };

// export const getConversation = async (
//   _id: string
// ): Promise<SimpleResponse<Conversation>> => {
//   const { response, error } = await mongoApiRequest(
//     "findOne",
//     "conversations",
//     { filter: { _id } }
//   );
//   if (error) return { error };

//   return { response };
// };

export const getAllConversations = async (
  filter?: Prisma.ConversationWhereInput
) => {
  try {
    const result = await prisma.conversation.findMany({ where: filter });
    return { response: result };
  } catch (error) {
    return { error };
  }
};

export const createConversation = async (
  input: Prisma.ConversationCreateInput
) => {
  try {
    const result = await prisma.conversation.create({ data: input });
    return { response: result };
  } catch (error) {
    return { error };
  }
};

export const getConversation = async (id: string) => {
  try {
    const result = await prisma.conversation.findUnique({ where: { id } });
    return { response: result };
  } catch (error) {
    return { error };
  }
};
