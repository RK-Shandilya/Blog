import React from 'react'
import bghome from '../images/bghome.jpg'
import { useNavigate } from 'react-router-dom'

const MiniHome = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className='h-screen overflow-hidden'>
        <img className='absolute' src={bghome} alt="" />
        <p className='text-center relative italic top-1/4 text-slate-600  text-3xl font-semibold'>In a world of words, let your voice be the story <br/> <p> that captivates hearts and ignites minds.</p></p>
        <p className='text-center relative italic text-indigo-950 text-6xl font-semibold'>Welcome to Blogaroo</p>
        <button onClick={()=>navigate('/signup')} className='relative top-1/4 left-2/4 text-white rounded-lg p-3 border-2 transition-all bg-indigo-950 hover:opacity-90'>Create Your Blog</button>
       </div>
    </div>
  )
}

export default MiniHome
