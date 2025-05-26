import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';


const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reviews');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { token, user } = useContext(ShopContext);
  

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/review/product/${productId}`);
      const data = await response.json();
      
      if (data.success) {
        console.log("Fetched reviews:", data.reviews);
        setReviews(data.reviews);
      } else {
        console.error("Error fetching reviews:", data.message);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleAddReview = () => {
    if (!token) {
      alert('Please login to add a review');
      return;
    }
    setIsFormVisible(true);
  };

  const handleReviewAdded = () => {
    fetchReviews();
    setIsFormVisible(false);
  };

  const handleDelete = async (reviewId) => {
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/review/delete/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchReviews();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-20">
      <div className="flex">
        <button 
          className={`border px-5 py-3 text-sm ${activeTab === 'description' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === 'description' ? (
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      ) : (
        <div className="border p-6">
          {/* Review Summary */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h3 className="text-xl font-medium mb-2">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img 
                    key={star}
                    src={star <= Math.round(averageRating) ? assets.star_icon : assets.star_dull_icon} 
                    alt="" 
                    className="w-4" 
                  />
                ))}
                <span className="text-sm ml-1">
                  {averageRating.toFixed(1)} out of 5 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>
            
            {!isFormVisible && (
              <button 
                onClick={handleAddReview}
                className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800"
              >
                Write a Review
              </button>
            )}
          </div>

          {/* Add Review Form */}
          {isFormVisible && (
            <ReviewForm 
              productId={productId} 
              onCancel={() => setIsFormVisible(false)} 
              onSuccess={handleReviewAdded} 
            />
          )}

          {/* Reviews List */}
          {isLoading ? (
            <p className="text-center py-4">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="space-y-6 mt-6">
              {reviews.map((review) => (
                <ReviewItem 
                  key={review._id} 
                  review={review} 
                  currentUserId={user?._id}
                  onDelete={handleDelete}
                  onUpdate={fetchReviews}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewSection; 

