"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

// interface ProductReviewsProps {
//     productId: string,
//     userId:String
// }

const ProductReviews = (props) => {
  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const getAllReviews = async () => {
    const { productId } = props;
    try {
      const res = await axios.get(
        `http://localhost:5001/rating/getAll/${productId}`
      );
      setReviews(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);

  const addReview = async () => {
    try {
      const { productId, userId } = props;
      const data = {
        ...newReview,
        productId,
        userId,
      };
      const res = await axios.post("http://localhost:5001/rating", data);

      setReviews([...reviews, res?.data?.rating]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleCommentChange = (e) => {
    setNewReview({ ...newReview, comment: e.target.value });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // const id = reviews.length + 1; // Generate unique ID for new review
    // setReviews([...reviews, { ...newReview, id }]);
    // setNewReview({ rating: 0, user: '', comment: '' }); // Clear the form after submission
    addReview();
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div className="product-reviews">
      <h2 className="text-xl font-semibold mb-4">Product Reviews</h2>
      <form onSubmit={handleSubmitReview}>
        <div className="flex items-center mb-4">
          {/* Render star icons for rating */}
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              onClick={() => handleRatingChange(index)}
              className={`cursor-pointer text-2xl ${
                index <= newReview.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              style={{
                color: `${index <= newReview.rating ? "gold" : "gray"}`,
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={newReview.comment}
          onChange={handleCommentChange}
          placeholder="Write your review..."
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Submit Review
        </button>
      </form>
      {/* Display existing reviews */}
      {reviews.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {reviews.map((review) => (
            <li key={review._id} className="border-b border-gray-300 pb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">
                  {review.rating} <span style={{ color: "gold" }}>★</span>
                </span>
                <span className="text-gray-600">{review?.userId?.name}</span>
                {/* <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button> */}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;
