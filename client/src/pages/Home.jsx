import React, { useEffect, useState } from 'react'
import{Link} from 'react-router-dom'
import ListingItem from '../Components/ListingItem'
const Home = () => {
  const [offerListings, setofferListings] = useState([]);
  const [saleListings, setsaleListings] = useState([])
  const [rentListings, setrentListings] = useState([])

  useEffect(()=>{

    const fetchOfferListings=async()=>{
      try {
        const res = await fetch('/api/v1/listing/get?offer=true&limit=4');
        const data = await res.json();
        //console.log(data)
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
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
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









      {/* listing results for offer, sale and rent */}
      <div className='max-w-5xl mx-auto p-3 flex flex-col gap-7 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
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