import { faqs } from "@/constants/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Question } from "@phosphor-icons/react";

export const Faq = () => {
  return (
    <div className="w-full py-16 mt-20 flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <Badge variant={"secondary"}>
          <Question className="size-4" />
          <span>FAQ</span>
        </Badge>
        <h1 className="text-4xl lg:text-5xl text-balance text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-neutral-300 text-balance md:w-[60%] w-full sm:text-lg text-base font-light">
          We&apos;ve compiled a list of common questions and answers to help you
          get started with ViewChain. If you have any other questions, please
          don&apos;t hesitate to contact us.
        </p>
      </div>
      <div className="w-full max-w-3xl mt-4 px-4">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-6xl mx-auto space-y-5"
        >
          {faqs.map((faq) => (
            <AccordionItem
              value={faq.question}
              key={faq.question}
              className="rounded-lg border w-full bg-accent/30 px-4"
            >
              <AccordionTrigger className="text-lg font-medium leading-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-300 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
