// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The provider can be a dummy one since you've already handled authentication
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        // Since authentication is already handled, just return the user
        // This authorize function can be minimal or even omitted if not needed
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Here, we simply return the existing token without modifying it
      // You can also add logic here if you need to store specific data in the session
      return token;
    },
    async session({ session, token }) {
      // Attach token data to session object
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
});
