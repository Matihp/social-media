import React from 'react'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'

const BookmarkPage = () => {
  return (
    <Layout>
      <h1 className='mb-5 text-5xl text-gray-400' >Saved posts</h1>
        <PostCard/>
    </Layout>
  )
}

export default BookmarkPage