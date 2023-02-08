/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Card from '@/components/Card'
import Cover from '@/components/Cover'
import Icon from '@/components/Icon'
import Layout from '@/components/Layout'
import ProfileNav from '@/components/ProfileNav'
import ProfileRender from '@/components/ProfileRender'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [profile,setProfile]=useState(null)
  const [nick,setNick]=useState('')
  const [place,setPlace]=useState('')
  const [edit,setEdit]=useState(false)
  const session=useSession()
  const sb=useSupabaseClient()

  const router=useRouter();
  const user=router.query.id;
  const userId = user === session?.user?.id
  const nav = router?.query?.nav?.[0] || 'posts'

  useEffect(()=>{
    if(!user){
      return
    }
    fetchUser()    
  },[user])

  const fetchUser=()=>{
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
  }
  const fetchProfile=()=>{
    sb.from('profiles').update({
      name:nick,
      country:place,
    })
    .eq('id',session.user.id)
    .then((res)=>{
      if(!res.error){
        setProfile(prof =>({...prof,nick,place}))
      }
      if(res.error){
        throw error
      }
      fetchUser()
      setEdit(false)
    })
  }
  return (
    <Layout>
        <Card noPadding={true}>
          <div className='relative overflow-hidden rounded-md'>
            <div className='h-44 overflow-hidden flex justify-center relative items-center'>
              <Cover url={profile?.cover} alt="cover" edit={userId} onChange={fetchUser}/>
            </div>
            <div className='absolute top-32 left-2 z-20'>
              <Icon size='big'url={profile?.icon} edit={userId} onChange={fetchUser}/>
            </div>
            <div className='p-4 pb-0 pt-1 md:pt-3'>
              <div className='ml-40 flex sm:justify-between sm:flex-row flex-col gap-2'>
                <div>
                  {!edit && (
                    <>
                    <h1 className='text-3xl font-bold'>{profile?.name}</h1>
                    <div className='text-gray-500 leading-4 ml-0.5'>
                       {profile?.country}
                    </div> 
                    </>
                   ) }
                  {edit && (
                    <>
                    <div className=''>
                      <input className='sm:px-4 mr-3 sm:py-2 border rounded-md border-blue-500' value={nick} type='text' placeholder='Your name'
                       onChange={e => setNick(e.target.value)}/>
                    </div>
                    <div className='text-gray-500 leading-4'>
                      <input className='sm:px-4 sm:py-1 mt-1 border rounded-md border-blue-500' value={place} type='text' placeholder='Your place'
                        onChange={e => setPlace(e.target.value)}/>
                    </div> 
                    </>  
                  )}
                </div>
                <div className='flex gap-1 '>
                  {userId && !edit && (
                    <div>
                    <button onClick={()=>{setEdit(true);setNick(profile?.name);setPlace(profile?.country)}} className='flex items-center cursor-pointer hover:bg-prBlue bg-black rounded-md py-1 px-1 shadow-md shadow-gray-200 gap-1 text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                      Edit profile
                    </button>
                  </div>
                 )}
                 {userId && edit && (
                    <div>
                    <button onClick={fetchProfile} className='flex items-center cursor-pointer hover:bg-prBlue bg-black rounded-md py-1 px-1 shadow-md shadow-gray-200 gap-1 text-white'>
                     <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M3 7.5V5a2 2 0 012-2h11.172a2 2 0 011.414.586l2.828 2.828A2 2 0 0121 7.828V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.5M6 21v-4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                     <path d="M18 21v-7.4a.6.6 0 00-.6-.6H15M16 3v5.4a.6.6 0 01-.6.6h-1.9M8 3v3M1 12h11m0 0L9 9m3 3l-3 3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      Save profile
                    </button>
                  </div>
                 )}
                 {userId && edit && (
                    <div>
                    <button onClick={()=>setEdit(false)} className='flex items-center cursor-pointer hover:bg-prBlue bg-black rounded-md py-1 px-1 shadow-md shadow-gray-200 gap-1 text-white'>
                       Cancel
                    </button>
                  </div>
                 )}
                </div>
                         
              </div>
               <ProfileNav userId={user}nav={nav}/>
            </div>
          </div>
        </Card>
       <ProfileRender nav={nav} userID={user}/>
      
    </Layout>
  )
}

export default ProfilePage