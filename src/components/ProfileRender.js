/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import Friend from './Friend';
import PostCard from './PostCard';

const ProfileRender = ({nav,userID}) => {

  const sb=useSupabaseClient()
  const [profile,setProfile]=useState(null)
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    if(!userID){
      return
    }
    if(nav === 'posts'){
      load()
    }
  },[userID,nav])
  async function load(){
    const posts=await fetchPosts(userID)
    const profiles=await fetchProfile(userID)
    setPosts(posts)
    setProfile(profiles)
  }
  async function fetchPosts(userID){
    const {data}=await sb.from('posts')
    .select('id,author,created_at,content')
    .eq('author',userID)
    return data
  }
  async function fetchProfile(userID){
    const {data}=await sb.from('profiles')
    .select()
    .eq('id',userID)
    return data?.[0]
  }

  return (
    <>
    {nav === 'posts' && (
      posts?.map((posts)=>(
        <PostCard {...posts} key={posts.id} profiles={profile} />
      ))
    )}
    {nav === 'about' && (
        <Card>
          <h1 className='font-bold text-3xl mb-2'>About</h1>
          <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, ad earum consectetur neque iusto. Commodi nam illo voluptatum fugit repellat similique reprehenderit vitae ab praesentium! Atque rerum ea expedita.</p>
          <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, ad earum consectetur neque iusto. Commodi nam illo voluptatum fugit repellat similique reprehenderit vitae ab praesentium! Atque rerum ea expedita.</p>
          <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, ad earum consectetur neque iusto. Commodi nam illo voluptatum fugit repellat similique reprehenderit vitae ab praesentium! Atque rerum ea expedita.</p>
        </Card>
      )}
      {nav === 'photos' &&(
        <Card>
          <div className="grid md:grid-cols-2 gap-2 mx-auto">
            <div className="h-40 flex overflow-hidden items-center rounded">
              <img src="https://a.cdn-hotels.com/gdcs/production144/d1579/2e0afb81-72eb-4e20-8853-3c98c7643135.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="" />
            </div>
            <div className="h-40 flex overflow-hidden items-center rounded">
                <img src="https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/EJ4Y4ODTOFDOVJXKP4RLBRBUUI.jpg"
                    alt="image"/>
            </div>
            <div className="h-40 flex overflow-hidden items-center rounded">
                <img src="https://a.cdn-hotels.com/gdcs/production71/d1985/8de33f47-4f16-4929-a0e7-627a5d532ef4.jpg"
                    alt="image"/>
            </div>
            <div className="h-40 flex overflow-hidden items-center rounded">
                <img src="https://www.viajarjamaica.com/img/mejores-playas-jamaica.jpg"
                    alt="image"/>
            </div>
            <div className="h-40 flex overflow-hidden items-center rounded">
                <img src="https://st1.uvnimg.com/03/9e/89a933da4ea3aca7de21a9e674f7/20.%20Nungwi%20Beach%20copy.jpg"
                    alt="image"/>
            </div>
            <div className="h-40 flex overflow-hidden items-center rounded">
                <img src="https://dib.com.ar/wp-content/uploads/2022/03/varadero.jpg"
                    alt="image"/>
            </div>
          </div>
        </Card>
      )}
      {nav === 'friends' && (
        <Card>
          <h1 className='font-bold text-3xl mb-2'>Friends</h1>
          <div className='gap-3 '>

          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          <div className='border-b border-b-gray-200 p-4 -mx-4'>
              <Friend/>  
          </div>
          
          </div>
        </Card>
      )}
      </>
  )
  
}

export default ProfileRender