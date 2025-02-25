import React from 'react'
import{createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from './components/UI/AppLayout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import ErrorPage from './pages/ErrorPage'
import BookNow from './components/BookNow'


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
        },{
          path: '*',
          element:<ErrorPage />
        }
      ]
    } 
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App