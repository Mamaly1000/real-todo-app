import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./../../../server/lib/mongoDB";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET_JWT,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
