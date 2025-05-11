"use client"

import { getWalletPrivateKey } from "@/actions/getWallet"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const useGetWalletKey = () => {
    const router = useRouter();
    useEffect(()=>{
        (async () =>{
         const {success}  = await getWalletPrivateKey(process.env.NEXT_PUBLIC_WALLET_ASSET_ID as string)

         if(!success){
            router.refresh()
         }
        })()
      },[])
}

export default useGetWalletKey