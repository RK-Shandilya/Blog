import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsFillSendFill } from 'react-icons/bs'
import { apiConnector } from '../services/apiConnector';
import { blogEndPoints } from '../services/apis';
import SingleComment from './SingleComment';

const Comment = ({ blogID }) => {
  const [commentnum, setCommentNum] = useState(0);
  const [load, setload] = useState(false);
  const [allCommentData, setAllCommentData] = useState([]);
  const [commentData, setCommentData] = useState("");
  const [viewMore, setViewMore] = useState(false);

  const { token } = useSelector((state) => state);
  let userID = JSON.parse(localStorage.getItem("user"))._id

  const handleViewMore = () =>{
    setViewMore((prev)=>!prev);
  }

  const sendComment = async () => {
    if (!load) {
      setload(true)
      const data = await apiConnector("POST", blogEndPoints.POST_COMMENT, { userID: userID, blogID: blogID, comment: commentData }, { Authorization: `Bearer ${token}` });
      setAllCommentData(data.data.post.comments.reverse())
      setCommentNum(data.data.post.comments.length);
      setCommentData("");
      setload(false);
    }
  }

  const deleteHandler = async(e) => {
    const {data} = await apiConnector("DELETE", blogEndPoints.DELETE_COMMENT, {blogID:blogID,id:e.currentTarget.value}, { Authorization: `Bearer ${token}` });
    setAllCommentData(data.post.comments.reverse());
    setCommentNum(data.post.comments.length);
  }

  const fetchAllComments = async () => {
    const { data } = await apiConnector("GET", blogEndPoints.FETCH_ALL_COMMENTS, null, { Authorization: `Bearer ${token}`, blogID: blogID })
    console.log("data of Comments", data.data)
    setAllCommentData(data.data);
    setCommentNum(data.data.length);
  }

  useEffect(() => {
    fetchAllComments();
  },[])

  return (
    <div>
      <div className=' mb-10'>
        <div className='border-2 border-b-0 border-indigo-950 rounded-lg bg-slate-400'>
          <div className='flex gap-1 items-center'>
            <h1 className='m-2 text-xl font-semibold'>Comments</h1>
            <div>{commentnum}</div>
          </div>
          <div className='relative'>
            <input type="text" required name="commentData" id="" placeholder='Add a comment...' value={commentData} onChange={(e) => setCommentData(e.target.value)} className='border-2 p-2 w-full rounded-lg relative' />
            <BsFillSendFill onClick={sendComment} className='absolute right-5 bottom-3 text-lg' />
          </div>
        </div>
        <div>
          <hr className='mt-3 h-1 mb-3 bg-black' />
          <div className=''>
          {
            allCommentData.map((value, index) => 
             !viewMore ?
              index<5 &&
              <SingleComment key={value._id} deleteHandler={deleteHandler} val={value}/>
              : <SingleComment key={value._id} deleteHandler={deleteHandler} val={value}/>
            )
          }
          </div>
          {!viewMore?
          <button className='flex text-white border-2 border-indigo-950 bg-indigo-950 p-2 rounded-lg' onClick={handleViewMore}>View More</button>
          :
          <button className='flex text-white border-2 border-indigo-950 bg-indigo-950 p-2 rounded-lg' onClick={handleViewMore}>Collapse</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Comment
