import React, { useState, useEffect } from 'react';

const TestImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cloudinaryInfo, setCloudinaryInfo] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(true);

  // Fetch Cloudinary info on component mount
  useEffect(() => {
    const fetchCloudinaryInfo = async () => {
      try {
        setIsTestingConnection(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/review/test-image`);
        const data = await response.json();
        
        if (data.success) {
          setCloudinaryInfo(data.cloudinary);
          // Set the test image URL automatically
          setImageUrl(data.cloudinary.testImage);
        } else {
          setError("Failed to get Cloudinary info: " + (data.error || "Unknown error"));
        }
      } catch (error) {
        console.error("Error testing Cloudinary:", error);
        setError("Connection error: " + error.message);
      } finally {
        setIsTestingConnection(false);
      }
    };

    fetchCloudinaryInfo();
  }, []);
  
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleTest = () => {
    if (!imageUrl) {
      setError('Please enter an image URL to test');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // For testing purposes only, no actual fetch needed
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const fixImageUrl = (url) => {
    if (!url) return '';
    // Ensure HTTPS
    return url.replace(/^http:/, 'https:');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cloudinary Image Test</h1>
      
      {isTestingConnection ? (
        <div className="text-center p-4">Testing Cloudinary connection...</div>
      ) : cloudinaryInfo ? (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="text-lg font-medium text-green-700 mb-2">Cloudinary Configuration</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Cloud Name:</strong> {cloudinaryInfo.cloudName || 'Not set'}</li>
            <li><strong>Connected:</strong> {cloudinaryInfo.connected ? '✅ Yes' : '❌ No'}</li>
            <li><strong>Test Image:</strong> {cloudinaryInfo.testImage}</li>
          </ul>
        </div>
      ) : null}
      
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">
          Image URL to Test
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={imageUrl}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter Cloudinary image URL to test"
          />
          <button
            onClick={handleTest}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Test
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      {imageUrl && (
        <div className="border p-4 rounded-md">
          <h2 className="text-lg font-medium mb-2">Image Preview</h2>
          <p className="text-sm text-gray-600 mb-3 break-all">{imageUrl}</p>
          
          <div className="mt-4 flex justify-center border p-4 bg-gray-50">
            <img
              src={fixImageUrl(imageUrl)}
              alt="Test"
              className="max-h-80 object-contain"
              onLoad={() => console.log("Image loaded successfully")}
              onError={(e) => {
                console.error("Error loading image:", imageUrl);
                if (!e.target.dataset.retried) {
                  console.log("Retrying with alternative URL format");
                  e.target.dataset.retried = "true";
                  
                  // Try a simpler URL format (removing transformations)
                  if (imageUrl.includes('/upload/')) {
                    const parts = imageUrl.split('/upload/');
                    if (parts.length > 1) {
                      const simpleUrl = parts[0] + '/upload/' + parts[1].split('/').pop();
                      e.target.src = fixImageUrl(simpleUrl);
                      return;
                    }
                  }
                  setError('Failed to load image with alternative format. Please check the URL.');
                }
              }}
            />
          </div>
          
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Troubleshooting</h3>
            <ul className="list-disc ml-4 text-sm space-y-1">
              <li>Make sure the URL uses HTTPS (not HTTP)</li>
              <li>Check that CORS is enabled on your Cloudinary account</li>
              <li>Verify that the image is public (not private)</li>
              <li>Try using a direct URL without transformation parameters</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestImage; 