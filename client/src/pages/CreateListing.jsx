import React, { useState } from 'react'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import {app} from '../firebase.js'


const CreateListing = () => {
    const [files,setFiles]=useState([]);
    const [formData,setFormData]=useState({
        imageUrls:[],
    });
    const [imageUploadError, setImageUploadError] = useState("");
    const [loadingUploadImage, setloadingUploadImage] = useState(false)
   // console.log(files)
   console.log(formData);

    const handleimageSubmit=()=>{
        setloadingUploadImage(true)
        setImageUploadError("");
        if (files.length>0 && files.length + formData.imageUrls.length<7) {
            
            const promises =[];
            
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
                setImageUploadError("");
                setloadingUploadImage(false)
                
                
            }).catch((err)=>{
                setImageUploadError("Image upload failed (2 mb max per image)");
                setloadingUploadImage(false)
            })
            
        }else if(files.length==0){
            setImageUploadError("You have to upload at least one image")
            setloadingUploadImage(false)
        }
        
        else {
            setImageUploadError("You can only upload 6 images per listing")
            setloadingUploadImage(false)
        }


    }



 const storeImage=async(file)=>{
    return new Promise((resolve, reject)=>{
        const storage=getStorage(app);
        const fileName=new Date().getTime()+file.name;
        const storageRef= ref(storage,fileName);
        const uploadTask =uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',
        (snapshot)=>{
            const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
            console.log("error uploading in the create listing",error);
           reject(error);
          },
        
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
             // setFormData({ ...formData, avatar: downloadURL })
             resolve(downloadURL)
            );
          }
        
        
        
        )

    })
 }


    const handleRemoveImage=(index)=>{
        setFormData({
            ...formData,imageUrls:formData.imageUrls.filter((_,i)=>i !==index)
        })
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='60' minLength='10' required />

                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />

                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='adress' required />

                <div className=' flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sell' className='w-5'/>
                        <span className='font-semibold'>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5'/>
                        <span className='font-semibold'>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5'/>
                        <span className='font-semibold'>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5'/>
                        <span className='font-semibold'>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5'/>
                        <span className='font-semibold'>Offer</span>
                    </div>
                </div>


                <div className='flex flex-wrap gap-6'>
                    <div className='flex gap-2 items-center'>
                        <input type="number" id='bedrooms' min='1' max='10' required  className='p-3 border border-gray-300 rounded-lg'/>
                        <p className='font-semibold'>Bedrooms</p>
                    </div>


                    <div className='flex gap-2 items-center'>
                        <input type="number" id='bathrooms' min='1' max='10' required  className='p-3 border border-gray-300 rounded-lg'/>
                        <p className='font-semibold'>Bathrooms</p>
                    </div>



                    <div className='flex gap-2 items-center'>
                        <input type="number" id='regularPrice' min='100' max='1000000' required  className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                              <p className='font-semibold'>Regular Price</p>
                              <p className=' text-xs'>($ / Month)</p>                       
                              
                        </div>
                    </div>


                    <div className='flex gap-2 items-center'>
                        <input type="number" id='discountPrice' min='100' max='1000000' required  className='p-3 border border-gray-300 rounded-lg'/>
                        <div className='flex flex-col items-center'>
                              <p className='font-semibold'>Discounted Price</p>
                              <p className=' text-xs'>($ / Month)</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex flex-col flex-1  gap-4'>
                <p className='font-semibold'>Images: <span className='font-normal text-gray-600'>The First image will be the cover (max 6)</span></p>

                <div className='flex gap-4'>
                    <input onChange={(e)=>setFiles(e.target.files )} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='images/*' multiple/>
                    <button type='button' disabled={loadingUploadImage} onClick={handleimageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-md disabled:opacity-80'>{loadingUploadImage?"Uploading...":"Upload"}</button>
                </div>
                <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
                        {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                    // You need to return the JSX element from within map function
                    return (
                        <div key={index} className='flex justify-between p-3 border shadow-md'>
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg '/>
                        <button type='button' onClick={()=>handleRemoveImage(index)} className='text-red-500 p-3 uppercase rounded-lg hover:opacity-75'>Delete</button>
                        </div>
                    );
                })
            }


                <button
                    // disabled={loading}
                    className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
                    >
                    {/* {loading ? 'Loading...' : 'Update'} */}
                    Create Listing
                </button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing