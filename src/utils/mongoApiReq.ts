import axios from "axios";

type MongoApiRequestType =
  | "find"
  | "findOne"
  | "insertOne"
  | "updateOne"
  | "deleteOne"
  | "aggregate";
type MongoApiCollection = "conversations" | "chats" | "users";

export const mongoApiRequest = async (
  action: MongoApiRequestType,
  collection: MongoApiCollection,
  body: object
) => {
  try {
    const axiosResponse = await axios.post(
      `${process.env.MONGO_API_URL}/action/${action}`,
      {
        collection,
        database: "zenly",
        dataSource: "Cluster0",
        ...body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGO_API_KEY,
        },
      }
    );
    const { data } = axiosResponse;
    return { response: data };
  } catch (error: any) {
    const realError = error.response.data;
    console.error(realError);
    return { error: realError };
  }
};
