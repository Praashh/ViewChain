"use client";
import useGetWalletKey from "@/hooks/useGetWalletKey";
import { Button } from "@/components/ui/button";
import { UsersAvatar } from "@/components/ui/user-avtar";
import { ArrowRight, CaretCircleDoubleDown } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { HeroVideo } from "./hero-video";
import { SolImg } from "../btc-img";
import { reclaim, sol, sol2 } from "@/constants/image";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import useCheckUserBoarded from "@/hooks/useCheckUserBoarded";
import Link from "next/link";

export const Hero = () => {
  const { data: session } = useSession();
  const { callbackUrl } = useCheckUserBoarded();
  useGetWalletKey();
  return (
    <div className="flex relative mt-28 flex-col items-center justify-center">
      <SolImg
        image={sol2}
        className="absolute lg:block hidden top-[20rem] left-20"
        size="size-[12rem]"
        glareClassName="size-[8rem] z-[-1] blur-[40px]"
      />
      <SolImg
        image={sol}
        className="w-fit absolute lg:block hidden top-44 right-8"
        glareClassName="size-[15rem] z-[-1] blur-[40px] bottom-[-1rem]"
        size="size-[18rem]"
      />
      <div className="py-8 w-full flex flex-col gap-4 items-center">
        <Badge
          className="z-[20] flex items-center gap-2 rounded-sm p-2"
          variant="secondary"
        >
          <div className="size-4">
            <Image
              src={reclaim}
              className="size-full object-cover"
              alt="reclaim"
            />
          </div>
          <div>Powered by Reclaim Protocol with power of zkTLS</div>
        </Badge>
        <h1 className="lg:text-7xl md:text-5xl text-4xl text-center text-balance md:w-[80%] w-full font">
          Transparent your assets&apos;s views and interactions.
        </h1>
        <p className="text-center my-2 text-neutral-300 text-balance md:w-[60%] w-full sm:text-lg text-base font-light">
          A decentralized platform that mints NFTs for every view or listen,
          turning audience engagement into verifiable, on-chain provenance
        </p>

        <div className="flex z-[20] gap-4 sm:flex-row flex-col items-center justify-center w-full mb-4">
          {session ? (
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/marketplace">
                Visit Marketplace
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          ) : (
            <Button
              onClick={() => signIn("google", { callbackUrl })}
              className="w-full sm:w-48 h-10"
            >
              Get Started
              <ArrowRight className="size-5" />
            </Button>
          )}

          <Button className="w-full sm:w-48 h-10" variant="secondary" asChild>
            <Link href={"https://cal.com/prashant-varma-odaotf/15min?duration=10"} target="_blank" rel="noopener noreferrer">
              Take a Demo
              <CaretCircleDoubleDown className="size-5" />
            </Link>
          </Button>
        </div>
        <UsersAvatar />
        <HeroVideo />
      </div>
      <div className="top-[29rem] z-[1] left-1/2 -translate-x-1/2 absolute bg-gradient-to-t ease-in-out  from-primary via-accent/50 to-primary blur-[3em] transition-all duration-700 md:size-[38rem] rounded-full size-[12rem] rotate-[-40deg]"></div>
    </div>
  );
};
