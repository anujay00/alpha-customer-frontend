import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'SIZE'} text2={'CHART'} />
      </div>
      <div className='my-10 flex flex-col gap-16'>
        {/* Image now appears at the top */}
        <img 
          className='w-full mx-auto md:max-w-[600px]' 
          src={assets.sizechart} 
          alt="sizechart" 
        />
        {/* Three paragraph tags after the image */}
        <div className='flex flex-col gap-6 text-gray-600 text-justify'>
          <p>At ALPHA, we understand that the perfect fit is key to feeling confident and comfortable. That's why we offer a wide range of sizes to cater to every body type. Whether you're looking for something fitted or relaxed, our sizing options ensure you find the perfect match for your style and comfort.</p>
          <p>We believe comfort should never be compromised for style. Our clothing is designed with both in mind, using soft, breathable fabrics that provide all-day comfort. From casual wear to more formal pieces, each item is crafted to move with you, offering flexibility without sacrificing the latest fashion trends.</p>
          <p>At ALPHA, customer satisfaction is our top priority. We are committed to providing an exceptional shopping experience with secure transactions, fast shipping, and dedicated customer support. We believe in building lasting relationships with our customers based on trust, reliability, and excellence in service.</p>
        </div>
      </div>
    </div>
  )
}

export default About