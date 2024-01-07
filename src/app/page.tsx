import Image from 'next/image'
import { Inter } from 'next/font/google'
import { db } from '@/libs/db'
import Button from '@/components/ui/Button'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  // await db.set('hello', 'hello')
  return (
    <Button>Hello</Button>
  )
}