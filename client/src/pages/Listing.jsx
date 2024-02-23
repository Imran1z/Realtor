import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {
    SwiperCore.use([Navigation])
    const prams= useParams();
    const [listingData, setListingData] = useState({})
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false)
    console.log(listingData)

    useEffect(()=>{
        const fetchListing =async()=>{
           try {
            seterror(false)
            setloading(true)
            const listingId =prams.listingId;
            // console.log(listingId);
 
             const res =await fetch(`/api/v1/listing/get/${listingId}`);
             const data =await res.json();
           //  console.log(data)
           
           if (data.success===false) {
               seterror(true)         
               setloading(false)  ;
               return;     
            }
            setListingData(data);
            setloading(false)  ;
           } catch (error) {
            seterror(true)  
            setloading(false)       
                }

        }
        fetchListing();
    },[prams.listingId])
  return (
    <main>
        
        {loading && <p className='text-center mt-auto text-2xl'>Loading...</p> }
        {error && <p className='text-center mt-auto text-2xl'>Something went wrong...</p> }

        {listingData && listingData.imageUrls && !loading && !error && (
            <>
                <Swiper navigation>
                    {listingData.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                            <div className='h-[450px]  ' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )}
    
    </main>
  )
}

export default Listing