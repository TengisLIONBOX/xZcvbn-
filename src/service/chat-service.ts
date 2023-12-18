import { Chat, SimpleResponse } from "zenly/types";
import { mongoApiRequest } from "zenly/utils/mongoApiReq";
import { getConversation } from "./conversation-service";
import { nanoid } from "nanoid";

export const getChatsByConversationById = async (
  conversationId: string
): Promise<SimpleResponse<Chat[]>> => {
  const { response, error } = await mongoApiRequest("find", "chats", {
    filter: { conversationId },
  });
  if (error) return { error };
  return { response: response.documents };
};

export const sendChat = async (
  conversationId: string,
  senderId: string,
  content: string
): Promise<SimpleResponse<Chat>> => {
  const { response: conversation, error: conversationError } =
    await getConversation(conversationId);
  if (!conversation || conversationError) {
    return { error: conversationError || new Error("Conversation not found") };
  }
  const newChat: Chat = {
    _id: nanoid(),
    conversationId,
    senderId,
    content,
    createdAt: new Date(),
  };
  const { response, error } = await mongoApiRequest("insertOne", "chats", {
    document: newChat,
  });
  if (error) return { error };
  return { response: newChat };
};

export const getAllChats = async (): Promise<SimpleResponse<Chat[]>> => {
  const { response, error } = await mongoApiRequest("find", "chats", {});
  if (error) return { error };

  return { response: response.documents };
};
