import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listingData}) => {

  const [landloard, setlandloard] = useState(null);
  const [message, setmessage] = useState('')
  
  
  const handleMessage =(e)=>{
    setmessage(e.target.value);
  }

  useEffect(()=>{
    const fetchLanloard =async()=>{
      try {
        const res =await fetch(`/api/v1/user/${listingData.userRef}`);
        const data =await res.json();
     
        setlandloard(data)

        if (data.success===false) {
            console.log(data.message)
        }
      } catch (error) {
       console.log(error)
      }

   }
   fetchLanloard();

  },[listingData.userRef])
  return (
    <>
      {landloard && (
        <div className='flex flex-col gap-2'>
          <p>Contact-<span className='font-semibold'>{landloard.username} for <span className='font-normal'>{listingData.name}</span></span></p>
          <textarea className='w-full border p-3 rounded-lg' placeholder='Enter your message here...' name="message" id="message"  rows="2" value={message} onChange={handleMessage}></textarea>
          <Link to={`mailto:${landloard.email}?subject=Regarding${listingData.name}&body=${message}`} className='bg-slate-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>Send Message</Link>
        </div>
      )}
    </>
  )
}

export default Contact