"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import useCheckUserBoarded from "@/hooks/useCheckUserBoarded";
import Link from "next/link";

export const CTA = () => {
  const { callbackUrl } = useCheckUserBoarded();
  const { data: session } = useSession();
  return (
    <div className="w-full py-16 max-w-4xl my-20 mx-auto overflow-hidden px-4 relative bg-accent/40 rounded-2xl h-[20rem] flex flex-col items-center justify-center gap-4">
      <div className="absolute inset-0 bg-background rounded-xl m-3 z-[10]"></div>
      <div className="bottom-0 right-[-1rem] absolute bg-gradient-to-t ease-in-out from-primary to-primary blur-[2em] transition-all duration-700 h-[20rem] w-[15rem] rounded-full rotate-[-15deg]"></div>
      <div className="bottom-0 left-[-1rem] absolute bg-gradient-to-t ease-in-out from-primary to-primary blur-[2em] transition-all duration-700 h-[20rem] w-[15rem] rounded-full rotate-[-15deg]"></div>
      <div className="z-[20] flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl text-center lg:text-5xl font-medium">
          Ready to get started?
        </h2>
        <p className="text-neutral-300 text-center text-balance">
          Join our community and start building your own projects today.
        </p>
        {!session ? (
          <Button onClick={() => signIn("google", { callbackUrl })}>
            Signin now
          </Button>
        ) : (
          <Button asChild>
            <Link href="/marketplace">Visit Marketplace</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
