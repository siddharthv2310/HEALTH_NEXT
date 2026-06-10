import {React,useContext,useState} from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {


    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {backendUrl,aToken}=useContext(AdminContext)

    const onSubmitHandeler= async (e)=>{
      e.preventDefault();
      try{
        if(!docImg){
          return toast.error("image not selected");
        }

        const formData= new FormData();

        formData.append('image',docImg);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('experience',experience);
        formData.append('fees',Number(fees));
        formData.append('about',about);
        formData.append('speciality',speciality);
        formData.append('degree',degree);
        formData.append('address',JSON.stringify({line1:address1,line2:address2}));


        // calling backend for adding details

        const {data}= await axios.post(backendUrl + '/api/admin/add-doctor',formData,{
          headers:{aToken}
        } )

        if(data.success){
          toast.success(data.message);
          setDocImg(false);
          setName('')
          setEmail('')
          setPassword('')
          setFees('')
          setAbout('')
          setDegree('')
          setAddress1('')
          setAddress2('')
        }
        else{
          toast.error(data.message);
        }

      }
      catch(err){
        toast.error(err.message);
      }
    }

    const specialityData = [
        "General physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatricians",
        "Neurologist"
    ]

    const experienceData = [
        "1 Year",
        "2 Years",
        "3 Years",
        "5 Years",
        "10+ Years"
    ]

    return (
        <div className='w-full min-h-screen bg-[#F8F9FD] pt-12'>

            <form onSubmit={onSubmitHandeler} className='max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>

                {/* Heading */}
                <p className='text-2xl font-semibold text-gray-800 mb-8'>
                    Add Doctor
                </p>

                {/* Upload Section */}
                <div className='flex items-center gap-4 mb-10'>

                    <label htmlFor="doc-img" className='cursor-pointer'>
                        <img
                            className='w-20 h-20 rounded-full object-cover border'
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt=""
                        />
                    </label>

                    <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />

                    <p className='text-gray-600 font-medium'>
                        Upload doctor <br /> picture
                    </p>
                </div>

                {/* Form Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>

                    {/* Left Side */}
                    <div className='space-y-5'>

                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Doctor name
                            </p>

                            <input
                                onChange={(e)=> setName(e.target.value)} value={name}
                                type="text"
                                placeholder='Name'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary'
                            />
                        </div>

                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Doctor Email
                            </p>

                            <input
                                onChange={(e)=> setEmail(e.target.value)} value={email}
                                type="email"
                                placeholder='Your email'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary'
                            />
                        </div>

                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Doctor Password
                            </p>

                            <input
                                onChange={(e)=> setPassword(e.target.value)} value={password}
                                type="password"
                                placeholder='Password'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary'
                            />
                        </div>

                        {/* Experience Dropdown */}
                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Experience
                            </p>

                            <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary bg-white'>

                                <option value="">Select experience</option>

                                {
                                    experienceData.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))
                                }

                            </select>
                        </div>

                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Fees
                            </p>

                            <input
                                onChange={(e)=> setFees(e.target.value)} value={fees}
                                type="number"
                                placeholder='Your fees'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary'
                            />
                        </div>

                    </div>

                    {/* Right Side */}
                    <div className='space-y-5'>

                        {/* Speciality Dropdown */}
                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Speciality
                            </p>

                            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary bg-white'>

                                <option value="">Select speciality</option>

                                {
                                    specialityData.map((item, index) => (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    ))
                                }

                            </select>
                        </div>

                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Education
                            </p>

                            <input
                                onChange={(e)=> setDegree(e.target.value)} value={degree}
                                type="text"
                                placeholder='Education'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary'
                            />
                        </div>

                        <div>
                            <p className='mb-2 text-sm font-medium text-gray-700'>
                                Address
                            </p>

                            <input
                                onChange={(e)=> setAddress1(e.target.value)} value={address1}
                                type="text"
                                placeholder='Address 1'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary mb-4'
                            />

                            <input
                                onChange={(e)=> setAddress2(e.target.value)} value={address2}
                                type="text"
                                placeholder='Address 2'
                                className='w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-primary'
                            />
                        </div>

                    </div>

                </div>

                {/* About */}
                <div className='mt-8'>

                    <p className='mb-2 text-sm font-medium text-gray-700'>
                        About me
                    </p>

                    <textarea
                        onChange={(e)=> setAbout(e.target.value)} value={about}
                        rows={6}
                        placeholder='Write about yourself'
                        className='w-full px-4 py-3 border border-gray-300 rounded-2xl outline-none focus:border-primary resize-none'
                    />

                </div>

                {/* Button */}
                <button
                  type='submit'
                  className='mt-8 bg-blue-600 text-white px-10 py-3 rounded-full font-medium hover:scale-105 transition-all duration-300'>
                    Add doctor
                </button>

            </form>

        </div>
    )
}

export default AddDoctor