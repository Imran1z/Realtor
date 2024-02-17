import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import { signinSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const OAuth = () => {
    const dispatch = useDispatch();

    const handleGoogleClick=async()=>{
        try {
            const provider =new GoogleAuthProvider();
            const auth =getAuth(app);

            const result =await signInWithPopup(auth,provider);
           // console.log(result)

           const res =await fetch('/api/auth/google',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
           });

           const data =await res.json();

           console.log(data);
            // if (data.success === false) {
            //     console.log(data.message)
            //     return;
            // }

            dispatch(signinSuccess(data))
            
        } catch (error) {
            console.log('could not sign in with google')
        }
    }
    return (
        <button
          onClick={handleGoogleClick}
          type='button'
          className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
          Continue with google
        </button>
      );
}

export default OAuth