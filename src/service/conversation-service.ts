import { nanoid } from "nanoid";
import { Conversation, SimpleResponse } from "zenly/types";
import { mongoApiRequest } from "zenly/utils/mongoApiReq";

export const getAllConversations = async (): Promise<
  SimpleResponse<Conversation[]>
> => {
  const { response, error } = await mongoApiRequest(
    "find",
    "conversations",
    {}
  );
  if (error) return { error };

  return { response: response.documents };
};

export const createConversation = async (
  members: string[]
): Promise<SimpleResponse<Conversation>> => {
  const newConversation = {
    _id: nanoid(),
    members,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const { response, error } = await mongoApiRequest(
    "insertOne",
    "conversations",
    {
      document: newConversation,
    }
  );
  if (error) return { error };

  return { response: newConversation };
};

export const getConversation = async (
  _id: string
): Promise<SimpleResponse<Conversation>> => {
  const { response, error } = await mongoApiRequest(
    "findOne",
    "conversations",
    { filter: { _id } }
  );
  if (error) return { error };

  return { response };
};
