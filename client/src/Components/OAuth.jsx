import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import { signinSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGoogleClick=async()=>{
        try {
            console.log("start")
            const provider =new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' }); 
            const auth =getAuth(app);

            const result =await signInWithPopup(auth,provider);
          //  console.log(result)

           const res =await fetch('/api/v1/auth/google',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL}),
           });

           const data =await res.json();

          // console.log(data);

            dispatch(signinSuccess(data));
            navigate('/')
            
        } catch (error) {
            console.log(error)
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