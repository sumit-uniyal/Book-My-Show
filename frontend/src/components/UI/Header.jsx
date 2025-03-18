import logo from '/logo.png'
import LoginModal from '../LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slice/AuthSlice'
import { popup } from '../../store/slice/LoginPopupSlice'
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const {isAuthenticated,isAdmin} = useSelector(state => state.auth)
  const {isopen} = useSelector (state=> state.loginPopup)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <div className='bg-slate-200 h-20 w-full'>  
          <div className='flex justify-between px-10 sm:px-40 py-4'>
            <div className='flex items-center'>
              <img src={logo} className='w-30 sm:w-40 h-auto' />
            </div>

            <div className='flex items-center'>
              {isAuthenticated ? (
                <>{ isAdmin && (
                  <button onClick={()=>navigate('/admin')} className='uppercase bg-red-800 text-white px-4 py-2 mr-3 rounded-2xl text-sm'>Admin-Dashboard</button>
                )}
                  <button onClick={()=>dispatch(logout())} className='uppercase bg-red-500 text-white px-4 py-2 rounded-2xl text-sm'>Log Out</button>
                </>
              ):(
                <button onClick={()=>dispatch(popup())} className='uppercase bg-red-500 text-white px-4 py-2 rounded-2xl text-sm'>Log in</button>
              )}
            </div>
          </div>
      </div>
      {isopen &&(
        <LoginModal />
      )}
    </>
  )
}

export default Header