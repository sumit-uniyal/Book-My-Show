import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    // const {id} = useParams()
    
  return (
    <div className='container bg-gray-300 mx-auto mt-5 mb-4 p-5'>
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 items-center '>
                <div className="flex justify-center sm:block">
                    <img className='w-[70%] h-auto rounded-2xl'  src='/caption-america.jpeg' />
                </div>

                <div className='col-span-1 text-center sm:text-left'>
                    <h2 className='font-medium text-2xl'>Caption America</h2>
                    <p>Release Date: 02-02-2025</p>
                    <button className='uppercase mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold'>Book Now</button>
                </div>
            </div>
        </div>
        <div className='my-10'>
            <h2 className='font-bold text-2xl pl-2'>About the movie</h2>
            <p className='tracking-[0.5px] border-1 p-2 mt-2 rounded-2xl'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </div>
    </div>
  )
}

export default MovieDetails