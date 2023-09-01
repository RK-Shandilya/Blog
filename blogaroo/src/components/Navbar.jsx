import React from 'react'
import {AiFillFacebook,AiFillTwitterCircle,AiFillInstagram,AiTwotoneMail} from "react-icons/ai"
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logutHandler = () =>{
    localStorage.setItem("token","");
    navigate('/');
  }

  const IconHandler = () => {
      token ? navigate('/home') : navigate('/')
  }

  return (
    <div className="flex justify-between text-white items-center h-14 bg-indigo-950">
      <div className='flex flex-row ml-6 gap-2'>
        <AiFillFacebook className=' text-2xl hover:text-slate-300 transition-all'/>
        <AiFillTwitterCircle className=' text-2xl hover:text-slate-300 transition-all'/>
        <AiFillInstagram className=' text-2xl hover:text-slate-300 transition-all'/>
        <AiTwotoneMail className=' text-2xl hover:text-slate-300 transition-all'/>
      </div>
      <div className=' text-4xl cursor-pointer'>
        <div onClick={IconHandler}>Blogaroo</div>
      </div>
      
        {
          !token ?
          <div>
          <button className='mr-6 transition-all hover:text-gray-300' onClick={()=>navigate('/signup')}>Sign Up</button>
        <button className='mr-6 transition-all hover:text-gray-300' onClick={()=>navigate('/login')}>Log In</button>
        </div>
        : <div><button className='mr-6 transition-all hover:text-gray-300' onClick={logutHandler}>Log Out</button></div>
        }
    </div>
  )
}

export default Navbar
