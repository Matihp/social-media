/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Card from '@/components/Card'
import Friend from '@/components/Friend'
import Icon from '@/components/Icon'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [profile,setProfile]=useState(null)
  const sb=useSupabaseClient()
  const active="flex gap-1 items-center px-3 py-1 border-b-4 text-prBlue font-bold border-prBlue"
  const noActive="flex gap-1 items-center px-3 py-1 border-b-4 border-white"

  const router=useRouter();
  const user=router.query.id;

  useEffect(()=>{
    if(!user){
      return
    }
    sb.from('profiles')
    .select()
    .eq('id',user)
    .then(res=>{
      if(res.data){
      setProfile(res.data[0])
    }
    if(res.error){
      throw res.error
    }
    })
    
  },[user])

  const {asPath}=router;
  const posts=asPath.includes('posts') || asPath === '/profile'
  const about=asPath.includes('about')
  const friends= asPath.includes('friends')
  const photos= asPath.includes('photos')
  const cont=10
  return (
    <Layout>
        <Card noPadding={true}>
          <div className='relative overflow-hidden rounded-md'>
            <div className='h-44 overflow-hidden flex justify-center items-center'>
              <img src={profile?.cover} alt="" />
            </div>
            <div className='absolute top-32 left-2'>
              <Icon size='big'url={profile?.icon}/>
            </div>
            <div className='p-4 pb-0 pt-1 md:pt-3'>
              <div className='ml-40'>
                <h1 className='text-3xl font-bold'>
                  {profile?.name}
                </h1>
                <div className='text-gray-500 leading-4 ml-0.5'>
                  {profile?.country}
                </div>
              </div>
              <div className='flex md:mt-6 mt-3 justify-between sm:justify-start sm:gap-1'>
                <Link href={'/profile/posts'} className={posts ? active : noActive}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                 </svg>
                 <span className="hidden sm:block">Posts</span>
                </Link>
                <Link href={'/profile/about'} className={about ? active : noActive}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <span className="hidden sm:block">About</span>
                </Link>
                <Link href={'/profile/friends'} className={friends ? active : noActive}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  <span className="hidden sm:block">Friends</span>
                </Link>
                <Link href={'/profile/photos'} className={photos ? active : noActive}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className="hidden sm:block">Photos</span>
                </Link>
              </div>
            </div>
          </div>
        </Card>
        
        {about && (
          <Card>
            <h1 className='font-bold text-3xl mb-2'>About</h1>
            <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, ad earum consectetur neque iusto. Commodi nam illo voluptatum fugit repellat similique reprehenderit vitae ab praesentium! Atque rerum ea expedita.</p>
            <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, ad earum consectetur neque iusto. Commodi nam illo voluptatum fugit repellat similique reprehenderit vitae ab praesentium! Atque rerum ea expedita.</p>
            <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab adipisci, ad earum consectetur neque iusto. Commodi nam illo voluptatum fugit repellat similique reprehenderit vitae ab praesentium! Atque rerum ea expedita.</p>
          </Card>
        )}
        {photos &&(
          <Card>
            <div class="grid md:grid-cols-2 gap-2 mx-auto">
    <div class="h-40 flex overflow-hidden items-center rounded">
      <img src="https://a.cdn-hotels.com/gdcs/production144/d1579/2e0afb81-72eb-4e20-8853-3c98c7643135.jpg?impolicy=fcrop&w=800&h=533&q=medium" alt="" />
    </div>
    <div class="h-40 flex overflow-hidden items-center rounded">
        <img src="https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/EJ4Y4ODTOFDOVJXKP4RLBRBUUI.jpg"
            alt="image"/>
    </div>
    <div class="h-40 flex overflow-hidden items-center rounded">
        <img src="https://a.cdn-hotels.com/gdcs/production71/d1985/8de33f47-4f16-4929-a0e7-627a5d532ef4.jpg"
            alt="image"/>
    </div>
    <div class="h-40 flex overflow-hidden items-center rounded">
        <img src="https://www.viajarjamaica.com/img/mejores-playas-jamaica.jpg"
            alt="image"/>
    </div>
    <div class="h-40 flex overflow-hidden items-center rounded">
        <img src="https://st1.uvnimg.com/03/9e/89a933da4ea3aca7de21a9e674f7/20.%20Nungwi%20Beach%20copy.jpg"
            alt="image"/>
    </div>
    <div class="h-40 flex overflow-hidden items-center rounded">
        <img src="https://dib.com.ar/wp-content/uploads/2022/03/varadero.jpg"
            alt="image"/>
    </div>
</div>
          </Card>
        )}
        {friends && (
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
    </Layout>
  )
}

export default ProfilePage