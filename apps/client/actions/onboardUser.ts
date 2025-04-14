"use server"
import { FormData as onboardUserType } from "@/app/onboarding/page"
import { prisma } from "@repo/db/client"

export async function onboardUser(onboardUser:onboardUserType) {
    if(onboardUser.walletConnected){
        try {
            const onboardedUser = await prisma.user.update({
                where: {
                    id: onboardUser.userid!
                },
                data:{
                    creatorType: onboardUser.creatorType,
                    socialHandle: onboardUser.socialMedia,
                    experience: onboardUser.experience,
                    isOnboarded: onboardUser.walletConnected,
                }
            })
            return {
                success: true,
                message: "User onboarded successfully",
                onboardedUser
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to onboard user"
            }
        }
    }else{
        return {
            success: false,
            message: "Please connect wallet first."
        }
    }
}