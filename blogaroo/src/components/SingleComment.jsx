import React,{useState} from 'react'
import {MdDelete} from 'react-icons/md'
import {format} from 'timeago.js'

const SingleComment = ({val,deleteHandler}) => {
    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='flex flex-col bg-slate-400 gap-1 p-3 mb-4 border-2 border-slate-950 rounded-lg'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
            <div className=' text-slate-950 font-semibold cursor-pointer'>{user.name}</div>
            <div className='text-slate-950 '> {format(val.updatedAt)}</div>
        </div>
        {(user._id === val.userID) ? <button onClick={deleteHandler} value={val._id}><MdDelete  className='text-xl text-slate-950'/></button> : null}
      </div>
        <div className='text-slate-950'>{val.comments}</div>
    </div>
  )
}

export default SingleComment
