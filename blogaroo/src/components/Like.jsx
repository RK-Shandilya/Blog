import React, { useEffect, useState } from 'react'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import { blogEndPoints } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { useSelector } from 'react-redux'


const Like = ({blogID}) => {

    let userID = JSON.parse(localStorage.getItem("user"))._id
    const [like,setLike] = useState(false);
    const [likeNum,setLikeNum] = useState(0);
    const [load,setload] = useState(false);

    const {token} = useSelector((state)=>state)
 
    const fetchLiked = async() =>{
        if(!load){
            setload(true);
            const data = await apiConnector("POST",blogEndPoints.LIKED_OR_NOT,{
                userID:userID,
                blogID:blogID
            },{Authorization:`Bearer ${token}`})
            console.log("likeddata",data.data.data.length);
            setLikeNum(data.data.data.length)
            let isliked = data.data.data.filter((value,index)=>{
                return value.userID===userID
            })
            console.log("isliked",isliked);
            setLike(isliked.length>=1 ? 1 : 0);
            setload(false);
        }
    }

    
    const LikechangeHandler = async(e) =>{
        e.preventDefault();
        if(!load){
            setload(true);
            const data = await apiConnector("POST",blogEndPoints.POST_LIKED_BLOGS,{
                userID:userID,
                blogID:blogID
            },{Authorization:`Bearer ${token}`})
            console.log("data",data);
            setload(false);
            setLikeNum((prev) => prev+1);
            setLike((prevLike) => !prevLike);
        }
    }

    const unlikechangeHandler = async(e) =>{
        e.preventDefault();
        if(!load){
            setload(true);
            const data = await apiConnector("POST",blogEndPoints.UNLIKE_POST,{
                userID:userID,
                blogID:blogID
            },{Authorization:`Bearer ${token}`})
            console.log("data",data);
            setload(false);
            setLikeNum((prev) => prev - 1);
            setLike((prevLike) => !prevLike);
        }
    }

    useEffect(()=>{
        fetchLiked();
    },[])

  return (
    <div>
        <div className='flex gap-3 items-center'>
            {
                like ? <AiFillHeart onClick={unlikechangeHandler} className='text-3xl text-indigo-900'/> : <AiOutlineHeart onClick={LikechangeHandler} className='text-3xl'/>
            }
            <div className='text-lg text-indigo-950'>{likeNum}</div>
        </div>
    </div>
  )
}

export default Like

