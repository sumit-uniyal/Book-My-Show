import React from 'react'
import {NavLink} from 'react-router-dom'

const MovieCard = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center py-10 px-4'>
        <div className=' rounded-2xl overflow-hidden'>
            <NavLink to='/movie'>
            <img className='w-[100%] h-[350px] sm:h-[450px]' src='caption-america.jpeg' />
            <div className='bg-neutral-100 px-4 py-4 font-bold'>
                Name : Caption America
            </div>
            </NavLink>     
        </div>
    </div>
  )
}

export default MovieCard