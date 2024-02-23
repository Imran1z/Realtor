import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Link, useNavigate } from 'react-router-dom';
import {app} from '../firebase.js'
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutUserStart,signOutUserSuccess,signinFailure} from '../redux/user/userSlice.js';


const Profile = () => {
  const {currentUser,loading,error}= useSelector((state)=>state.user)
  const [formData, setFormData] = useState({});
  const [file,setFile]=useState(undefined);
  //const navigate = useNavigate();
  const [filePerc, setFilePerc] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch =useDispatch();
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef =useRef(null);
  const [showListingError, setShowListingError] = useState(false)
  const [userListings, setUserListings] = useState([])


  useEffect(()=>{
    if (file) {
      handleFileUpload(file);
    }
  },[file])




  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error)
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };











  const handleChange =(e)=>{
    setFormData({...formData , [e.target.id]:e.target.value})
  }



  const handleImageClick = () => {
    fileRef.current.click(); // Trigger the file input dialog
  };




  const handleSubmit=async(e)=>{
    e.preventDefault();
  //  console.log("formdata",formData)

    try {
      dispatch(updateUserStart())
//console.log(currentUser._id)
      const res =await fetch(`/api/v1/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      

      const data = await res.json();
   //   console.log("data from api",data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)

    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error.message))
    }

  }


  const handleDeleteUser =async()=>{
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`,{
       method:"DELETE", 
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess());
      
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  const handleSignout =async()=>{
    try {
      dispatch(signOutUserStart())
      const res =await fetch('/api/v1/auth/signout')

      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess());

    } catch (error) {
dispatch(signinFailure(error.message))   
 }
  }


  const handleShowListings=async()=>{
    try {
      setShowListingError(false)
      const res =await fetch(`/api/v1/user/listings/${currentUser._id}`);   

      const data = await res.json();
     //    console.log("data from api",data);
         if (data.success === false) {
           setShowListingError(true)
           return;
         }
         setUserListings(data);
    } catch (error) {
      setShowListingError(true)
      
    }
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*' ref={fileRef}/>

          <img src={formData.avatar || currentUser.avatar} alt="profile"  onClick={handleImageClick} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>

          <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>


          <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>


        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>



        </form>
        <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
          onClick={handleDeleteUser}
        >
          Delete account
        </span>
        <span  className='text-red-700 cursor-pointer' onClick={handleSignout}>
          Sign out
        </span>
        </div>
        <p className='text-green-600 '>{updateSuccess? "Profile updated successfully" : ''}</p>
        <p className='text-red-700 mt-5'>{error ? error : ''}</p>

        <button onClick={handleShowListings} className='text-green-600 w-full border border-green-600 p-3 rounded-lg '>Show Listings</button>
    
        <p className='text-red-700 mt-5'>{showListingError ? "Error showing Listings" : ''}</p>

        {userListings && userListings.length>0 && 
        <div className='flex flex-col gap-3'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>

        {userListings.map((listing)=>(
          <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4 shadow-sm'>

          <Link to={`/listing/${listing._id}`} >
            <img src={listing.imageUrls[0]} alt="listing cover" className='object-contain h-16 w-16 rounded-lg'/>
          </Link>
          <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`} >
           <p >{listing.name}</p>
          </Link>

          <div className='flex flex-col gap-2'>
            <button className='text-red-700 uppercase'>Delete</button>
            <button className='text-green-700 uppercase'>Edit</button>
          </div>
          </div>
        ))}
        </div>
        }
    </div>
  )
}

export default Profile