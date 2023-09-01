import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay,FreeMode,Pagination} from "swiper/modules"
import { useNavigate } from 'react-router-dom';



const Slider = ({blogs}) => {
  const navigate = useNavigate();
  return (
    <div className='mb-10'>
      <Swiper
        slidesPerView={5}
        spaceBetween ={25}
        loop={true}
        freeMode ={true}
        autoPlay={{
            delay:1000,
            disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
          className="w-full h-[450px]"
      >
        {
            blogs?.map((value,index)=>{
                return(
                    <SwiperSlide className='h-[450px]'>
                        <div onClick={()=>navigate(`/${value._id}`)} className='flex flex-col border-2 border-indigo-950 rounded-lg bg-slate-800 hover:scale-105 transition ease-in-out delay-100 h-full cursor-pointer'>
                            <div className='w-full h-3/4'>
                                <img src={value.blogImg} alt="" className='w-full h-full' />
                            </div>
                            <div className='flex flex-col p-3 pb-0 gap-y-2'>
                                <div className='rounded-md bg-slate-300 p-1 w-fit text-indigo-950 font-bold'>{value.tag}</div>
                                <div className='italic font-semibold text-slate-300 mb-2'>{value.title}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })
        }
      </Swiper>

    </div>
  )
}

export default Slider
