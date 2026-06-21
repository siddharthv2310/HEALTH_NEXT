import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { Link } from 'react-router-dom'

const DoctorLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setDToken } = useContext(DoctorContext)
    const { backendUrl } = useContext(AdminContext)

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const { data } = await axios.post(
                backendUrl + '/api/doctor/login',
                { email, password }
            )

            if (data.success) {

                localStorage.setItem('dToken', data.token)
                localStorage.setItem('role', 'doctor');
                setDToken(data.token)

                navigate('/doctor-dashboard')

            } else {
                toast.error(data.message)
            }

        } catch (err) {
            console.log(err);

            toast.error(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 px-4 py-6'>

            <form
                onSubmit={onSubmitHandler}
                className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5'
            >

                <div className='text-center'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
                        <span className='text-green-600'>Doctor</span> Login
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
                        className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 text-sm sm:text-base'
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
                        className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 text-sm sm:text-base'
                    />
                </div>

                <button className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors text-sm sm:text-base'>
                    Login
                </button>

                <p className='text-sm text-gray-600 text-center'>
                    Admin Login? <span className='text-blue-600 font-medium cursor-pointer hover:underline'>
                        <Link to="/admin-login">Click Here</Link>
                    </span></p>

            </form>

        </div>
    )
}

export default DoctorLogin