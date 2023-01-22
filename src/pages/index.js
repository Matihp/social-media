import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Card from '@/components/Card'
import NavigationCard from '@/components/NavigationCard'
import PostFormCard from '@/components/PostFormCard'
import Icon from '@/components/Icon'
import PostCard from '@/components/PostCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='flex max-w-4xl mt-4 mx-auto gap-6'>
        <div className='w-1/3'>
          <NavigationCard/>
        </div>
        <div className='grow'>
          <PostFormCard/>
          <PostCard/>
        </div>
      </div>
    </>
  )
}
