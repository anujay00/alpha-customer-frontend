import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ReviewForm from './ReviewForm';

const ReviewItem = ({ review, currentUserId, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useContext(ShopContext);
  
  useEffect(() => {
    if (review && review.image) {
      console.log("Review image URL:", review.image);
    }
  }, [review]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if the current user is the author of this review
  const isOwner = currentUserId && review.user && currentUserId === review.user._id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDelete(review._id);
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    onUpdate();
  };

  if (isEditing) {
    return (
      <ReviewForm
        productId={review.product}
        reviewToEdit={review}
        onCancel={() => setIsEditing(false)}
        onSuccess={handleEditSuccess}
      />
    );
  }

  return (
    <div className="border-b pb-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="mb-1 font-medium">{review.user?.name || 'Anonymous'}</div>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={star <= review.rating ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-3.5 mr-0.5"
              />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              {formatDate(review.date)}
            </span>
          </div>
        </div>

        {isOwner && token && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

      {review.image && (
        <div className="mt-3">
          <img 
            src={review.image} 
            alt="Review" 
            className="max-h-40 rounded-md object-cover"
            onLoad={() => console.log("Image loaded successfully")}
            onError={(e) => {
              console.error("Error loading image:", review.image);
              // Try with a proxy if direct loading fails
              if (!e.target.dataset.retried) {
                console.log("Retrying with CORS proxy");
                e.target.dataset.retried = "true";
                // Use the direct URL as fallback (no proxy)
                e.target.src = review.image.replace(/^http:/, 'https:');
              } else {
                // If retry fails, use fallback image
                e.target.src = assets.star_dull_icon;
                e.target.className = "w-10 h-10";
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewItem; 