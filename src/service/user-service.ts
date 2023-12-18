import { nanoid } from "nanoid";
import { mongoApiRequest } from "zenly/utils/mongoApiReq";

export const authUser = async (
  email: string,
  name: string,
  imageUrl?: string
) => {
  const { response: existingUser, error: findError } = await getUserByEmail(
    email
  );
  if (findError) return { error: findError };
  if (existingUser) return { response: existingUser };
  const { response, error } = await createUser(email, name, imageUrl);
  if (error) return { error };
  return { response };
};

export const getUserByEmail = async (email: string) => {
  const { response, error } = await mongoApiRequest("findOne", "users", {
    filter: { email },
  });
  if (error) return { error };
  return { response: response.document };
};

export const createUser = async (
  email: string,
  name: string,
  imageUrl?: string
) => {
  const newUser = {
    id: nanoid(),
    name,
    email,
    imageUrl,
  };
  const { response, error } = await mongoApiRequest("insertOne", "users", {
    document: newUser,
  });
  if (error) return { error };
  return { response: newUser };
};

export const getAllUsers = async () => {
  const { response, error } = await mongoApiRequest("find", "users", {});
  if (error) return { error };
  return { response: response.documents };
};
