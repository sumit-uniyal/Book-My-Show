import React, { useEffect, useState } from 'react'
import { WarningToast, SuccessToast, ErrorToast } from './Toaster'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../store/slice/AuthSlice'
import { popup } from '../store/slice/LoginPopupSlice'
import { useNavigate } from 'react-router-dom'

const LoginModal = () => {
    const dispatch = useDispatch()
    const isopen = useSelector(state => state.loginPopup.isopen)
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)
    const [formVal, setFormVal] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    })

    useEffect(() => {
        if (!isopen) {
            navigate('/login')
        }
    }, [isopen])

    const changeInputHandler = (e) => {
        const { name, value } = e.target
        setFormVal({ ...formVal, [name]: value })
    }

    const toggleForm = () => {
        setIsLogin(prev => !prev)
        setFormVal({ name: "", email: "", password: "", confirmPassword: "" , phone:""})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formVal.email || !formVal.password || (!isLogin && !formVal.name)) {
            WarningToast('Please fill all fields')
            return
        }

        if (!isLogin && formVal.password !== formVal.confirmPassword) {
            WarningToast('Passwords do not match')
            return
        }

        isLogin ? login() : register()
    }

    const login = async () => {
        try {
            const base_url = import.meta.env.VITE_BASE_URL
            const result = await axios.post(`${base_url}/auth/user/login`, {
                email: formVal.email,
                password: formVal.password
            })

            dispatch(Login({
                user_id: result.data.user.user_id,
                token: result.data.token,
                isAdmin: result.data.user.isAdmin,
                email: result.data.user.email
            }))
            dispatch(popup())
            SuccessToast('Login Successful!')
        } catch (error) {
            ErrorToast(error?.response?.data?.msg || "Login failed!")
        }
    }

    const register = async () => {
        try {
            const base_url = import.meta.env.VITE_BASE_URL
            
            const result = await axios.post(`${base_url}/auth/user/register`, {
                name: formVal.name,
                email: formVal.email,
                password: formVal.password,
                phone:formVal.phone
            })
            dispatch(Login({
                user_id: result.data.user.user_id,
                token: result.data.token,
                isAdmin: result.data.user.isAdmin,
                email: result.data.user.email
            }))
            dispatch(popup())
            SuccessToast('Registration Successful!')
            setIsLogin(true)
        } catch (error) {
            ErrorToast(error?.response?.data?.msg || "Registration failed!")
        }
    }

    if (!isopen) return null

    return (
        <div className="fixed inset-0 z-10 bg-black/50 flex justify-center items-center">
            <div className="bg-white w-full max-w-xl rounded-lg shadow-lg overflow-hidden p-6">
                <h3 className="text-xl font-semibold text-gray-900 text-center uppercase">{isLogin ? 'Log In' : 'Register'}</h3>

                <form onSubmit={handleSubmit} autoComplete="off" className="mt-6 space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formVal.name}
                                onChange={changeInputHandler}
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-blue-50"
                                placeholder="Enter name"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formVal.email}
                            onChange={changeInputHandler}
                            className="w-full mt-1 px-3 py-2 border rounded-md bg-blue-50"
                            placeholder="Enter email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formVal.password}
                            onChange={changeInputHandler}
                            className="w-full mt-1 px-3 py-2 border rounded-md bg-blue-50"
                            placeholder="Enter password"
                        />
                    </div>

                    {!isLogin && (
                        <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formVal.confirmPassword}
                                onChange={changeInputHandler}
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-blue-50"
                                placeholder="Confirm password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="number"
                                name="phone"
                                value={formVal.phone}
                                onChange={changeInputHandler}
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-blue-50"
                                placeholder="Phone Number"
                            />
                        </div>
                        </>
                        
                    )}

                    <div className="flex gap-2 mt-4">
                        <button
                            type="button"
                            className="w-full py-2 bg-gray-200 rounded"
                            onClick={() => dispatch(popup())}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full py-2 bg-red-600 text-white rounded"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={toggleForm} className="ml-1 text-blue-600 hover:underline">
                        {isLogin ? 'Register here' : 'Login here'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginModal
