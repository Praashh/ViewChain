'use client'
import { useParams } from 'next/navigation'
 
export default function Page() {
  const router = useParams()
  console.log(router)
  return <p className='text-white'>Post: {router.id}</p>
}