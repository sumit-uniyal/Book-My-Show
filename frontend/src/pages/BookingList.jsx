import React, { useEffect, useState } from 'react'
import AdminTableHead from '../components/AdminTableHead'
import axios from 'axios'

const BookingList = () => {
    const [booking, setBooking] = useState(null)

    const fetchBookingDetail = async()=>{
      try {
        const base_url = import.meta.env.VITE_BASE_URL;
        const URL = base_url+'/show/get/booking'
        const res = await axios.get(URL)
        if(res.status == 200){
          setBooking(res.data.data)
        }
      } catch (error) {
        console.log('Error while getting movie data')
      }
    }

    useEffect(()=>{
      fetchBookingDetail()
    },[])

  return (
    <>
    <div className="p-6">
      <AdminTableHead active={'booking'} />
      <table className="w-full border-collapse">
        
      <thead>
        <tr className="bg-gray-800 text-white text-left">
          <th className="px-6 py-4 font-semibold">Sr.No.</th>
          <th className="px-6 py-4 font-semibold">User Name</th>
          <th className="px-6 py-4 font-semibold">Movie Name</th>
          <th className="px-6 py-4 font-semibold">Price</th>
          <th className="px-6 py-4 font-semibold">Date</th>
        </tr>
      </thead>


      <tbody>
        {booking && booking.map((ele, index) => (
          <tr key={index} >
            <td className="px-6 py-4 border-b">{index}</td>
            <td className="px-6 py-4 border-b">{ele.userDetails.name}</td>
            <td className="px-6 py-4 border-b">{ele.movieDetails.title}</td>
            <td className="px-6 py-4 border-b">₹ {ele.price}</td>
            <td className="px-6 py-4 border-b">{new Date(ele.BookingDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).replace(',', '')}
            </td>
          </tr>
         ))} 
      </tbody>
      </table>
    </div>
    </>
  )
}

export default BookingList