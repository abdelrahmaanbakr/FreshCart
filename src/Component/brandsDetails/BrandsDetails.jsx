import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router'
import Loader from '../Loader/Loader'

export default function BrandsDetails() {


    const {id}=useParams()

    async function getBrandsDetails(){
        const option={
            url:`https://ecommerce.routemisr.com/api/v1/brands/${id}`,
            method:'get',
        }
        return await axios.request(option)
    }


    const {data,isError,isLoading} = useQuery({

        queryKey:['brandsDetails' ,id ],
        queryFn: getBrandsDetails,
        refetchOnMount: false,
    })

    if(isLoading){
        return <Loader/>
    }
    if(isError){
        return <h2>error</h2>
    }

    
  const brand = data?.data?.data
  return (
   <div className="p-5">
      <div className="rounded-md shadow-md p-3">
        <img src={brand.image} alt={brand.name} className="w-60" />
        <h3 className="text-2xl font-semibold mt-3 px-5">{brand.name}</h3>
      </div>
    </div>
  )
}
