"use server"

import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export async function getSessionForOnBoarding() {
    const session = await getServerSession(authOptions);

    return session?.user ? {success: true, user:session.user} : {success:false};
}