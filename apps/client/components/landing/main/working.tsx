"use client";
import { Badge } from "@/components/ui/badge";
import { steps, workingImages } from "@/constants/data";
import { Gear } from "@phosphor-icons/react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Working = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col mb-10 gap-4">
      <div className="flex flex-col items-center w-full gap-4">
        <Badge variant="secondary" className="rounded-sm">
          <Gear className="size-5" />
          <span className="text-sm font-light">How it works</span>
        </Badge>
        <h1 className="text-4xl lg:text-5xl text-center text-balance md:w-[50%] w-full font-normal">
          Get Started in Four Simple Steps
        </h1>
        <p className="text-neutral-400 font-light text-balance text-center lg:w-[50%] w-full">
          Track and prove your digital asset engagement on the blockchain. Turn
          every view into a verifiable, on-chain event with zero-knowledge
          privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-4">
        <div className="bg-accent/30 h-[35rem] max-h-fit flex flex-col gap-4 p-4 border w-full rounded-lg">
          {steps.map((step, index) => (
            <motion.div
              className={`border-2 rounded-xl flex flex-col justify-center p-4 flex-1 bg-accent/60 ${
                activeStep === index
                  ? "ring-2 ring-primary"
                  : "border-transparent justify-center"
              }`}
              key={step.title}
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: activeStep === index ? 1 : 0.5,
                scale: activeStep === index ? 1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "flex gap-4 h-full",
                  activeStep === index ? "items-start" : "items-center"
                )}
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary">
                  <step.icon className="size-5" />
                </div>
                <div className="flex flex-col justify-center gap-2 min-h-[4rem]">
                  <h1 className="text-xl font-medium">{step.title}</h1>
                  <AnimatePresence mode="wait">
                    {activeStep === index && (
                      <motion.p
                        className="text-neutral-400 w-full font-light "
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="bg-accent/30 border h-full flex items-center justify-center w-full rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={workingImages[activeStep]}
                alt={`Step ${activeStep + 1}`}
                width={640}
                height={480}
                className="w-[40rem] object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
