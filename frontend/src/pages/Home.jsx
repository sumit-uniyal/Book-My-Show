import React from 'react'
import MovieCard from '../components/MovieCard'

const Home = () => {
  return (
    <div className='container mx-auto h-full mt-20'>
        <h1 className='font-medium text-3xl'>Recommended Movies</h1>
        <MovieCard></MovieCard>
    </div>
  )
}

export default Home