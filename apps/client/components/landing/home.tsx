import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"
import Image from "next/image"
import home1 from "@/public/logoIE.png"
import home2 from "@/public/hello.gif"
import { RoomForm } from "./room-generator"
import Navbar from "../ui/main-nav"

export default function Home() {

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar/>
      <main className="flex-1">
        <section className="bg-gray-900 text-white py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Battle it out in the tech arena
              </h1>
              <p className="text-gray-400 max-w-[600px]">
                Compete in coding challenges, showcase your skills, and climb the leaderboard to become the ultimate
                tech champion.
              </p>
              <RoomForm />
            
            </div>
            <div className="hidden lg:block">
              <Image
                alt="Tech Battles"
                className="rounded-lg"
                height="400"
                src={home1}
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width="600"
              />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <BoldIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Coding Challenges</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Tackle a variety of coding challenges and showcase your programming skills.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <TrophyIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Leaderboard</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Climb the leaderboard and become the ultimate tech champion.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <UsersIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Connect with like-minded tech enthusiasts and collaborate on projects.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                alt="Tech Battles"
                className="rounded-lg"
                height="400"
                src={home2}
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width="600"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Compete and Climb the Leaderboard
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-[600px]">
                Participate in coding challenges, earn points, and rise to the top of the leaderboard to become the
                ultimate tech champion.
              </p>
              <div className="flex gap-4">
                <Button variant="default">Join Now</Button>
                <Button variant="ghost">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">© 2024 Tech Battles. All rights reserved.</p>
          <nav className="flex gap-4 md:gap-6 text-sm">
            <Link className="hover:underline" href="#">
              Privacy
            </Link>
            <Link className="hover:underline" href="#">
              Terms
            </Link>
            <Link className="hover:underline" href="#">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function BoldIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 12a4 4 0 0 0 0-8H6v8" />
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
    </svg>
  )
}


function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function TrophyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
