import React, { useEffect, useState } from 'react'
import {MdDelete} from 'react-icons/md'
import {AiFillEdit} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { apiConnector } from '../services/apiConnector'
import { blogEndPoints } from '../services/apis'
import UpdateBlog from './UpdateBlog'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'
import Like from './Like'
import { format } from 'timeago.js'
import { toast } from 'react-hot-toast'

const BlogDetails = () => {
    const [data1,setData1] = useState({});
    const [blogAdmin,setBlogAdmin] = useState(false);
    const [load,setload] = useState(false);
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state);
    const user = JSON.parse(localStorage.getItem("signUpData")).user;
    console.log(user);
    const {id} = useParams()

    const deleteBlog= async() =>{
      const {data} = await apiConnector("DELETE",blogEndPoints.DELETE_BLOG_BY_ID,{blogID:id,userID:JSON.parse(localStorage.getItem("user"))._id},{Authorization:`Bearer ${token}`})
      console.log(data)
      if(data.success) {
        toast.success("Blog Deleted Successfully")
        navigate('/home');
      }
      else {
        toast.error("Please Try Again")
        navigate('/home')
      }
    }

    const updateBlog= (e) =>{
      console.log("e",e.currentTarget.value);
      navigate(`/editblog/${e.currentTarget.value}`)
    }

    

    

    useEffect(()=>{
      const fetchBlogById = async() =>{
        try{
          if(!load){
            setload(true)
            const {data} = await apiConnector("GET",blogEndPoints.GET_BLOG_BY_ID+"/"+id,null,{Authorization:`Bearer ${token}`});
            console.log("data",data)
            console.log("user1",data.blog.userID,JSON.parse(localStorage.getItem("user"))._id)
            if(data.blog.userID == JSON.parse(localStorage.getItem("user"))._id){
              setBlogAdmin(true);
            }
            setData1(data.blog);
            setload(false);
          }
        } catch(error){
          console.log(error);
        }
      }
      fetchBlogById();
    },[])

  return (
    <div className='w-full'>
          <div className='w-2/3 mx-auto'>
            <div className='flex justify-between mt-8 items-center '>
              <div className='text-3xl font-bold text-indigo-950 italic underline'>{data1?.title}</div>
              <div className='flex'>
                {
                  blogAdmin ?
                  <div className='flex gap-2'>
                    <div className=' cursor-pointer'><MdDelete onClick={deleteBlog} className=' text-2xl'/></div>
                    <button value={data1._id} onClick={updateBlog} className=' cursor-pointer'><AiFillEdit className=' text-2xl'/></button> 
                  </div> 
                  : null
                }
              </div>
            </div>
            <div className='flex mt-8 pb-8 gap-16 justify-between w-full'>
              <div className='w-1/2'><img src={data1.blogImg} alt="" className='w-full h-[60vh] rounded-lg hover:drop-shadow-[2px_2px_2px_rgb(0,0,0,1)]'/></div>
              <div className='w-1/2 flex flex-col gap-4 p-7 justify-center'>
                <div className='text-xl font-semibold '><span className='underline'>Author</span> : {user.name}</div>
                <div className=' text-xl font-semibold'><span className='underline'>Last Updated</span> : {format(data1.updatedAt)}</div>
                <div className=' text-xl font-semibold'><span className='underline'>Created At</span> : {format(data1.createdAt)}</div>
                <div className='flex items-center gap-2'>
                    <div className='text-xl font-semibold '>Tag : </div>
                    <div className='p-2 bg-indigo-950 text-white w-fit rounded-lg'>{data1.tag}</div>
                </div>
                <Like blogID={id}/>
                </div>
            </div>
            <div>
            <div className='text-xl font-semibold text-indigo-950 mb-3'>{data1.description}</div>
            <hr className='mb-5 h-1 bg-indigo-950'/>
            <div className=' text-lg font-semibold text-indigo-950'>{data1.blogBody}</div>
            <hr className='mb-5 h-1 bg-indigo-950 mt-5'/>
            <Comment blogID={id}/>
            </div>
          </div>
    </div>
  )
}

export default BlogDetails
