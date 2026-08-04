// import React, { useRef, useState, useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import {Link} from 'react-router-dom'
// import { updateUserStart,

//     updateUserSuccess,
//     updateUserFailure ,
//     deleteUserFailure,
//     deleteUserSuccess,
//     deleteUserStart,
//     SignOutUserStart,
//     SignOutUserSuccess,
//     SignOutUserFailure


//  } from '../redux/user/userSlice.js';



// const Profile = () => {
//  const { currentUser, loading, error } = useSelector((state) => state.user);
//   const fileRef = useRef(null);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showListingsError, setShowListingError] = useState(false);
//   const [userListings,setUserListiings] = useState([]);
//   const dispatch = useDispatch();

  
//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = async (file) => {
//     if (file.size > 2 * 1024 * 1024) {
//       setFileUploadError(true);
//       return;
//     }

//     const data = new FormData();
//     data.append('file', file);
//     data.append('upload_preset', 'realstate_upload');
//     data.append('cloud_name', 'mgcwmxjx');

//     try {
//       setFileUploadError(false);
//       setFilePerc(10);
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/mgcwmxjx/image/upload`,
//         { method: 'POST', body: data }
//       );
//       setFilePerc(70);
//       const uploadedImage = await res.json();

//       if (uploadedImage.error) {
//         setFileUploadError(true);
//         return;
//       }

//       setFilePerc(100);
//       setFormData({ ...formData, avatar: uploadedImage.secure_url });
//     } catch (error) {
//       setFileUploadError(true);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', 
//         body: JSON.stringify(formData),
//       });


//        const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data.user));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   const handleDeleteUser = async () => {
//     try{
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }

//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   }

//   const handleSignOut = async() => {
//     try {
//       dispatch(SignOutUserStart());
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if(data.success === false){

//         dispatch(deleteUserFailure(data.message))
//         return
//       }
//       dispatch(deleteUserSuccess(data))

//     } catch (error) {
//       dispatch(deleteUserFailure(data.message))
//     }
//   }
//   const handleShowListings = async()=>{
//     try {
//       setShowListingError(false)
//       const res = await fetch(`/api/user/listings/${currentUser._id}`, {
//       credentials: 'include',    
//     });
//       const data = await res.json();
//       if(data.success === false){

//         setShowListingError(true);
//         return
//       }
//       setUserListiings(data)
      
//     } catch (error) {
//       setShowListingError(true);
      
//     }
//   }

//   return (
//     <div className='max-w-lg mx-auto p-3'>
//       <h1 className='text-2xl font-semibold text-center my-7'>Profile</h1>

//       <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type='file'
//           ref={fileRef}
//           hidden
//           accept='image/*'
//         />

//         <img
//           onClick={() => fileRef.current.click()}
//           src={formData?.avatar || currentUser.avatar}
//           alt='Profile'
//           className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
//         />

//         <p className='text-sm self-center'>
//           {fileUploadError ? (
//             <span className='text-red-700'>Error uploading image (must be less than 2 MB)</span>
//           ) : filePerc > 0 && filePerc < 100 ? (
//             <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
//           ) : filePerc === 100 ? (
//             <span className='text-green-700'>Image successfully uploaded!</span>
//           ) : (
//             ''
//           )}
//         </p>

//         <input type='text'onChange={handleChange}  placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' />
//         <input type='text'onChange={handleChange}  placeholder='email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg' />
//         <input type='password' onChange={handleChange} placeholder='password' id='password' className='border p-3 rounded-lg' />
//         <button  disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition-colors disabled:opacity-80'>
//           {loading ? 'loading...' : 'Update'}
//         </button>
//         <Link  className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
//         Create Listing
//         </Link>
//       </form>

//       <div className='flex justify-between mt-4'>
//         <span  onClick={handleDeleteUser} className='text-red-500 cursor-pointer hover:underline'>Delete Account</span>
//         <span onClick={handleSignOut} className='text-slate-700 cursor-pointer hover:underline ml-4'>Sign out</span>
//       </div>
//       {/* <p className='text-red-500' mt-5>{error ? error : ''}</p> */}
//       <p className='text-green-500' mt-5>{updateSuccess ? 'Profile updated successfully!' : ''}</p>
//       <button className='text-green-700 w-full' onClick={handleShowListings}> Show Listings</button>
//       <p className=''>{showListingsError ? 'Error showing Listing ': ''} </p>
//       {
//         userListings && userListings.length > 0 && userListings.map((listing)=><div key={listing._id} className='' >
//           <link to={`/listing/${listing._id}`}>

//           <img src='listing.imageUrls[0]' alt='listing cover'></img>
          
//           </link>
          

//           </div>)
//       }
//     </div>
//   )
// }

// export default Profile
import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  SignOutUserStart,
  SignOutUserSuccess,
  SignOutUserFailure
} from '../redux/user/userSlice.js';


const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingError] = useState(false);
  const [userListings, setUserListiings] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'realstate_upload');
    data.append('cloud_name', 'mgcwmxjx');

    try {
      setFileUploadError(false);
      setFilePerc(10);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/mgcwmxjx/image/upload`,
        { method: 'POST', body: data }
      );
      setFilePerc(70);
      const uploadedImage = await res.json();

      if (uploadedImage.error) {
        setFileUploadError(true);
        return;
      }

      setFilePerc(100);
      setFormData({ ...formData, avatar: uploadedImage.secure_url });
    } catch (error) {
      setFileUploadError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.user));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch('/api/auth/signout', {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignOutUserFailure(data.message))
        return
      }
      dispatch(SignOutUserSuccess(data))

    } catch (error) {
      dispatch(SignOutUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return
      }
      setUserListiings(data)

    } catch (error) {
      setShowListingError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListiings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          alt='Profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error uploading image (must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type='text' onChange={handleChange} placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' />
        <input type='text' onChange={handleChange} placeholder='email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg' />
        <input type='password' onChange={handleChange} placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition-colors disabled:opacity-80'>
          {loading ? 'loading...' : 'Update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-4'>
        <span onClick={handleDeleteUser} className='text-red-500 cursor-pointer hover:underline'>Delete Account</span>
        <span onClick={handleSignOut} className='text-slate-700 cursor-pointer hover:underline ml-4'>Sign out</span>
      </div>

      <p className='text-red-500 mt-5'>{error ? error : ''}</p>
      <p className='text-green-500 mt-5'>{updateSuccess ? 'Profile updated successfully!' : ''}</p>

      <button className='text-green-700 w-full' onClick={handleShowListings}>Show Listings</button>
      <p className='text-red-700'>{showListingsError ? 'Error showing Listing' : ''}</p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col items-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile