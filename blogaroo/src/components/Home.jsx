import React, { useEffect, useState } from 'react'
import Slider from './Slider';
import Card from './Card';
import { apiConnector } from '../services/apiConnector';
import { blogEndPoints } from '../services/apis';
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [alldata,setAlldata] = useState([]);
  const [likeddata,setLikeddata] = useState([]);
  const {token} = useSelector((state)=>state);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await apiConnector("GET",blogEndPoints.GET_ALL_BLOGS_API,null,{Authorization: `Bearer ${token}`} );
      console.log(response.data.allBlogs);
      setAlldata(response.data.allBlogs);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const likedBlogs = async () => {
    try {
      const response = await apiConnector("GET",blogEndPoints.GET_ALL_BLOGS_API,null,{Authorization: `Bearer ${token}`} );
      console.log(response.data.allBlogs);
      setLikeddata(response.data.allBlogs);
    } catch (error) {
      console.error("API Error:", error);
    }
  };



  useEffect(()=>{
    fetchBlogs();
  },[])
  
  useEffect(()=>{
    likedBlogs();
  },[])

  return (
    <div>
      <div className='mt-10'> 
        <div className='flex justify-center items-center text-3xl font-bold mb-10 italic font-serif'>Explore the world of <TypeAnimation sequence={[
          500,
          'Blogging'
        ]}speed={50} repeat={Infinity}
          style={{marginLeft:11 , border:'solid 1px rgb(255,0,0)',backgroundColor:'rgb(0,0,0)',color:'white',padding:2 }}
        />
        </div>
        <Card/>
        <div className='flex justify-center'>
          <button onClick={()=>navigate('/createblog')} className='hover:animate-pulse w-1/4 mt-10 p-3 border-2 rounded-xl bg-gradient-to-r from-indigo-950 to-indigo-800 text-white hover:border-slate-950 transition-all text-xl font-semibold'>Create Blog</button>
        </div>
        <div>
          <div className='ml-4'>
            <div className='mt-4 mb-4 ml-4 text-2xl font-extrabold text-indigo-950 '>ALL BLOGS</div>
            <Slider blogs={alldata}/>
          </div>
          <hr className='mx-auto w-1/4 h-1 bg-indigo-950'/>
          <div className='ml-4'>
            <div className='mt-4 mb-4  text-2xl font-extrabold text-indigo-950'>MOST LIKED BLOGS</div>
            <Slider blogs={likeddata}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
