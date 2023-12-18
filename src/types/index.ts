export type Chat = {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
};

export type Conversation = {
  _id: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type SimpleResponse<T> = {
  response?: T;
  error?: Error;
};
