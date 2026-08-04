export default function About() {
  return (
    <div className='max-w-4xl mx-auto px-6 py-14'>

      {/* Hero split */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mb-10'>
        <div>
          <p className='text-xs font-semibold text-blue-700 tracking-wide mb-2'>
            SINCE 2013
          </p>
          <h1 className='text-3xl font-bold text-slate-700 mb-4 leading-tight'>
            Real estate, made personal
          </h1>
          <p className='text-slate-600 leading-7'>
            We help clients buy, sell, and rent properties in the
            neighborhoods they actually want to live in — backed by local
            expertise and honest advice.
          </p>
        </div>
        <div className='h-48 rounded-xl overflow-hidden bg-slate-100'>
          <img
            src='/TeamPIC.jfif'
            alt='Our team'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className='border-t border-b border-slate-200 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10'>
        <div className='text-center'>
          <p className='text-xl font-bold text-slate-700'>500+</p>
          <p className='text-xs text-slate-500 mt-1'>Homes sold</p>
        </div>
        <div className='text-center'>
          <p className='text-xl font-bold text-slate-700'>12</p>
          <p className='text-xs text-slate-500 mt-1'>Years</p>
        </div>
        <div className='text-center'>
          <p className='text-xl font-bold text-slate-700'>30</p>
          <p className='text-xs text-slate-500 mt-1'>Agents</p>
        </div>
        <div className='text-center'>
          <p className='text-xl font-bold text-slate-700'>98%</p>
          <p className='text-xs text-slate-500 mt-1'>Satisfaction</p>
        </div>
      </div>

      {/* Values */}
      <div className='flex flex-col gap-6'>
        <div className='flex gap-4 items-start'>
          <span className='text-blue-700 text-xl mt-1'>🔍</span>
          <div>
            <p className='font-semibold text-slate-700 mb-1'>
              We find the right fit
            </p>
            <p className='text-sm text-slate-600'>
              Not just any listing — the one that matches your life.
            </p>
          </div>
        </div>
        <div className='flex gap-4 items-start'>
          <span className='text-blue-700 text-xl mt-1'>🛡️</span>
          <div>
            <p className='font-semibold text-slate-700 mb-1'>
              Honest, every step
            </p>
            <p className='text-sm text-slate-600'>
              No surprises, no pressure — just clear advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}