// import React, { useEffect } from 'react'
// import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from '@firebase/auth'
// import { app } from '../firebase'
// import { useDispatch } from 'react-redux';
// import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice.js';
// import { useNavigate } from 'react-router-dom';

// const OAuth = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const auth = getAuth(app);
//         getRedirectResult(auth)
//           .then(async (result) => {
//             if (!result) return;
//             const res = await fetch('/api/auth/google', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({
//                 name: result.user.displayName,
//                 email: result.user.email,
//                 photo: result.user.photoURL
//               })
//             });
//             const data = await res.json();
//             dispatch(signInSuccess(data));
//             navigate('/');
//           })
//           .catch((error) => {
//             console.error('Error completing Google sign-in:', error);
//             dispatch(signInFailure(error.message));
//           });
//     }, []);

//     const handleGoogleClick = async () => {
//         try {
//             dispatch(signInStart());
//             const provider = new GoogleAuthProvider();
//             const auth = getAuth(app);
//             await signInWithRedirect(auth, provider);
//         } catch (error) {
//             console.error('Error starting Google auth:', error);
//             dispatch(signInFailure(error.message));
//         }
//     }
//   return (
//     <button onClick={handleGoogleClick} type='button' className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>
//       Continue with Google
//     </button>
//   )
// }

// export default OAuth

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // FIX: Using signInWithPopup is more reliable than redirect
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        credentials: 'include', // CRUCIAL for production
      });

      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
      dispatch(signInFailure(error.message));
    }
  };

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
