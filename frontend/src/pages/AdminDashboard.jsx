import React, { useEffect } from 'react'
import { CiEdit } from "react-icons/ci";
import {useSelector,useDispatch} from 'react-redux'
import { apiData } from '../store/slice/MovieSlice';
import AdminTableHead from '../components/AdminTableHead';

const AdminDashboard = () => {
  const dispatch = useDispatch()

  const {movies,status,error} = useSelector(state=>state.movieData)
    
    useEffect(()=>{
      dispatch(apiData())
    },[dispatch])
    const mData = movies.data;
    
  return (
    <>
    <div className="p-6">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
         <AdminTableHead active={'movie'} />
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Movie Name</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Relese Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {mData && mData.map((ele, index) => (
              <tr key={ele._id} >
                <td className="px-6 py-4 border-b">{index}</td>
                <td className="px-6 py-4 border-b">{ele.title}</td>
                <td className="px-6 py-4 border-b">{ele.price} ₹</td>
                <td className="px-6 py-4 border-b">
                    {new Date(ele.releaseDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard