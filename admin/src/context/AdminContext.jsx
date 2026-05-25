import React, { createContext, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const[aToken,setAToken]=useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'):'');

    const [doctors,setDoctors]=useState([]);

    const getAllDoctors= async ()=>{

        try{
            const {data}= await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}});

            if(data.success){
                setDoctors(data.doctors)
                // console.log(data.doctors);
            } 
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(err.message)
        }
            
    }

    const changeAvailibility = async(docId)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}});

            if(data.success){
                toast.success("availability changed !")
                setDoctors((prevDoctors) =>
                prevDoctors.map((doc) =>
                    doc._id === docId
                        ? { ...doc, available: !doc.available }
                        : doc
                )
            )
                
            } 
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            toast.error(data.message);
        }
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        aToken,setAToken,
        backendUrl, doctors,getAllDoctors,changeAvailibility,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;