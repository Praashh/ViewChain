import { BoldIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { Button } from './button';

const Navbar = () => {
    const { data: session } = useSession();
  console.log("session ", session)
  return (
    <div>
         <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <BoldIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Tech Battles</span>
        </Link>
        {/* <nav className="hidden lg:flex gap-6">
          <Link className="hover:underline" href="#">
            Challenges
          </Link>
          <Link className="hover:underline" href="#">
            Leaderboard
          </Link>
          <Link className="hover:underline" href="#">
            About
          </Link>
          <Link className="hover:underline" href="#">
            Contact
          </Link>
        </nav> */}
        {
          session ? (
            <Button className="hidden lg:inline-flex" variant="secondary"
            onClick={() => signOut()}
          >
            Logout
          </Button>
          ) : (
            <Button className="hidden lg:inline-flex" variant="secondary"
              onClick={() => signIn("github", { callbackUrl: "/"})}
            >
              Login/Register
            </Button>
          )
        }
      </header>
    </div>
  )
}

export default Navbar
