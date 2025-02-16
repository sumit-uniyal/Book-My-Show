import React from 'react'
import{createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from './components/UI/AppLayout'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'


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
          path:'/movie',
          element:<MovieDetails />
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