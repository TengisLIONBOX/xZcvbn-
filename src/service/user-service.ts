import { Prisma, User } from "@prisma/client";
import { SimpleResponse } from "zenly/types/simple-response";
import { prisma } from "zenly/utils/prisma";

export const authUser = async (
  email: string,
  name: string,
  imageUrl?: string
): Promise<SimpleResponse<User>> => {
  const { response: existingUser, error: findError } = await getUserByEmail(
    email
  );
  if (findError) return { error: findError };
  if (existingUser) return { response: existingUser };
  const { response, error } = await createUser({ email, name, imageUrl });
  if (error) return { error };
  return { response };
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({ where: { email } });
    return { response: result };
  } catch (error) {
    return { error };
  }
};

export const createUser = async (input: Prisma.UserCreateInput) => {
  try {
    const result = await prisma.user.create({ data: input });
    return { response: result };
  } catch (error) {
    return { error };
  }
};

export const getAllUsers = async (filter?: Prisma.UserWhereInput) => {
  try {
    const result = await prisma.user.findMany({ where: filter });
    return { response: result };
  } catch (error) {
    return { error };
  }
};
