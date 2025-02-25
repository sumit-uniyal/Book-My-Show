import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

const BookNow = () => {
  const {id} = useParams()
  const [mData, setMdata] = useState([])
  const location = useLocation();

  const {seat} = location.state

  const fetchMovieByData = async()=>{
      try {
          const url_data = '/show/get/movies/'
          const Base_URL = import.meta.env.VITE_BASE_URL
          const final_url = (`${Base_URL}${url_data}`)
          const result = await axios.get(final_url,{
              params:{id:id},
          })
          setMdata(result.data.data[0])
      } catch (error) {
          console.log('Error in Fetching data')
      }
  }
  useEffect(()=>{
          fetchMovieByData();
      },[])
  return (
    <div className='container bg-gray-300 mx-auto mt-5 mb-4 p-5'>
    <div>
        <div className='grid grid-cols-1 sm:grid-cols-3 items-center '>
            <div className="flex justify-center sm:block">
                <img className='w-[70%] h-auto rounded-2xl'  src={mData.image} />
            </div>

            <div className='col-span-1 text-center sm:text-lef'>
              <div className='bg-white'>
                <h2 className='text-2xl uppercase text-center text-red-500 tracking-wide pt-10 pb-4 border-b-2 border-dotted'>Booking summary</h2>
                <div className='p-5'>
                  <h2 className='font-medium text-xl'>{mData.title}</h2>

                  <div className='mt-10'>
                    <p className="mt-4 font-medium flex justify-between">
                      <span>Seats:</span> 
                      <span>{seat}</span>
                    </p>
                    <p className="mt-4 font-medium flex justify-between">
                      <span>Sub Total:</span> 
                      <span>-</span>
                    </p>
                    <p className="mt-4 font-medium flex justify-between">
                      <span>Discount:</span> 
                      <span>Rs. 0</span>
                    </p>
                    <div className='p-4 mt-3 rounded-2xl bg-gray-200'>
                    Seamless bookings made easy – reserve your spot in seconds!
                    </div>
                  </div>
                </div>
                <p className="bg-amber-100 p-4 mt-4 font-medium flex justify-between">
                  <span>Amount Payable:</span> 
                  <span>Rs. 500</span>
                </p>

              </div>
                <p className='text-sm p-4'>By proceeding, I express my consent to complete this transaction.</p>
                <button className='w-full uppercase text-center mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold'>
                  Book Now
                </button>
            </div>

        </div>
    </div>
</div>
  )
}

export default BookNow