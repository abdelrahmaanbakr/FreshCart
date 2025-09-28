import axios from 'axios'
import Loader from '../Loader/Loader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useQuery } from '@tanstack/react-query'

export default function CategorySlider() {


    
    
   async function getAllCategories(){
         const option={
        url:'https://ecommerce.routemisr.com/api/v1/categories',
        method:'get'
    }
    return await axios.request(option)
 
    }



   const {data,isError,isLoading}= useQuery({

    queryKey:['categorySlide'],
    queryFn:getAllCategories,
    refetchOnMount:false


    })
    if(isLoading){
      return <Loader/>
    }
    if(isError){
      return <h2>error</h2>
    }


    

   
  return (
    <div >
      {<Swiper className='shadow-lg' loop={true} slidesPerView={6}>
        {data.data.data.map((category)=>
        <SwiperSlide key={category._id}>
            <img className='h-64 object-cover' src={category.image} alt="" />
            <h2>{category.name}</h2>
        </SwiperSlide>)}
        </Swiper>}
    </div>
  )
}
