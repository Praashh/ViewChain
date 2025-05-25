import {
  ShieldCheck,
  Eye,
  ChartBar,
  Folders,
  UserPlus,
  Video,
  Folder,
  Network,
} from "@phosphor-icons/react";
import { CreateCollection, onboarding, upload, analytics } from "./image";
import { Activity } from "lucide-react";

export const features = [
  {
    title: "On-Chain Engagement Tracking",
    description:
      "Each view or listen mints an NFT, turning audience interactions into verifiable on-chain provenance.",
    icon: Activity,
  },
  {
    title: "Decentralized Analytics Dashboard",
    description:
      "Get personalized, verifiable insights into asset performance through a blockchain-based analytics interface.",
    icon: ChartBar,
  },
  {
    title: "zkpTLS-Powered Privacy and Security",
    description:
      "Utilizes zero-knowledge TLS to securely verify data while preserving user privacy.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Asset Interactions",
    description:
      "Makes asset views and interactions publicly transparent while maintaining secure verification.",
    icon: Eye,
  },
  {
    title: "Digital Asset Collections",
    description:
      "Organize your uploaded assets into collections to streamline tracking, engagement, and analytics.",
    icon: Folders,
  },
];

export const steps = [
  {
    icon: UserPlus,
    title: "Signup and finish onboarding",
    description:
      "Create an account to get started and access your personalized dashboard.",
  },
  {
    icon: Folder,
    title: "Create a Collection for your digital assets",
    description: "Create a Collection for your digital assets.",
  },
  {
    icon: Video,
    title: "Upload Asset",
    description:
      "Upload your asstes(images/videos) to get the decentralized engegment count.",
  },
  {
    icon: Network,
    title: "Get Personalized Analytics",
    description: "View or get detailed analytics of your asstes",
  },
];

export const faqs = [
  {
    question: "What is ViewChain?",
    answer:
      "ViewChain is a decentralized platform that turns every view or listen of your digital content into an on-chain NFT, allowing you to track verifiable audience engagement.",
  },
  {
    question: "How does ViewChain track engagement?",
    answer:
      "Each time your image or video is viewed or listened to, ViewChain mints a unique NFT as proof of interaction, creating a transparent and tamper-proof record.",
  },
  {
    question: "Is my data safe on ViewChain?",
    answer:
      "Yes. ViewChain uses zkpTLS (zero-knowledge proof TLS) to securely verify engagement without exposing private or sensitive information.",
  },
  {
    question: "Can I analyze how my content is performing?",
    answer:
      "Absolutely. ViewChain provides a decentralized analytics dashboard with personalized insights into your asset's performance and reach.",
  },
];

export const workingImages = [onboarding, CreateCollection, upload, analytics];

export const team = [
  {
    name: "Praash",
    role: "Software Engineer",
    image: "https://avatars.githubusercontent.com/u/99237795",
    github: "https://github.com/Praashh",
    x: "https://x.com/10Xpraash",
  },
  {
    name: "Yash Makijha",
    role: "Software Engineer",
    image: "https://avatars.githubusercontent.com/u/125460543",
    github: "https://github.com/yashmakhija",
    x: "https://x.com/Yashmakhija12",
  },
  {
    name: "Aman Bairagi",
    role: "Frontend Developer",
    image: "https://avatars.githubusercontent.com/u/118182376",
    github: "https://github.com/amanbairagi3",
    x: "https://x.com/amanbairagi30",
  },
];
