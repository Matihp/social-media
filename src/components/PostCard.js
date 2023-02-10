/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import Icon from './Icon'
import ClickOutHandler from 'react-clickout-handler'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import { UserContext } from '@/context/UserContext'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const PostCard = ({content,photos,profiles,created_at,id,onChange}) => {
  const style='flex gap-3 py-1.5 hover:bg-prBlue hover:scale-110 hover:cursor-pointer hover:text-white hover:shadow-md shadow-gray-300 -mx-5 px-5 rounded-md my-2 transition-all'
  const {profile}=useContext(UserContext)
  const [openMenu,setOpenMenu]=useState(false)
  const [likes,setLikes]=useState([])
  const [comment,setComment]=useState('')
  const [text,setText]=useState([])
  const [saved,setSaved]=useState(false)
  const sb=useSupabaseClient()

  const menuOpen =(e)=>{
    e.stopPropagation()
    setOpenMenu(true)
  }
  const handleClick =(e)=>{
    e.stopPropagation()
    setOpenMenu(false)
  }

  useEffect(()=>{
    fetchLikes()
    fetchComment() 
  },[profiles.id])

  useEffect(()=>{
    fetchBookmark()
  },[saved])
  
  function fetchLikes(){
    sb.from('likes').select()
    .eq('post_id',id)
    .then((res)=>setLikes(res.data))
  }
  function fetchBookmark(){
    sb.from('bookmark').select()
    .eq('post_id',id)
    .eq('user_id',profiles.id)
    .then((res)=>{
      if(res.data.length>0){
        setSaved(true)
      }else{
        setSaved(false)
      }
    })
  }

  const likedByMe=!!likes.find(like=>like.user_id === profiles.id)

  function likePost(){
    if(likedByMe){
      sb.from('likes').delete()
      .eq('user_id',profiles.id)
      .eq('post_id',id)
      .then((res)=>{
        fetchLikes()
      })
      return
    }
    sb.from('likes').insert({
      post_id:id,
      user_id: profiles.id,
    }).then(res=>fetchLikes())
  }
  function commentPost(e){
    e.preventDefault()
    sb.from('posts').insert({
      author:profile.id,
      content:comment,
      point:id,
    }).then(res => {fetchComment(); setComment('')})
  }
  function fetchComment(){
    sb.from('posts').select('*,profiles(*)')
    .eq('point',id)
    .then((res) => setText(res.data))
  }
  function toogleBookmark(){
    if(saved){
      sb.from('bookmark').delete()
      .eq('user_id',profiles.id)
      .eq('post_id',id)
      .then((res)=>{
        setOpenMenu(false)
        setSaved(false)
        onChange()
      })
    }else{
      sb.from('bookmark').insert({
      user_id:profile.id,
      post_id:id,
    }).then((res)=>{
      setSaved(true)
      setOpenMenu(false)
    })
    }
  }

  
  return (
    <Card>
            <div className='flex gap-3'>
              <div>
                <Link href={'/profile/'}>
                <span className='cursor-pointer'><Icon url={profiles?.icon}/></span>
                </Link>          
              </div>
              <div className='grow'>
                <p>
                  <Link href={'/profile/'+ profiles.id}>
                    <span className='font-semibold hover:underline cursor-pointer mr-1' href="">{profiles?.name}</span>
                  </Link>
                   shared a <a className='text-prBlue font-semibold' href="">post</a> </p>
                <p className='text-gray-500 text-sm'><ReactTimeAgo date={(new Date(created_at)).getTime()}/> </p>
              </div>
              <div className='relative'>
                <button onClick={menuOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                </button>
                {openMenu && (
                  <div className='absolute w-5 h-5 top-0 hover:cursor-pointer'></div>
                )}
                <ClickOutHandler onClickOut={handleClick}>
                  <div className='relative'>
                  {openMenu && (
                    <div className='z-10 absolute overflow-hidden -right-6 bg-white shadow-md shadow-gray-300 w-52 border-gray-100 p-3 rounded-sm'>
                      <button className='w-full -my-2'onClick={toogleBookmark}>
                        <span>
                          <a className={style}>      
                              {saved ?(
                                <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                              </svg>
                              <p>Remove post</p></>
                                ) :(<>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                              </svg> 
                                <p>Saved post</p></>)}
                              </a>
                        </span>
                      </button>      
                             <a className={style}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                              </svg>
                              Turn notifications
                              </a>
                             <a  className={style}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                              </svg>
                              Hide post
                              </a>
                              <a className={style}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                Report
                              </a>
                             <a className={style}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              Delete
                              </a>
                               </div>
                       )}
                  </div>
                </ClickOutHandler>
              </div>             
            </div>  
              <div>
                <p className='my-3 text-sm'>{content}</p>

                  {photos?.length>0 &&(
                    <div className='flex gap-3'> 
                      { photos.map(ph=>(
                          <div key={ph}>
                            <img  src={ph}className='rounded-md h-40'></img>
                          </div>                                  
                        ))}
                    </div>
                   )}                                              
              </div>
              <div className='mt-5 flex gap-7 '>
                <button onClick={likePost} className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6" + (likedByMe ? ' fill-red-600' : '')}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {likes?.length}
               </button>
               <button className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
                {text.length}
               </button>
               <button className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                9
               </button>
               
              </div>
              <div className='flex mt-4 gap-3'>
                <div>
                  <Icon url={profiles.icon}/>
                </div>
                <div className='border grow relative rounded-full'>
                  <form onSubmit={commentPost}>
                    <input className=' rounded-full overflow-hidden px-4 p-3 h-12 block w-full'onChange={e=>setComment(e.target.value)} value={comment} placeholder='Leave a coment'/>
                  </form>
                  <button className='text-blue-400 absolute top-3 right-3'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                  </button>
                </div>
                
               </div>
               
               <div>
                  {text.length > 0 && text.map((t) => (
                    <div className='flex items-center mt-2 gap-2 '>
                      <Icon url={t.profiles.icon}/>
                      <div className='px-5 py-2 bg-gray-100 rounded-lg grow'>
                        <div className='flex items-center '>
                          <Link className='block font-semibold hover:underline mr-2' href={`profile/${t.profiles.id}`}>{t.profiles.name}</Link>
                          <ReactTimeAgo className='text-sm mt-0.5 text-gray-600' timeStyle={'twitter'} date={(new Date(t.created_at)).getTime()}/>
                        </div>
                        
                        
                        <p className='text-sm ml-0.5 mt-1'>{t.content}</p>
                      </div>
                      
                    </div>
                  ))}
                </div>
    </Card>
  )
}

export default PostCard