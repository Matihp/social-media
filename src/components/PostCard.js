import React from 'react'
import Card from './Card'
import Icon from './Icon'

const PostCard = () => {
  return (
    <Card>
            <div className='flex gap-3'>
              <div>
                <Icon/>
              </div>
              <div>
                <p><a className='font-semibold' href="">Matias Contreras</a> shared a <a className='text-prBlue' href="">post</a> </p>
                <p className='text-gray-500 text-sm'>5 hours ago</p>
              </div>
            </div>
            
    </Card>
  )
}

export default PostCard