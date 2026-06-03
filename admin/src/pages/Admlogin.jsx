import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Admlogin = () => {

    const [state, setState] = useState('Admin')

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const{setAToken,backendUrl}=useContext(AdminContext)
    const {setDToken}=useContext(DoctorContext)
    const navigate = useNavigate()

    const onSubmitHandeler = async (e) => {
        e.preventDefault()

        try{
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                    // console.log(data.token)
                    navigate('/admin-dashboard')
                }
                else{
                    toast.error(data.message);
                }
            } 
            // this is for doctor login
            else{

                const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
                if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)

                    navigate('/doctor-dashboard')
                }
                else{
                    toast.error(data.message);
                }
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }



    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>

            <form onSubmit={onSubmitHandeler} className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5'>

                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        <span className='text-blue-600'>{state}</span> Login
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        Welcome back! Please enter your details
                    </p>
                </div>

                <div className='w-full'>
                    <label className='text-sm font-medium text-gray-700'>
                        Email
                    </label>

                    <input
                        onChange={(e)=>setEmail(e.target.value)} value={email}
                        className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                        type='email'
                        placeholder='Enter your email'
                        required
                    />
                </div>

                <div className='w-full'>
                    <label className='text-sm font-medium text-gray-700'>
                        Password
                    </label>

                    <input
                        onChange={(e)=>setPassword(e.target.value)} value={password}
                        className='w-full mt-2 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
                        type='password'
                        placeholder='Enter your password'
                        required
                    />
                </div>

                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg'>
                    Login
                </button>

                {
                    state === 'Admin'
                        ? (
                            <p className='text-sm text-gray-600 text-center'>
                                Doctor Login?{' '}
                                <span
                                    onClick={() => setState('Doctor')}
                                    className='text-blue-600 font-medium cursor-pointer hover:underline'
                                >
                                    Click here
                                </span>
                            </p>
                        )
                        : (
                            <p className='text-sm text-gray-600 text-center'>
                                Admin Login?{' '}
                                <span
                                    onClick={() => setState('Admin')}
                                    className='text-blue-600 font-medium cursor-pointer hover:underline'
                                >
                                    Click here
                                </span>
                            </p>
                        )
                }

            </form>

        </div>
    )
}

export default Admlogin