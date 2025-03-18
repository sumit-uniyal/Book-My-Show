import React from 'react'

const BookingList = () => {
    
  return (
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
      {/* {mData && mData.map((ele, index) => ( */}
        <tr  >
          <td className="px-6 py-4 border-b">h</td>
          <td className="px-6 py-4 border-b">h</td>
          <td className="px-6 py-4 border-b">h ₹</td>
          <td className="px-6 py-4 border-b">
              hh
          </td>
        </tr>
      {/* ))} */}
    </tbody>
  </table>
  )
}

export default BookingList