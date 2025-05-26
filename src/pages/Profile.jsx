import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Profile = () => {
  const { token, user, setUser, backendUrl, navigate } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Load user reviews
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/review/user`, {
          headers: { token }
        });
        
        if (response.data.success) {
          setReviewCount(response.data.reviews.length);
        }
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
    };
    
    // Load user orders
    const fetchUserOrders = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
          headers: { token }
        });
        
        if (response.data.success) {
          setOrderCount(response.data.orders.length);
        }
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };
    
    fetchUserReviews();
    fetchUserOrders();
  }, [token, navigate, backendUrl]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 h-40 rounded-lg mb-4"></div>
          <p>Loading profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 p-6 flex flex-col md:flex-row items-center border-b">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <img 
                src={assets.profile_icon} 
                alt="Profile" 
                className="w-12 h-12 opacity-50"
              />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {user.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })
                : 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-md shadow-sm">
                  <p className="text-3xl font-bold text-blue-600">{orderCount}</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div className="text-center p-3 bg-white rounded-md shadow-sm">
                  <p className="text-3xl font-bold text-green-600">{reviewCount}</p>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => navigate('/orders')}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition rounded"
                >
                  View My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 