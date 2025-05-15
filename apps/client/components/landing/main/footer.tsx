import { Logo } from "@/components/svgs/logo";
import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { team } from "@/constants/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";

export const Footer = () => {
  return (
    <div className="w-full relative overflow-hidden pt-16 mt-4 flex flex-col items-center justify-center gap-8">
      <Link className="flex items-center gap-2" href="#">
        <Logo className="size-8" />
        <span className="text-xl font-medium">ViewChain</span>
      </Link>

      <div className="text-sm text-neutral-300">
        Developed by{" "}
        <Dialog>
          <DialogTrigger>
            <span className="underline font-medium cursor-pointer hover:text-primary transition-colors">
              ViewChain Team
            </span>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-medium text-center mb-6">
                Meet Our Team
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col bg-accent/50 p-1 pb-3 rounded-xl items-center gap-4 group"
                >
                  <Avatar className="h-32 w-32 rounded-xl border-2 group-hover:border-primary transition-colors">
                    <AvatarImage
                      className="rounded-xl"
                      src={member.image}
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-medium text-sm">{member.name}</h3>
                    <p className="text-neutral-400 text-xs/tight">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={member.github}
                      target="_blank"
                      className="hover:text-primary transition-colors"
                    >
                      <GithubLogo className="size-5" />
                    </Link>
                    <Link
                      href={member.x}
                      target="_blank"
                      className="hover:text-primary transition-colors"
                    >
                      <XLogo className="size-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Link href="https://x.com/_viewchain_">
          <XLogo className="size-6" />
        </Link>
      </div>

      <div className="flex items-center justify-center h-fit gap-0">
        {["V", "I", "E", "W", "C", "H", "A", "I", "N"].map(
          (item, index, arr) => {
            return (
              <span
                // onClick={() => router.push("/")}
                key={`item-${index}`}
                className={`text-[4rem] md:text-[6rem] lg:text-[13rem] font-bold ${
                  index + 1 <= arr.length / 2
                    ? "hover:-rotate-12"
                    : "hover:rotate-12"
                }  cursor-pointer transition-all duration-200 ease-out hover:bg-primary  hover:scale-110 bg-gradient-to-b from-black/20 dark:from-white/20 bg-clip-text text-transparent`}
              >
                {item}
              </span>
            );
          }
        )}
      </div>
    </div>
  );
};
