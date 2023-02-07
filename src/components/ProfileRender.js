/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react'
import Card from './Card';
import Friend from './Friend';

const ProfileRender = () => {
  const router=useRouter();
  const {asPath}=router;
  const posts=asPath.includes('posts') || asPath === '/profile'
  const about=asPath.includes('about')
  const friends= asPath.includes('friends')
  const photos= asPath.includes('photos')
  return (
    <>
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
      </>
  )
  
}

export default ProfileRender