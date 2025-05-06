"use server"
import { FormData as onboardUserType } from "@/app/onboarding/page"
import { prisma } from "@repo/db"

export async function onboardUser(onboardUser: onboardUserType) {
    console.log("userid -", onboardUser.userid)
    console.log("onBoardUser---", onboardUser);
    const {creatorType, experience, proof, socialAccount, socialMedia: socialHandle, walletConnected: isOnboarded, walletAddress: publicKey, userid} = onboardUser;
    
    if(!isOnboarded) {
        return {
            success: false,
            message: "Please connect wallet first."
        }
    }
    
    // Check if we have a valid identifier
    if(!userid && !publicKey) {
        return {
            success: false,
            message: "User ID or wallet address is required for onboarding"
        }
    }
    
    try {
        const onboardedUser = await prisma.user.update({
            where: userid ? { id: userid } : { publicKey },
            data: {
                creatorType,
                socialHandle,
                publicKey,
                experience,
                isOnboarded,
                socialAccount,
                proof,
            }
        });
        
        return {
            success: true,
            message: "User onboarded successfully",
            onboardedUser
        }
    } catch (error) {
        console.log("Onboarding error:", error);
        return {
            success: false,
            message: "Failed to onboard user",
            error
        }
    }
}