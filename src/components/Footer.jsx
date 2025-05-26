import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <Link to="/">
              <img src={assets.logo} className='mb-5 w-32' alt="" />
            </Link>
            <p className='w-full md:w-2/3 text-gray-600 text-justify'>
            At ALPHA, we're committed to providing you with the latest fashion trends and high-quality clothing to elevate your style. Our mission is to offer a seamless shopping experience with exceptional customer service and fast, reliable delivery. Join us and explore a world of fashion designed for your unique taste and lifestyle.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li onClick={() => navigate('/')} className="cursor-pointer hover:text-gray-900">Home</li>
                <li onClick={() => navigate('/about')} className="cursor-pointer hover:text-gray-900">About</li>
                <li onClick={() => navigate('/contact')} className="cursor-pointer hover:text-gray-900">Contact</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+9412345678</li>
                <li>alphaware@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <div className="py-5 text-sm flex justify-center items-center">
          <p className='text-center'>Copyright 2025@ ALPHA.com - All Right Reserved.</p>
          <button 
            onClick={scrollToTop}
            className="ml-5 p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer