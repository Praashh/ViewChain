"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
 const path = usePathname();
 console.log("path", path)
  return (
    <div>page</div>
  )
}

export default page