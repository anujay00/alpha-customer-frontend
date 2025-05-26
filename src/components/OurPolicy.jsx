import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Easy Return and Exchange Policy</p>
        <p className=' text-gray-400'>Return or exchange items within 7 days with no hassle — your satisfaction is our priority.</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Best quality on the island.</p>
        <p className=' text-gray-400'>We source premium materials to ensure top-tier comfort and lasting wear.</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Customor Care ChatBot.</p>
        <p className=' text-gray-400'>Get instant answers and support anytime with our chatbot service.</p>
      </div>

    </div>
  )
}

export default OurPolicy
