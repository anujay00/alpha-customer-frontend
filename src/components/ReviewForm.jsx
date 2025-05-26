import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const ReviewForm = ({ productId, reviewToEdit, onCancel, onSuccess }) => {
  const { token, user } = useContext(ShopContext);
  const [rating, setRating] = useState(reviewToEdit ? reviewToEdit.rating : 5);
  const [comment, setComment] = useState(reviewToEdit ? reviewToEdit.comment : '');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(reviewToEdit && reviewToEdit.image ? reviewToEdit.image : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name, file.type, file.size);
      
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|gif)$/i)) {
        setError('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        console.log("Preview image set successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError('You must be logged in to submit a review');
      return;
    }
    
    if (comment.trim().length < 3) {
      setError('Please provide a valid comment (at least 3 characters)');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      const formData = new FormData();
      formData.append('userId', user._id);
      formData.append('productId', productId);
      formData.append('rating', rating);
      formData.append('comment', comment);
      
      if (image) {
        console.log("Appending image to form:", image.name, image.type, image.size);
        formData.append('image', image);
      }
      
      // Debug FormData contents
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        if (key === 'image') {
          console.log(key, ':', value.name, value.type, value.size);
        } else {
          console.log(key, ':', value);
        }
      }
      
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/review/add`;
      let method = 'POST';
      
      // If we're editing, change the endpoint and add reviewId
      if (reviewToEdit) {
        url = `${import.meta.env.VITE_BACKEND_URL}/api/review/update`;
        method = 'PUT';
        formData.append('reviewId', reviewToEdit._id);
      }
      
      console.log("Submitting to URL:", url);
      
      const response = await fetch(url, {
        method,
        headers: {
          'token': token
        },
        body: formData
      });
      
      if (!response.ok) {
        console.error("HTTP error:", response.status, response.statusText);
      }
      
      const data = await response.json();
      console.log("Response from server:", data);
      
      if (data.success) {
        console.log("Review submitted successfully with image:", data.review.image);
        onSuccess();
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-6">
      <h3 className="text-lg font-medium mb-4">{reviewToEdit ? 'Edit Your Review' : 'Write a Review'}</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <img 
                  src={star <= rating ? assets.star_icon : assets.star_dull_icon} 
                  alt={`${star} star`} 
                  className="w-6 h-6" 
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2 text-sm font-medium">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Write your review here..."
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Add Image (Optional)
          </label>
          
          {previewImage ? (
            <div className="relative inline-block">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="h-24 w-auto object-cover rounded-md" 
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          )}
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-4 py-2 rounded-md text-sm disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : reviewToEdit ? 'Update Review' : 'Submit Review'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm; 