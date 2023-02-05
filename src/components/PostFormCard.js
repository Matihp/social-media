/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { UserContext } from "@/context/UserContext";
import { useSession } from "@supabase/auth-helpers-react"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext, useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import PacmanLoader from "react-spinners/PacmanLoader";
import Card from "./Card"
import Icon from "./Icon"

const PostFormCard = ({onPost}) => {

    const supabase = useSupabaseClient()
    const session= useSession()

    const [up,setUp]=useState(false)
    const [upload,setUpload]=useState([])
    const [info,setInfo]=useState('')
    const {profile}=useContext(UserContext)

    if(!profile){
        return 'Loading...'
    }

    const createPost=()=>{
        supabase.from('posts')
        .insert({
            author: session.user.id,
            content: info,
            photos:upload,
        }).then(response=>{
            if(!response.error){
                setInfo('')
                setUpload([])
                if(onPost){
                    onPost()
                }
            }
        })
    }
    async function addImages(r){
        const files = r.target.files
        if(files.length>0){
            setUp(true)
            for (const f of files) {
                const names=Date.now()+ f.name
                const res= await supabase.storage.from('images').upload(names,f)
                    if(res.data){
                        const url= process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/images/'+ res.data.path
                        setUpload(allUploads=>[...allUploads,url])
                    }else{
                        console.log(res)
                    }  
            }    
         setUp(false)    
        }
        
    }

  return (
    <Card>
        <div className="flex gap-2">
            <div>
                <Icon url={profile.icon}/>
            </div>
            <textarea onChange={e=> setInfo(e.target.value)} className="grow p-3 h-14" placeholder={`Whats on your mind, ${profile.name}?`} value={info}/>
        </div>
        {up && (
            <div className="justify-center flex">
                <PacmanLoader color={'green'} speedMultiplier={2} size={20}/>
            </div>
        )}
        {upload.length > 0 && (
            <div className="flex gap-3">
                {upload.map(upl=>(
                     <div>
                        <img src={upl}  alt='photo'className="rounded-md h-20 mt-2" />
                    </div>
                    )
                )
                }
            </div>
        )}
        <div className="flex items-center gap-4 mt-2">
            <div>
                <button className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="hidden md:block">People</span>
                </button>
            </div>
            <div>
                <button className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="hidden md:block">Check in</span>
                </button>
            </div>
            <div>
                <button className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                    <span className="hidden md:block">Mood</span>
                </button>
            </div>
            <div>
                <label className="flex gap-1">
                    <input type='file' className='hidden' onChange={addImages} multiple />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span className="hidden md:block">Photos</span>
                </label>
            </div>
            <div className="grow text-right">
                <button onClick={createPost} className="bg-prBlue text-white rounded-md py-1 px-6">
                    Share
                </button>
            </div>
        </div>        
    </Card>
  )
}

export default PostFormCard