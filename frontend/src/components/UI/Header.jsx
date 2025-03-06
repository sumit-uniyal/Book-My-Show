import React, { useState } from 'react'
import logo from '/logo.png'
import LoginModal from '../LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slice/AuthSlice'

const Header = () => {
  const {isAuthenticated} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isopen, setIsOpen] = useState(false)

  return (
    <>
      <div className='bg-slate-200 h-20 w-full'>  
          <div className='flex justify-between px-10 sm:px-40 py-4'>
            <div className='flex items-center'>
              <img src={logo} className='w-30 sm:w-40 h-auto' />
            </div>

            <div className='flex items-center'>
              {isAuthenticated ? (
                <button onClick={()=>dispatch(logout())} className='uppercase bg-red-500 text-white px-4 py-2 rounded-2xl text-sm'>Log Out</button>
              ):(
                <button onClick={()=>setIsOpen(!isopen)} className='uppercase bg-red-500 text-white px-4 py-2 rounded-2xl text-sm'>Log in</button>
              )}
            </div>
          </div>
      </div>
      {isopen &&(
        <LoginModal setIsOpen={setIsOpen} />
      )}
    </>
  )
}

export default Header