import React, { useEffect, useState } from 'react'
import { WarningToast, SuccessToast, ErrorToast } from './Toaster'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { Login } from '../store/slice/AuthSlice'

const LoginModal = (props) => {

    const dispatch = useDispatch()

    const {setIsOpen} = props
    const [formVal, setFormVal] = useState({
        email:"",
        password:""
    })
   

    const loginSubmitHandler = (e)=>{
        e.preventDefault();
        if(!formVal.email || !formVal.password){
            WarningToast('Please enter email and password')
        }else{
            login()
        }
    }

    const login = async ()=>{
        try {
            const base_url = import.meta.env.VITE_BASE_URL
            const final_url = base_url+ '/auth/user/login'
            const payload = {
                email:formVal.email,
                password:formVal.password
            }
            const result = await axios.post(final_url,payload)
            
            dispatch(Login({
                token:result.data.token,
                isAdmin:result.data.user.isAdmin,
                email:result.data.user.email
            }))

            setIsOpen(false)
            SuccessToast('Login Successfully')
        } catch (error) {
            if (error.response) {
                ErrorToast(error.response.data.msg || "Login failed!");
            } else if (error.request) {
                ErrorToast("No response from server!");
            } else {
                ErrorToast("Something went wrong!");
            }
        }
    }
    const changeInputHandler = (e)=>{
        const {name, value} = e.target
        setFormVal({...formVal, [name]:value})
    }
  return (
    <>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-[72%] sm:min-h-full items-end justify-center p-4 sm:text-center sm:items-center sm:p-0">
                    <form onSubmit={loginSubmitHandler} autoComplete="off">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-base font-semibold text-gray-900 uppercase" id="modal-title">Log In </h3>
                                        <div className="mt-2">
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                                                        <div className="mt-2">
                                                            <input onChange={changeInputHandler} value={formVal.email} type="email" name="email" id="email" autoComplete="off" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='Enter email' />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-3">
                                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                                        <div className="mt-2">
                                                            <input onChange={changeInputHandler} value={formVal.password} type="password" name="password" id="password" autoComplete="family-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder='Enter password' />
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 p-5 flex justify-between">
                                <button onClick={()=>setIsOpen(false)} className="px-4 py-2 w-full bg-gray-200 rounded mr-2">Cancel </button>
                                <button type='submit' className="px-4 py-2 w-full bg-red-600 text-white rounded">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

  )
}

export default LoginModal