import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2  '>
                    <label className='whitespace-nowrap font-semibold' >Search Term</label>
                    <input type="text" id='searchTerm' placeholder='search...' className='border rounded-lg p-3 w-full'/>
                </div>
                <div className='items-center flex gap-2 md:flex-wrap'>
                    <label className='font-semibold' >Type:</label>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='all' className='w-5'/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='rent' className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='sell' className='w-5'/>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='offer' className='w-5'/>
                        <span>offer</span>
                    </div>
                </div>
                <div className='items-center flex gap-2 md:flex-wrap'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='parking' className='w-5'/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input type="checkbox" id='furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div>
                    
                </div>
                <div className='items-center flex gap-2 '>
                    <label className='font-semibold'>Sort:</label>
                    <div className='flex gap-2 '>
                        <select name="" id="sort_order" className='border rounded-lg p-3 '>
                            <option >Price high to low</option>
                            <option >Price low to high</option>
                            <option >Latest</option>
                            <option >Oldest</option>
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