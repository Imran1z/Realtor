import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Search = () => {
    const navigate =useNavigate()
    const [loading, setloading] = useState(false);
    const [listings, setlistings] = useState([]);
    console.log(listings)
    
    const [sidebarData, setsidebarData] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'createdAt',
        order:'desc',
    });

    useEffect(()=>{
        const urlParams =new URLSearchParams(location.search);
        const searchTermFormUrl=urlParams.get('searchTerm');
        const typeFormUrl=urlParams.get('type');
        const parkingFormUrl=urlParams.get('parking');
        const furnishedFormUrl=urlParams.get('furnished');
        const offerFormUrl=urlParams.get('offer');
        const sortFormUrl=urlParams.get('sort');
        const orderFormUrl=urlParams.get('order');

        if (searchTermFormUrl||typeFormUrl||parkingFormUrl||furnishedFormUrl||offerFormUrl||sortFormUrl||orderFormUrl) {

            setsidebarData({
                searchTerm:searchTermFormUrl ||'',
                type:typeFormUrl ||'all',
                parking:parkingFormUrl ==='true'?true:false,
                furnished:furnishedFormUrl ==='true'?true:false,
                offer:offerFormUrl ==='true'?true:false,
                sort:sortFormUrl ||'createdAt',
                order:orderFormUrl ||'desc'

            })
            
        }

        const fetchListings=async ()=>{
            setloading(true);
            const searchQuery=urlParams.toString()
            const res =await fetch(`/api/v1/listing/get?${searchQuery}`);
            const data=await res.json()
            setlistings(data);
            setloading(false);
    
        }
        fetchListings()

    },[location.search])


    //console.log(sidebarData)

    const handleChange =(e)=>{

        if (e.target.id==='all'||e.target.id==='rent'||e.target.id==='sell') {
            setsidebarData({...sidebarData,type:e.target.id})
        }
        if (e.target.id==='searchTerm') {
            setsidebarData({...sidebarData,searchTerm:e.target.value})
            
        }
        if (e.target.id==='offer'||e.target.id==='furnished'||e.target.id==='parking') {
            setsidebarData({...sidebarData,[e.target.id]:e.target.checked||e.target.checked==='true'?true:false})
        }
        if(e.target.id==='sort_order'){
            const sort =e.target.value.split('_')[0]||'createdAt';
            const order =e.target.value.split('_')[1]||'desc';
            setsidebarData({...sidebarData,sort,order})
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams =new URLSearchParams();
        urlParams.set("searchTerm",sidebarData.searchTerm)
        urlParams.set("type",sidebarData.type)
        urlParams.set("parking",sidebarData.parking)
        urlParams.set("furnished",sidebarData.furnished)
        urlParams.set("offer",sidebarData.offer)
        urlParams.set("sort",sidebarData.sort)
        urlParams.set("order",sidebarData.order);
        const searchQuery =urlParams.toString();
        navigate(`/search?${searchQuery}`)

        
    }

    
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2  '>
                    <label className='whitespace-nowrap font-semibold' >Search Term</label>
                    <input type="text" id='searchTerm' placeholder='search...' className='border rounded-lg p-3 w-full' value={sidebarData.searchTerm} onChange={handleChange}/>
                </div>
                <div className='items-center flex gap-2 md:flex-wrap'>
                    <label className='font-semibold' >Type:</label>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='all' className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.type==='all'}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='rent' className='w-5'
                            onChange={handleChange}
                            checked={sidebarData.type==='rent'}
                        />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='sell' className='w-5'
                             onChange={handleChange}
                            checked={sidebarData.type==='sell'}
                        />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='offer' className='w-5'
                             onChange={handleChange}
                            checked={sidebarData.offer}
                        />
                        <span>offer</span>
                    </div>
                </div>
                <div className='items-center flex gap-2 md:flex-wrap'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='parking' className='w-5'
                             onChange={handleChange}
                            checked={sidebarData.parking}
                        />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='furnished' className='w-5'
                             onChange={handleChange}
                            checked={sidebarData.furnished}
                        />
                        <span>Furnished</span>
                    </div>
                    
                </div>
                <div className='items-center flex gap-2 '>
                    <label className='font-semibold'>Sort:</label>
                    <div className='flex gap-2 '>
                        <select onChange={handleChange}
                        defaultValue={'createdAtDesc'} name="" id="sort_order" className='border rounded-lg p-3 '>
                            <option value={'regularPrice_desc'}>Price high to low</option>
                            <option value={'regularPrice_asc'} >Price low to high</option>
                            <option value={'createdAt_desc'} >Latest</option>
                            <option value={'createdAt_asc'}>Oldest</option>
                        </select>
                    </div>
                   
                    
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 mt-5 text-slate-700'>Listing Results:</h1>
        </div>
    </div>
  )
}

export default Search