import React from 'react'
import { cardData } from '../data/Cards'
import {HiOutlineArrowCircleRight} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-wrap justify-around mt-8 w-[11/12] h-[600px]'>
      {
        cardData.map((value,index)=>{
            return(
                <> 
                    <div className='flex  bg-slate-100 flex-col w-1/4 items-center  rounded-3xl h-full shadow-md hover:scale-105 hover:shadow-2xl transition ease-in-out delay-50'>
                        <img src={value.blogImg} alt=""  className='h-1/2 w-full rounded-lg'/>
                        <div className='h-full'>
                            <div className='flex p-6 pb-0 pt-3 flex-col gap-4 h-full'>
                                <div className='text-white top-50 left-5 border-2 rounded-lg bg-indigo-950 w-fit p-1 pl-2 pr-2'>{value.tag}</div>
                                <div className='text-indigo-950 font-bold text-2xl'>{value.title}</div>
                                <div className='text-indigo-950 italic mb-2'>{value.description}</div>
                                <div className='flex gap-2 items-center'>
                                    <HiOutlineArrowCircleRight size={20}/>
                                    <div className='text-indigo-950 font-semibold cursor-pointer' onClick={()=>navigate(`/${value.id}`)}>Find Out More</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            
        })
      }
    </div>
  )
}

export default Card
