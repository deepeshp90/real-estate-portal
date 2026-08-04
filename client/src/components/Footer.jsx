import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-slate-800 text-slate-300 mt-10'>
      <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-8'>
        <div>
          <h1 className='font-bold text-lg text-white mb-3'>
            <span className='text-slate-400'>Deepesh</span>Estate
          </h1>
          <p className='text-sm text-slate-400'>
            Find your next perfect place to live with ease. Wide range of
            properties for rent and sale.
          </p>
        </div>

        <div>
          <h2 className='text-white font-semibold mb-3'>Connect with us</h2>
          <div className='flex gap-4 text-lg'>
            <a href='https://www.facebook.com/deepesh.pandey.3958/' aria-label='Facebook' className='hover:text-white'><FaFacebook /></a>
            <a href='https://www.instagram.com/deepesh_pandey1?igsh=MzNpMTJud2hvNWh5' aria-label='Instagram' className='hover:text-white'><FaInstagram /></a>
            <a href='https://x.com/deepeshp451' aria-label='Twitter' className='hover:text-white'><FaTwitter /></a>
            <a href='mailto:deepeshp451@gmail.com' aria-label='Email' className='hover:text-white'><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className='border-t border-slate-700 text-center text-xs text-slate-500 py-4'>
        &copy; {new Date().getFullYear()} Deepesh Estate. All rights reserved.
      </div>
    </footer>
  );
}