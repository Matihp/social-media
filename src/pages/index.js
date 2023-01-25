import { Inter } from '@next/font/google'
import PostFormCard from '@/components/PostFormCard'
import PostCard from '@/components/PostCard'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <PostFormCard/>
      <PostCard/>
    </Layout>
  )
}
