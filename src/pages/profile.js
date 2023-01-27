import Card from '@/components/Card'
import Icon from '@/components/Icon'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import React from 'react'

const ProfilePage = () => {
  return (
    <Layout>
        <Card noPadding={true}>
          <div className='relative overflow-hidden rounded-md'>
            <div className='h-44 overflow-hidden flex justify-center items-center'>
              <img src="https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZXBlcm96LnJjcy1yZHMucm8l/MkZzdG9yYWdlJTJGMjAyMSUyRjAyJTJG/MTElMkYxMjg2OTQxXzEyODY5NDFfc2h1/dHRlcnN0b2NrXzE4OTA5MDkwMzEuanBn/Jnc9ODAwJmhhc2g9NmYwNzUzOWM1NjI3MjNjZDM5ZWEyMjQzYzA2Nzk0MTQ=.thumb.jpg" alt="" />
            </div>
            <div className='absolute top-32 left-2'>
              <Icon size='big'/>
            </div>
            <div className='p-4'>
              <div className='ml-40'>
                <h1 className='text-3xl font-bold'>
                  Matias Contreras
                </h1>
                <div className='text-gray-500 leading-4 ml-0.5'>
                  Rosario,Argentina
                </div>
              </div>
              <div className='flex mt-6 gap-0 '>
                <Link href={'/'} className='flex gap-1 items-center px-3 py-1 border-prBlue text-prBlue border-b-4'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                 </svg>
                  Posts
                </Link>
                <Link href={'/'} className='flex gap-1 items-center px-3 py-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  About
                </Link>
                <Link href={'/'} className='flex gap-1 items-center px-3 py-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  Friends
                </Link>
                <Link href={'/'} className='flex gap-1 items-center px-3 py-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Photos
                </Link>
              </div>
            </div>
          </div>
        </Card>
        <PostCard/>
    </Layout>
  )
}

export default ProfilePage