import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { Link } from 'react-router-dom'

const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const { data } = await axios.post(
                backendUrl + '/api/admin/login',
                { email, password }
            )

            if (data.success) {

                localStorage.setItem('aToken', data.token)
                localStorage.setItem('role', 'admin');
                setAToken(data.token)

                navigate('/admin-dashboard')

            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4 py-6'>

            <form
                onSubmit={onSubmitHandler}
                className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5'
            >

                <div className='text-center'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                        <span className='text-blue-600'>Admin</span> Login
                    </h1>

                    <p className='text-sm sm:text-base text-gray-500 mt-2'>
                        Welcome back! Please enter your details
                    </p>
                </div>

                <div>
                    <label className='text-sm font-medium text-gray-700'>
                        Email
                    </label>

                    <input
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base'
                    />
                </div>

                <div>
                    <label className='text-sm font-medium text-gray-700'>
                        Password
                    </label>

                    <input
                        type='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                        className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm sm:text-base'
                    />
                </div>

                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base'>
                    Login
                </button>

                <p className='text-sm text-gray-600 text-center'>
                    Doctor Login? <span className='text-blue-600 font-medium cursor-pointer hover:underline'>
                    <Link to="/doctor-login">Click Here</Link>
                </span></p>
   
            </form>

        </div>
    )
}

export default AdminLogin