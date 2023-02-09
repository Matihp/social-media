import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'

const BookmarkPage = () => {
  const sb=useSupabaseClient()
  const session=useSession()
  const [post,setPost]=useState([])

  useEffect(()=>{
    if(!session?.user?.id){
      return
    }
    savedPost()
  },[])

  function savedPost(){
      sb.from('bookmark').select('post_id')
      .eq('user_id',session.user.id)
      .then((res)=>{
        const posts=res.data.map(i => i.post_id)
        sb.from('posts').select('*,profiles(*)')
        .in('id',posts)
        .then(res => setPost(res.data))
      })
    }

  return (
    <Layout>
      <h1 className='mb-5 text-5xl text-gray-400' >Saved posts</h1>
      {post.length > 0 && post.map(posts=>(
        <div key={posts.id}>
          <PostCard {...posts}/> 
        </div>
        
      )) }
    </Layout>
  )
}

export default BookmarkPage