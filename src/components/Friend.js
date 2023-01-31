import React from 'react'
import Icon from './Icon'

const Friend = () => {
  return (
    <div className='flex gap-2'>
      <Icon/>
         <div>
            <p className='font-bold'>Matias Contreras</p>
            <p className='text-sm text-gray-600 leading-5'>8 mutual friends</p>
         </div>
    </div>
  )
}

export default Friend