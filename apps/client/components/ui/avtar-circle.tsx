/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Avatar = {
  img: string;
  hkirat?: boolean;
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
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false); // control dialog manually
  const { user } = useAuth();

  async function handleLogin() {
    setLoader(true);

    if (passCode === (process.env.NEXT_PUBLIC_SUPER_LOGIN_PASS_KEY as string)) {
      await signIn("credentials", {
        email: process.env.NEXT_PUBLIC_SUPER_LOGIN_ID as string,
        callbackUrl: "/marketplace",
      });
      // No need to close dialog manually, redirect will happen
    } else {
      toast.error("Wrong Key Entered!");
      setLoader(false);
    }
  }

  return (
    <div
      className={cn(
        "z-10 flex border bg-muted/70 backdrop-blur-md rounded-lg flex-col rtl:space-x-reverse",
        className
      )}
    >
      <div className="flex p-1 items-center gap-1">
        {avatarUrls.map((item, index) =>
          item.hkirat && !user?.email ? (
            <Dialog key={index} open={open} onOpenChange={setOpen}>
              <img
                className="size-10 cursor-pointer rounded-md shadow-xl"
                src={item.img}
                width={40}
                height={40}
                alt={`Avatar ${index + 1}`}
                onDoubleClick={() => setOpen(true)}
              />

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
                    <Input
                      type="password"
                      className="col-span-3"
                      onChange={(e) => setPassCode(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleLogin} disabled={loader}>
                    {loader ? "Signing..." : "Signin"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <img
              key={index}
              className="size-10 cursor-pointer rounded-md shadow-xl"
              src={item.img}
              width={40}
              height={40}
              alt={`Avatar ${index + 1}`}
            />
          )
        )}
        <span className="flex size-10 items-center justify-center rounded-md font-semibold border-2 border-primary bg-primary text-center text-xs drop-shadow-2xl text-white dark:border-primary dark:bg-primary dark:text-black">
          +{numPeople}
        </span>
      </div>
      <div className="size-6 text-xs w-full rounded-b-lg text-center bg-accent/10 backdrop-blur-md p-1">
        Loved by users
      </div>
    </div>
  );
};

export default AvatarCircles;
