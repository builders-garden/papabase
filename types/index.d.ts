import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      accessToken: string;
    } & DefaultSession["user"];
  }
}
