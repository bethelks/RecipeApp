import React, { useState } from 'react';

const RecipeReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted review:', { rating, review });
  
    // Replace 'your-api-endpoint-url' with your actual API URL
    const apiUrl = 'https://yourapi.com/api/yourcontroller/add';
  
    // Construct query parameters
    const params = new URLSearchParams({
      id: 'your-item-id',     // Replace with your actual item ID
      rating: rating.toString(),
      review: review
    });
  
    // Send GET request to the API
    fetch(`${apiUrl}?${params.toString()}`, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      // Optionally, show success message or update UI
    })
    .catch(error => {
      console.error('Error adding review:', error);
      // Optionally, show error message
    });
  
    // Reset form
    setRating(0);
    setReview('');
  };

  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block font-medium mb-1">Rating</label>
          <select
            className="w-full border rounded p-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value="">Select a rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Review</label>
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            placeholder="Write your thoughts..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default RecipeReview;
