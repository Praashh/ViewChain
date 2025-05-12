import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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

    CredentialsProvider({
      name: "Login with Email",
      credentials: {
        email: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ account, profile, user }: any) {
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

      // Allow credentials-based login if user is returned
      if (account.provider === "credentials" && user) {
        return true;
      }

      return false;
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
