import React, { useContext } from 'react';
import Admlogin from './pages/Admlogin';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';

const App = () => {

  const{aToken}=useContext(AdminContext)
  return aToken ? (
    <div>
      <ToastContainer/>
    </div>
  ) : (
    <>
    <Admlogin/>
    <ToastContainer/>
    </>
  )
};

export default App;