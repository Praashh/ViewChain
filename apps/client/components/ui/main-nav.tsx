"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import useCheckUserBoarded from "@/hooks/useCheckUserBoarded";
import { Logo } from "../svgs/logo";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const { callbackUrl } = useCheckUserBoarded();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div
      className={cn(
        "fixed top-4 px-4 left-1/2 -translate-x-1/2 w-full z-[40] transition-all duration-300 ease-in-out",
        scrolled ? "max-w-4xl top-8 pt-0" : "max-w-5xl pt-4"
      )}
    >
      <header
        className={cn(
          "px-2 py-2 flex items-center justify-between rounded-lg transition-all duration-300 ease-in-out",
          scrolled ? "bg-accent/40 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <Link className="flex items-center gap-2" href="#">
          <Logo className="size-8" />
          <span className="text-xl font-medium">ViewChain</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant={"secondary"}>Contact</Button>
          {session ? (
            <Avatar className="bg-primary">
              <AvatarImage src={session.user?.name?.charAt(0)} />
              <AvatarFallback className="bg-primary">
                {session.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              className=""
              variant="default"
              onClick={() => signIn("google", { callbackUrl })}
            >
              Signin
            </Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
