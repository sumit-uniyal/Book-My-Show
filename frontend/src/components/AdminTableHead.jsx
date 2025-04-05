import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminTableHead = (props) => {
    const {active} = props

    const navigate = useNavigate()

    const booking_list = ()=>{
        navigate('/booking-list/')
    }

    const add_movie = ()=>{
        navigate('/add-movie')
    }
    const movie_list = ()=>{
        navigate('/admin')
    }

  return (
    <>
        <button onClick={()=>add_movie()} className={`uppercase ${active === 'add-movie' ? 'bg-green-700' : 'bg-green-400'} bg-green-400 text-white px-4 py-2 rounded-2xl text-sm m-2 `}>Add Movie</button>
        <button onClick={()=>movie_list()} className={`uppercase ${active === 'movie' ? 'bg-green-700' : 'bg-green-400' }  text-white px-4 py-2 rounded-2xl text-sm m-2`}>Movie List</button>
        <button onClick={()=>booking_list()} className={`uppercase ${active === 'booking' ? 'bg-green-700' : 'bg-green-400' } text-white px-4 py-2 rounded-2xl text-sm m-2 `}>Booking List</button>
    </>
  )
}

export default AdminTableHead