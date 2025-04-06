import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'

const BookingModal = (props) => {
    const {id, setIsOpen} = props
    const [seatData, setSeatData] = useState('')
    const navigate = useNavigate()

    const notify = () => toast.warn('Please select the date and seat', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    

    const submitBookingHandler = (e)=>{
        e.preventDefault();

        if(!seatData.seat || !seatData.date){
            notify()
        }else{
            navigate(`/book-now/${id}`, {
                state:{seat:seatData.seat,date:seatData.date}
            })
        }
    }

    const dataChangeHandler = (e)=>{
        const {name, value} =e.target
        setSeatData({...seatData, [name]:value})
    }
    const closePopup =()=>{
        setIsOpen(false)
    }

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-10">
        <div className="relative bg-white p-6 rounded-lg shadow-xl w-[90%] sm:w-[50%]">
            <form onSubmit={submitBookingHandler}>
                <div className="flex items-start">
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Book Ticket</h3>
                    <p className="text-sm text-gray-500 mt-2">
                    Please select the seat and proceed with the booking.
                    </p>
                </div>
                </div>
                <label htmlFor="date" className="block text-sm/6 font-medium mt-4 text-gray-900">Date:</label>
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input onChange={dataChangeHandler} type="date" name="date" id="date" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                </div>
                <label htmlFor="seat" className="block text-sm/6 font-medium mt-4 text-gray-900">Seat:</label>
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input onChange={dataChangeHandler} type="number" name="seat" id="seat" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Select Seat" />
                </div>
                <div className="mt-4 flex justify-between">
                <button className="px-4 py-2 w-full bg-gray-200 rounded mr-2" type='button' onClick={()=>closePopup()}>Cancel </button>
                <button className="px-4 py-2 w-full bg-red-600 text-white rounded" type='submit'>Book Now</button>
                    <ToastContainer />

                </div>
            </form>
        </div>
    </div>
  )
}

export default BookingModal