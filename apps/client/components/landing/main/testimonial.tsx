"use client";
import React, { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { GithubLogo, XLogo, ChatCircleDots } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";

const testimonials = [
  {
    name: "Harkirat Singh",
    role: "Founder @100xdevs and Full Stack Developer",
    avatar: "https://avatars.githubusercontent.com/u/8079861",
    quote: "Oh! That looks good ! The UI also looks preety good ",
    x: "https://x.com/kirat_tw",
    github: "https://github.com/hkirat",
    rating: 4,
  },
  {
    name: "Manu Arora",
    role: "Founder @AceternityLabs",
    avatar: "https://avatars.githubusercontent.com/u/23276437",
    quote: "Looks superclean and good , color combination also looks great",
    x: "https://x.com/mannupaaji",
    github: "https://github.com/manuarora700",
    rating: 4,
  },
  {
    name: "Sargam Poudel",
    role: "SWE @DropStation",
    avatar: "https://avatars.githubusercontent.com/u/76874341",
    quote: "Wow bro , looks decent , great project must say!",
    x: "https://x.com/sargampoudel",
    github: "https://github.com/devsargam",
    rating: 4,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="w-full min-h-[20rem] h-fit py-20 flex flex-col items-center">
      <div className="flex flex-col items-center w-full gap-4">
        <Badge variant="secondary" className="rounded-sm">
          <ChatCircleDots className="size-5" />
          <span className="text-sm font-light">Testimonials</span>
        </Badge>
        <h1 className="text-4xl lg:text-5xl text-center text-balance md:w-[50%] w-full font-normal">
          What others are saying about ViewChain
        </h1>
        <p className="text-neutral-400 font-light text-balance text-center lg:w-[50%] w-full">
          Discover how ViewChain is helping developers and creators track and
          verify their digital asset engagement.
        </p>
      </div>

      <div className="w-full max-w-6xl mt-20 px-4">
        <div className="relative">
          <div
            className="flex transition-transform overflow-clip duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border-2 bg-accent/30",
                    "hover:bg-background transition-all duration-300"
                  )}
                >
                  <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-5 relative z-10">
                    <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-medium">
                            {testimonial.name}
                          </h3>
                          <p className="text-neutral-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-light text-balance">
                        {testimonial.quote}
                      </p>
                      <div className="flex gap-4">
                        <Link
                          href={testimonial.x}
                          target="_blank"
                          className="hover:text-primary transition-colors"
                        >
                          <XLogo className="size-6" />
                        </Link>
                        <Link
                          href={testimonial.github}
                          target="_blank"
                          className="hover:text-primary transition-colors"
                        >
                          <GithubLogo className="size-6" />
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-primary/20 bg-primary/5 p-8">
                      <p className="text-neutral-400">Project Rating</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-bold text-primary">
                          {testimonial.rating}
                        </span>
                        <Star className="h-8 w-8 fill-primary text-primary" />
                      </div>
                      <p className="text-neutral-400">out of 5</p>
                    </div>
                  </div>

                  <div className="bottom-0 z-[1] right-[-10rem] absolute bg-gradient-to-t ease-in-out group-hover:opacity-100 opacity-0 from-primary blur-[4em] transition-all duration-700 h-[32rem] w-[15rem] rounded-full rotate-[-10deg]"></div>
                  <Particles
                    className="group-hover:opacity-100 opacity-0 absolute inset-0 z-0"
                    quantity={100}
                    ease={80}
                    color={"#3683ff"}
                    refresh
                  />
                  <BorderBeam
                    colorFrom="#3683ff"
                    colorTo="#3683ff"
                    className="group-hover:opacity-100 opacity-0"
                    duration={12}
                    size={200}
                  />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === idx ? "bg-primary w-8" : "bg-accent/60"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
