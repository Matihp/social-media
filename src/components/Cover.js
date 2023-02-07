/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { uploadUserImage } from "@/helpers/user"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { PacmanLoader } from "react-spinners"

const Cover = ({url,edit,onChange}) => {

  const sb=useSupabaseClient()
  const session=useSession()
  const [upload,setUpload]=useState(false)

  async function changeCover(r){
    const file=r.target.files?.[0]
    if(file){
      setUpload(true)
      await uploadUserImage(sb,session.user.id,file,'cover','cover')
      if(onChange){
        onChange()
      }
      setUpload(false)
      
    }
  }
  return (
    <>
      <div>
        <img src={url}/>
      </div>
      {upload && (
        <div className="absolute bg-black bg-opacity-80 inset-0 items-center flex z-10 ">
          <div className="mx-auto ">
            <PacmanLoader color={'green'} speedMultiplier={2}/>
          </div>
        </div>
      )}
      <div className="absolute mr-1 mb-1 bottom-0 right-0">
        <label className="flex items-center cursor-pointer hover:bg-black bg-prBlue rounded-md py-1 px-2 shadow-md shadow-gray-400 gap-2 text-white">
          <input type='file'className="hidden" onChange={changeCover}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          Change image</label>
      </div>
    </>
  )
}

export default Cover