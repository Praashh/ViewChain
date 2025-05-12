/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

type Avatar = {
  img: string;
  hkirat?: boolean
};

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  const [passCode, setPassCode] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false)

  async function handleLogin () {
    setLoader(true)
    if(passCode === process.env.NEXT_PUBLIC_SUPER_LOGIN_PASS_KEY as string){
      signIn('credentials', { email: process.env.NEXT_PUBLIC_SUPER_LOGIN_ID as string, callbackUrl: '/marketplace' });
    }else{
      toast.error("Wrong Key Entered!")
    }
    setLoader(false)
  }
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      {avatarUrls.map((item, index) => (
        item.hkirat ? (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <img
                className="h-10 w-10 cursor-pointer rounded-full shadow-xl"
                src={item.img}
                width={40}
                height={40}
                alt={`Avatar ${index + 1}`}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  // The dialog will open through the DialogTrigger's internal logic
                }}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Super Special Login</DialogTitle>
                <DialogDescription>
                   Please enter the super special login code to login.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="login" className="text-right">
                     Login Code
                  </Label>
                  <Input  type='password' className="col-span-3"  onChange={(e) => setPassCode(e.target.value)}/>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleLogin} disabled={loader}>{loader ? "Signing...": "Signin"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : 
        <img
          key={index}
          className="h-10 w-10 cursor-pointer rounded-full shadow-xl"
          src={item.img}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary text-center text-xs font-medium text-white dark:border-primary dark:bg-primary dark:text-black">
        +{numPeople}
      </span>
    </div>
  );
};

export default AvatarCircles;