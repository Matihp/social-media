import Card from '@/components/Card'
import Icon from '@/components/Icon'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import React from 'react'

const NotificationsPage = () => {
  return (
    <Layout>
      <h1 className='mb-5 text-5xl text-gray-400' >Notifications</h1>
      <Card>
        <div className='-mx-5'>
            <div className='gap-3 flex items-center p-4 border-b border-b-gray-100'>
                <Link href={'/profile'}>
                  <Icon/>
                </Link>
                <div>
                    <Link className={'font-semibold mr-1'} href={'/'}>Tom Hanks</Link>liked
                    <Link className={'text-prBlue ml-1 font-semibold hover:underline'} href={'/'}>your post</Link>                 
                </div>
           </div>  
        </div>
        <div className='-mx-5'>
            <div className='gap-3 flex items-center p-4 border-b border-b-gray-100'>
                <Link href={'/profile'}>
                  <Icon/>
                </Link>
                <div>
                    <Link className={'font-semibold mr-1'} href={'/'}>Tom Hanks</Link>liked
                    <Link className={'text-prBlue ml-1 font-semibold hover:underline'} href={'/'}>your post</Link>                 
                </div>
           </div>  
        </div>
        <div className='-mx-5'>
            <div className='gap-3 flex items-center p-4 border-b border-b-gray-100'>
                <Link href={'/profile'}>
                  <Icon/>
                </Link>
                <div>
                    <Link className={'font-semibold mr-1'} href={'/'}>Tom Hanks</Link>liked
                    <Link className={'text-prBlue ml-1 font-semibold hover:underline'} href={'/'}>your post</Link>                 
                </div>
           </div>  
        </div>
      </Card>
      
    </Layout>
  )
}

export default NotificationsPage