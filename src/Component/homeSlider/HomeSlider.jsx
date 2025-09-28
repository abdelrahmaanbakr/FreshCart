import React from 'react'
import homeSlider1 from '../../assets/Images/slider-image-1.jpeg'
import homeSlider2 from '../../assets/Images/slider-image-2.jpeg'
import homeSlider3 from '../../assets/Images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HomeSlider() {
  return (
    <div className='grid grid-cols-12 py-4'>

        <div className='col-span-8'>
            <Swiper loop="true"className='h-full'>
                <SwiperSlide> <img className='h-full object-cover' src={homeSlider1} alt="" /></SwiperSlide>
                <SwiperSlide> <img className='h-full object-cover' src={homeSlider3} alt="" /></SwiperSlide>
                <SwiperSlide> <img className='h-full object-cover' src={homeSlider2} alt="" /></SwiperSlide>
            
            </Swiper>
           
        </div>
        <div className='col-span-4'>
            <img src={homeSlider2} alt="" />
            <img src={homeSlider3} alt="" />
        </div>
      
    </div>
  )
}
