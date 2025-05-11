import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@repo/db";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      isOnboarded?: boolean;
      publicKey?: string;
      socialHandle?: string;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        if (profile.email_verified) {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: profile.name.replace(" ", "").toLowerCase(),
                email: profile.email,
                proof: {},
                socialAccount: ""
              },
            });
          }

          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session }: any) {
      const userFromDb = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (userFromDb) {
        session.user.id = userFromDb.id;
        session.user.name = userFromDb.name;
        session.user.isOnboarded = userFromDb.isOnboarded;
        session.user.publicKey = userFromDb.publicKey;
        session.user.socialHandle = userFromDb.socialHandle;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};