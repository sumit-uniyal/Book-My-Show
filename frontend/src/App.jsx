import React from 'react'
import{createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from './components/UI/AppLayout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import ErrorPage from './pages/ErrorPage'
import BookNow from './components/BookNow'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './pages/AdminDashboard'
import AddMovie from './pages/AddMovie'
import BookingList from './pages/BookingList'

const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLayout></AppLayout>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/movie/:id',
          element:<MovieDetails />
        },
        {
          path:'/book-now/:id',
          element:<BookNow />
        },
        {
          path:'/admin/',
          element:<AdminDashboard />
        },
        {
          path:'/add-movie/',
          element:<AddMovie />
        },,
        {
          path:'/booking-list/',
          element:<BookingList />
        },{
          path: '*',
          element:<ErrorPage />
        }
      ]
    } 
  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App