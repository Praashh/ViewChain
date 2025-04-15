'use client';

import {
  Building,
  ChartNetwork,
  FileText,
  FolderIcon,
  GitPullRequest,
  Share,
  Share2,
  Upload,
  UserCheck,
  UserPlus,
  VideoIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const TimelineCard = ({ step, index, inView }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 0 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* Timeline dot with ping animation */}
      <div className="absolute left-4 z-10 -translate-x-1/2 transform md:left-1/2">
        <div className="h-4 w-4 rounded-full bg-blue-500" />
        <div className="absolute left-0 top-0 h-4 w-4 animate-ping rounded-full bg-blue-500 opacity-20" />
      </div>

      {/* Content */}
      <div
        className={`ml-12 md:ml-0 ${
          index % 2 === 0
            ? 'md:mr-auto md:w-[calc(50%-2rem)] md:pr-16'
            : 'md:ml-auto md:w-[calc(50%-2rem)] md:pl-16'
        } w-[calc(100%-3rem)]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-white/50 to-gray-50/30 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 dark:border-gray-800 dark:from-gray-900/50 dark:to-black/30">
          {/* Background gradient effect */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 dark:from-yellow-500/10"
            style={{ opacity: isHovered ? 1 : 0 }}
          />

          {/* Icon with gradient background */}
          <div className="relative mb-4 flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-yellow-blue/50 opacity-10 dark:from-blue-500 dark:to-blue-700/50 dark:opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                {step.icon}
              </div>
              {/* Number indicator */}
              <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <span className="font-secondary text-base font-bold text-white">
                  {index + 1}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-secondary text-xl font-semibold text-gray-900 dark:text-white/90">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-400/10 blur-2xl dark:bg-blue-500/10" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl dark:bg-blue-700/5" />
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8 text-blue-500" />,
      title: 'Signup and finish onboarding',
      description:
        'Create an account to get started and access your personalized dashboard.',
    },
    {
      icon: <VideoIcon className="h-8 w-8 text-blue-500" />,
      title: 'Upload Asset',
      description:
        'Upload your asstes(images/videos) to get the decentralized engegment count.',
    },
    {
      icon: <FolderIcon className="h-8 w-8 text-blue-500" />,
      title: 'Create a Collection for your digital assets',
      description:
        'Create a Collection for your digital assets.',
    },
    {
      icon: <ChartNetwork className="h-8 w-8 text-blue-500" />,
      title: 'Get Personalized Analytics',
      description:
        'View or get detailed analytics of your asstes',
    },
  ];

  return (
    <section className="px-2 py-16 md:py-24" ref={containerRef}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="my-12 text-center md:my-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 font-secondary text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Track and showcase your decentralized analytics to the world.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line with gradient */}
          <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-accent/50 via-primary to-accent/50 md:left-1/2" />

          <div className="relative space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <TimelineCard
                key={index}
                step={step}
                index={index}
                inView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;