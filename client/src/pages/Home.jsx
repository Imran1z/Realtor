import React, { useEffect, useState } from 'react'
import{Link} from 'react-router-dom'
import ListingItem from '../Components/ListingItem'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

const Home = () => {
  const [offerListings, setofferListings] = useState([]);
  console.log("imran",offerListings)
  const [saleListings, setsaleListings] = useState([])
  const [rentListings, setrentListings] = useState([])
  SwiperCore.use([Navigation])

  useEffect(()=>{

    const fetchOfferListings=async()=>{
      try {
        const res = await fetch('/api/v1/listing/get?offer=true&limit=4');
        const data = await res.json();
        console.log(data)
        setofferListings(data);
        fetchRentListings()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/v1/listing/get?type=rent&limit=4');
        const data = await res.json();
        setrentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/v1/listing/get?type=sell&limit=4');
        const data = await res.json();
        setsaleListings(data);
      } catch (error) {
        log(error);
      }
    };

    fetchOfferListings();
  },[])


  return (
    <div>

    {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 ml-20 max-w-10xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          <span className='font-semibold text-gray-600'>HouseHaven</span> is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>

      </div>


    {/* swiper */}
    <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>








      {/* listing results for offer, sale and rent */}
      <div className='max-w-8xl mx-auto p-3 flex flex-col items-center justify-center gap-7 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className={`${offerListings.length<4}&& justify-start`}>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>



    
    
    </div>
  )
}

export default Home