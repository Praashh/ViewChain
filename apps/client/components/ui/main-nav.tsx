"use client"
import { View } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from './button';
import useCheckUserBoarded from '@/hooks/useCheckUserBoarded';

const Navbar = () => {
    const { data: session } = useSession();
   const {callbackUrl} = useCheckUserBoarded();
    
    return (
    <div>
         <header className=" text-white px-4 lg:px-6 py-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <View className="h-6 w-6" />
          <span className="text-xl font-bold">ViewChain</span>
        </Link>
        {
          session ? (
            <Button className="hidden lg:inline-flex" variant="secondary"
            onClick={() => signOut()}
          >
            Logout
          </Button>
          ) : (
            <Button className="hidden lg:inline-flex" variant="secondary"
              onClick={() => signIn("google", { callbackUrl})}
            >
              Signin
            </Button>
          )
        }
      </header>
    </div>
  )
}

export default Navbar
