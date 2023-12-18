import { NextRequest } from "next/server";

export const getPathVariable = (request: NextRequest, sourcePath: string) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const value = path.replace(sourcePath, "");
  return value;
};
