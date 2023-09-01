import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { blogEndPoints } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UpdateBlog = () => {
    const {id} = useParams();
    const {token} = useSelector((state)=>state);
    const userData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [load,setload] = useState(false);
    const [data1,setData1] = useState([]);

    const [formData,setFormData] = useState({
        title:"",
        description:"",
        blogBody:"",
        tag:""
    })

    const fetchData = async() =>{
            try{
              if(!load){
                setload(true)
                const {data} = await apiConnector("GET",blogEndPoints.GET_BLOG_BY_ID+"/"+id,null,{Authorization:`Bearer ${token}`});
                setData1(data.blog);
                setFormData({
                    title:data.blog.title,
                    description:data.blog.description,
                    tag:data.blog.tag,
                    blogBody:data.blog.blogBody
                })
                console.log("data",data);
                setload(false);
              }
            } catch(error){
              console.log(error);
            }
          }

    useEffect(()=>{
        console.log(data1);
    },[data1])

    useEffect(()=>{
        fetchData();
    },[])
    
    const [blogImg,setBlogImg] = useState(data1.blogImg);

    const changeHandler = (e) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
        
    }

    const changeFileHandler = (e) =>{
        setBlogImg(e.target.files[0]);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("blogImg",blogImg)
        formdata.append("title",formData.title)
        formdata.append("description",formData.description)
        formdata.append("tag",formData.tag)
        formdata.append("blogBody",formData.blogBody)
        formdata.append("userID",userData._id);
        try {
            console.log("FORNDATA  : ", formdata.get('title'));
            const response = await apiConnector("PUT", blogEndPoints.UPDATE_BLOG_BY_ID, 
                formdata,
                {
                    id:id,
                    "content-type": `multipart/form-data ; boundary = ${formdata._boundary}`,
                    Authorization: `Bearer ${token}`
                }
            )

            console.log("CreateBlog API RESPONSE............", response)
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Blog Updated SuccessFully")
            navigate("/home")
        } catch (error) {
            console.log("Blog Creation ERROR............", error)
            toast.error(error.response.data.message)
        }
    }


  return (
    <div className='flex justify-center items-center bg-slate-300 mt-5'>
            <div className='border-2 border-indigo-950 w-11/12  bg-slate-200 shadow-lg rounded-lg md:w-9/12'>
                <form onSubmit={submitHandler} className='m-6 flex flex-col gap-y-4'>
                    <h1 className='italic text-center text-3xl font-bold text-indigo-950'>Update Your Blog</h1>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        required
                        name="title"
                        id="title"
                        placeholder='Enter Blog Title'
                        value={formData.title}
                        onChange={changeHandler}
                        className='w-full border-b-2 rounded-md p-2 border-indigo-950'
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        required
                        name="description"
                        id="description"
                        placeholder='Enter Blog Description'
                        value={formData.description}
                        onChange={changeHandler}
                        className='w-full border-b-2 rounded-md p-2 border-indigo-950'
                    />
                    <label htmlFor="tag">Tag</label>
                        <input
                            type="text"
                            required
                            name="tag"
                            id="tag"
                            placeholder='Enter Tags'
                            value={formData.tag}
                            onChange={changeHandler}
                            className='w-full border-b-2 rounded-md p-2 border-indigo-950'
                        />
                    <label htmlFor="blogImg">Blog Image</label>
                        <input
                            type="file"
                            required
                            id="blogImg"
                            name="blogImg"
                            onChange={changeFileHandler}
                            className='w-full border-b-2 rounded-md p-2 border-indigo-950'
                        />    
                    <label htmlFor="blogBody">Full Description</label>
                        <textarea
                            required
                            name="blogBody"
                            id="blogBody"
                            rows={4}
                            cols={20}
                            placeholder='Enter Full description of your Blog'
                            value={formData.blogBody}
                            onChange={changeHandler}
                            className='w-full border-b-2 rounded-md p-2 border-indigo-950'
                        />

                    <div className='flex justify-between gap-x-8'>
                    <input
                        type="button"
                        value="Cancel"
                        id='cancel'
                        onClick={()=>navigate(-1)}
                        className='w-full border-2 rounded-lg p-2  border-indigo-950 bg-indigo-950 hover:bg-indigo-900 transition-all text-white'
                    />
                    <input
                        type="submit"
                        value="Update Blog"
                        id='button'
                        className='w-full border-2 rounded-lg p-2  border-indigo-950  bg-indigo-950 hover:bg-indigo-900 transition-all text-white'
                    />
                    </div>
                </form>
            </div>
        </div>
    )
}


export default UpdateBlog
