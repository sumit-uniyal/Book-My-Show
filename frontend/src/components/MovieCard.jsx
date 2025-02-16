import { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

const MovieCard = () => {
    const [movieData, setMovieData] = useState('');

    const getMovieData =async()=>{
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const URL = `${BASE_URL}/show/get/movies`;
            
            const data = await axios.get(URL)
            setMovieData(data.data.data)
        } catch (error) {
            console.log('Error in getting movie data '+error)
        }
    }
    useEffect(()=>{
        getMovieData()
    },[])
    
    if(movieData){
        return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center py-10 px-4'>

            {movieData.map((ele,index)=>{
                    return(
                        <div key={index} className=' rounded-2xl overflow-hidden'>
                            <NavLink to='/movie'>
                            <img className='w-[100%] h-[350px] sm:h-[450px]' src={ele.image} />
                            <div className='bg-neutral-100 px-4 py-4 font-bold'>
                                {ele.title}
                            </div>
                            </NavLink>     
                        </div>
                    )
                })}

            </div>
        </>
        )
    }else{
        return(
            <div>Loading..</div>
        )
    }
}

export default MovieCard