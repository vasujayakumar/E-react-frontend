import React, { useState } from 'react';
import backgroundImage from '../styles/screens/Feedback.jpg'; // Import your image
 // so yes
function TestimonialForm({ onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
 
  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };
 
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim() !== '') {
      // Create a testimonial object
      const testimonial = {
        user: 'John Doe', // You can replace this with the actual user
        rating,
        review,
        date: new Date().toISOString(),
      };
 
      // Pass the testimonial to the parent component for submission
      onReviewSubmit(testimonial);
 
      // Reset the form
      setRating(0);
      setReview('');
    }
  };
 
  const formStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain', // Use 'contain' or 'auto' to display the full image
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor: '#f9f9f9',
    minHeight: '600px',
    marginBottom: '100px', // You can adjust the value to push the footer down
  };
 
  const textareaStyles = {
    width: '50%',
    minHeight: '200px', // Set the desired height for the textarea
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };
 
  return (
    <div style={formStyles}>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value="0">Select a Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea id="review" value={review} onChange={handleReviewChange} style={textareaStyles}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default TestimonialForm;