import React, { useState } from "react";
import "./ReviewComponent.css";


export default function ReviewComponent() {
 const [reviews, setReviews] = useState([]);
 const [rating, setRating] = useState(0);
 const [hover, setHover] = useState(0);
 const [text, setText] = useState("");


 const handleSubmit = () => {
   if (rating === 0 || text.trim() === "") {
     alert("Please provide a rating and a review.");
     return;
   }


   const newReview = { rating, text };
   setReviews([...reviews, newReview]);
   setRating(0);
   setText("");
 };


 const averageRating =
   reviews.length > 0
     ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
     : 0;


 return (
   <div className="review-section">
     <h2>Rate this recipe</h2>
     <div className="stars">
       {[...Array(5)].map((_, index) => {
         const starValue = index + 1;
         return (
           <span
             key={index}
             className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
             onClick={() => setRating(starValue)}
             onMouseEnter={() => setHover(starValue)}
             onMouseLeave={() => setHover(0)}
           >
             &#9733;
           </span>
         );
       })}
     </div>


     <textarea
       placeholder="Write your review..."
       value={text}
       onChange={(e) => setText(e.target.value)}
     />
     <button onClick={handleSubmit}>Submit Review</button>


     <div className="review-summary">
       <p>Average Rating: {averageRating.toFixed(1)} / 5</p>
       <p>Total Reviews: {reviews.length}</p>
     </div>


     <div className="review-list">
       {reviews.map((review, i) => (
         <div key={i} className="review-item">
           <div className="rating">
             {[...Array(review.rating)].map((_, i) => (
               <span key={i} className="filled">&#9733;</span>
             ))}
           </div>
           <p>{review.text}</p>
         </div>
       ))}
     </div>
   </div>
 );
}
