import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import {prisma} from "@repo/db/client"

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    }
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "" ,
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ account, profile }:any) {
        if (account.provider === "google") {
            if (profile.email_verified ) {

                const existingUser = await prisma.user.findUnique({
                    where: { email: profile.email },
                });

                if (!existingUser) {

                    await prisma.user.create({
                        data: {
                            name: profile.name.replace(" ", "").toLowerCase(),
                            email: profile.email,
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
        }

        return session;
    },
},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
