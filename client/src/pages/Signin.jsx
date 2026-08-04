// // import React from 'react';
// // import { Link,useNavigate } from 'react-router-dom'
// // import { useState } from 'react'
// // import { useDispatch } from 'react-redux';
// // import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice.js'
// // import { useSelector } from 'react-redux';
// // import OAuth from '../components/OAuth.jsx';


// // const SignIn = () => {
 
// //   const [formData, setFormData] = useState({})
  
// //   const { loading, error } = useSelector((state) => state.user);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();  

// //   const handleChange = (e) => {
// //     setFormData(
// //       {
// //         ...formData,
// //         [e.target.id]: e.target.value
// //       }
// //     )
// //   };
  
// //   const handleSubmit =async (e) => {
// //     e.preventDefault();
// //     try {
// //       dispatch(signInStart());
// //       const res = await fetch('/api/auth/signin', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });
// //       const data = await res.json();
// //       console.log(data);
// //       if (data.success === false) {
// //         dispatch(signInFailure(data.message));
// //         return;
// //       }
// //       // dispatch(signInSuccess(data.user));
// //        dispatch(signInSuccess(data));
// //       navigate('/');
// //     } catch (error) {
// //       dispatch(signInFailure(error.message));
// //     }
// //   };
// //   // console.log(formData)

// //   return (
// //     <div className='p-3 max-w-lg mx-auto'> 
// //       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

// //       <form onSubmit={handleSubmit} className='flex flex-col  gap-4'>
// //         <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
// //         <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>

// //         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
// //           {loading ? 'Loading...' : 'Sign In'}
// //         </button>
// //         {error && <p className='text-red-700 text-center'>{error}</p>}
// //         <OAuth></OAuth>
// //       </form>

// //       <div className='flex gap-2 mt-5'>
// //         <p> Don't have an account ?</p>
// //         <Link to={"/signup"} className='text-blue-700 hover:underline'>
// //           <span className='text-blue-700'>Sign Up</span>
// //         </Link>
// //       </div>
// //     </div>
// //   )
// // }

// // export default SignIn

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submit clicked. Data:", formData); // DEBUG LOG
    
//     try {
//       dispatch(signInStart());
//       console.log("Starting fetch request..."); // DEBUG LOG

//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//         credentials: 'include',
//       });

//       console.log("Response received. Status:", res.status); // DEBUG LOG

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({ message: 'Server error' }));
//         console.log("Error data:", errorData); // DEBUG LOG
//         dispatch(signInFailure(errorData.message || 'Login failed'));
//         return;
//       }

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       navigate('/');
//     } catch (error) {
//       console.error("Catch block error:", error); // DEBUG LOG
//       dispatch(signInFailure("Cannot connect to server. Check your backend terminal."));
//     }
//   };

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='email'
//           placeholder='email'
//           className='border p-3 rounded-lg'
//           id='email'
//           onChange={handleChange}
//           required // Added required
//         />
//         <input
//           type='password'
//           placeholder='password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//           required // Added required
//         />

//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//         >
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
//         <OAuth/>
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Dont have an account?</p>
//         <Link to={'/sign-up'}>
//           <span className='text-blue-700'>Sign up</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // FIX: Force reset loading state if it was stuck from a previous session
  useEffect(() => {
    dispatch(signInFailure(null)); 
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure("Server is down. Check your terminal."));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} required />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} required />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}><span className='text-blue-700'>Sign up</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

