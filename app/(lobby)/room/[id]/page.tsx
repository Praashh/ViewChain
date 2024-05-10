'use client'
import { useParams } from 'next/navigation'
 
export default function Page() {
  const router = useParams()
  console.log(router)
  return (
    <>
      ID:{router.id}
    </>
  )
}