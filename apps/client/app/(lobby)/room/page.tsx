"use client"
import Navbar from '@/components/ui/main-nav'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
        <Navbar/>
        <div className='text-white h-screen w-full flex justify-center items-center gap-2 flex-col'>
            <h2 className='text-4xl'>OOPs! No Room Found</h2>
            <Link href='/' className='text-blue-400 text-xl hover:underline'>
                Go back to Home
            </Link>
        </div>
    </>
  )
}

export default page
