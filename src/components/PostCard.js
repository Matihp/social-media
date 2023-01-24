import React, { useState } from 'react'
import Card from './Card'
import Icon from './Icon'
import ClickOutHandler from 'react-clickout-handler'

const PostCard = () => {
  const [openMenu,setOpenMenu]=useState(false)
  return (
    <Card>
            <div className='flex gap-3'>
              <div>
                <Icon/>
              </div>
              <div className='grow'>
                <p><a className='font-semibold' href="">Matias Contreras</a> shared a <a className='text-prBlue' href="">post</a> </p>
                <p className='text-gray-500 text-sm'>5 hours ago</p>
              </div>
              <div>
                <button onClick={()=>{setOpenMenu(true)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                </button>
                <ClickOutHandler onClickOut={()=>{}}>
                  <div className='relative'>
                  {openMenu && (
                    <div className='absolute -right-6 bg-white shadow-md shadow-gray-300 border-gray-100 p-3 rounded-sm'>
                             menu menu
                               </div>
                       )}
                  </div>
                  
                  
                </ClickOutHandler>
              </div>             
            </div>  
              <div>
                <p className='my-3 text-sm'>Un panqueque es “una tortita que se hace con masa de harina, yemas de huevo batidas y un poco de leche” según la RAE. En simples palabras te puedo decir que es el mejor postre de nuestras vidas.

Su historía nos remonta al año 500, cuando algunas personas se vieron ante la necesidad de encontrar platos variados en época de Cuaresma. En estos momentos previos y de preparación para la Pascua no se permitía consumir algunos alimentos como manteca, huevos, queso o leche.

Las ideas comenzaron a surgir y crearon una pasta a base de harina de trigo y agua que se cocinaba en capas finitas sobre piedras calientes. Pero luego cambiaron las reglas y se permitió el consumo de leche, huevos y manteca, en ese momento añadieron estos ingredientes a la pasta original y comenzó lo bueno.</p>
              <div className='rounded-md overflow-hidden'>
                <img src='https://www.paulinacocina.net/wp-content/uploads/2016/04/vlcsnap-2016-04-27-15h50m49s50-1-1-e1461784576326.jpg'></img>

              </div>
              </div>
              <div className='mt-5 flex gap-7 '>
                <button className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  150
               </button>
               <button className='flex gap-2 items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
                28
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
                  <Icon/>
                </div>
                <div className='border grow relative rounded-full'>
                  <textarea className=' rounded-full overflow-hidden px-4 p-3 h-12 block w-full' placeholder='Leave a coment'></textarea>
                  <button className='text-blue-400 absolute top-3 right-3'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>

                  </button>
                </div>
               </div>
    </Card>
  )
}

export default PostCard