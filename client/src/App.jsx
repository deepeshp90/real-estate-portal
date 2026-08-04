

// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home.jsx'
// import About from './pages/About.jsx'
// import Contact from './pages/Contact.jsx'
// import Listing from './pages/Listing.jsx'
// import Signin from './pages/Signin.jsx'
// import SignUp from './pages/SignUp.jsx'
// import Profile from './pages/Profile.jsx'
// import Header from './components/Header.jsx'
// import PrivateRoute from './components/PrivateRoute.jsx'
// import CreateListing from './pages/CreateListing.jsx'
// import UpdateListing from './pages/UpdateListing.jsx';
// import Search from './pages/Search.jsx'
// import Footer from './components/Footer.jsx'



// const App = () => {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path='/search' element={<Search />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/listing/:listingId" element={<Listing />} />

//         <Route element={<PrivateRoute />}>
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/create-listing" element={<CreateListing />} />
//           <Route   path='/update-listing/:listingId'  element={<UpdateListing />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Listing from './pages/Listing.jsx'
import Signin from './pages/Signin.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx';
import Search from './pages/Search.jsx'
import Footer from './components/Footer.jsx'



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listing/:listingId" element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route   path='/update-listing/:listingId'  element={<UpdateListing />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App