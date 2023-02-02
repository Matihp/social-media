/* eslint-disable react-hooks/exhaustive-deps */
import { Inter } from '@next/font/google'
import PostFormCard from '@/components/PostFormCard'
import PostCard from '@/components/PostCard'
import Layout from '@/components/Layout'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LoginPage from './login'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const session=useSession()
  const supabase=useSupabaseClient()
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    selectPost()
  },[])
  if(!session){
    return <LoginPage/>
  }
  function selectPost(){
    supabase.from('posts')
    .select('id,content,created_at,profiles(id,icon,name)')
    .order('created_at',{ascending:false})
    .then(result=>{
      setPosts(result.data)
    })
  }
  return (
    <Layout>
      <PostFormCard onPost={selectPost}/>
      {posts.map(post =>( 
      <PostCard {...post} key={post.id}/>)
      )}
      
    </Layout>
  )
}
