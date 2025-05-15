"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Particles } from "@/components/magicui/particles";
import { Badge } from "@/components/ui/badge";
import { features } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plant } from "@phosphor-icons/react";

export const Features = () => {
  return (
    <div className="w-full min-h-[20rem] h-fit py-20 flex flex-col items-center">
      <div className="flex flex-col items-center w-full gap-4">
        <Badge variant="secondary" className="rounded-sm">
          <Plant className="size-5" />
          <span className="text-sm font-light">Features</span>
        </Badge>
        <h1 className="text-4xl lg:text-5xl text-center text-balance md:w-[50%] w-full font-normal">
          This is why we are gonna make your life easier.
        </h1>
        <p className="text-neutral-400 font-light text-balance text-center lg:w-[50%] w-full">
          We are a team of developers who are passionate about creating
          solutions that make life easier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 pb-20 w-full gap-4">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              index === 1 ? "col-span-1 lg:col-span-2" : "",
              "h-[30rem] relative overflow-hidden w-full flex group flex-col gap-4 border-2 p-4 rounded-2xl",
              "bg-background transition-all duration-300"
            )}
          >
            <div className="bottom-0 z-[1] right-[-10rem] absolute bg-gradient-to-t ease-in-out group-hover:opacity-100 opacity-0 from-primary blur-[4em] transition-all duration-700 h-[32rem] w-[15rem] rounded-full rotate-[-10deg]"></div>
            <Particles
              className=" absolute inset-0 z-0"
              quantity={100}
              ease={80}
              color={"#3683ff"}
              refresh
            />

            <div className="flex-1">
              <div className="flex bg-primary rounded-xl w-fit p-4 items-center gap-2">
                <feature.icon className="size-10" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-end gap-2">
              <h2 className="text-3xl font-medium">{feature.title}</h2>
              <p className="text-base text-neutral-400 font-light">
                {feature.description}
              </p>
            </div>
            <BorderBeam
              colorFrom="#3683ff"
              colorTo="#3683ff"
              className="group-hover:opacity-100 opacity-0"
              duration={12}
              size={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
