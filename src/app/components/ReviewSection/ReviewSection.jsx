"use client";
import { useState } from "react";
import Image from 'next/image';

const ReviewsSection = () => {
  // State to manage the visible reviews
  const [visibleReviews, setVisibleReviews] = useState(2);

  // State to manage user comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    occupation: "",
    message: ""
  });

  // Predefined set of avatar images
  const avatarImages = [
    "/images/avatar1.png",
    "/images/avatar2.png",
    "/images/avatar3.png",
    "/images/avatar4.png",
    "/images/avatar5.png"
  ];

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      name: "Alex Stanton",
      date: "21 July 2022",
      role: "CEO at Bukalapak",
      text: "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      image: "/images/review-1.svg",
    },
    {
      id: 2,
      name: "Skylar Dias",
      date: "20 July 2022",
      role: "CEO at Amazon",
      text: "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      image: "/images/review-2.svg",
    },
    {
      id: 3,
      name: "Emma Watson",
      date: "19 July 2022",
      role: "Marketing Manager at Google",
      text: "Morent App offers fantastic services with excellent car options. Their support team is responsive and very professional.",
      image: "/images/review-1.svg",
    },
    {
      id: 4,
      name: "John Doe",
      date: "18 July 2022",
      role: "CTO at Microsoft",
      text: "Using Morent App has been a wonderful experience. Affordable prices and excellent car variety are their strong points.",
      image: "/images/review-2.svg",
    },
  ];

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 2); // Load 2 more reviews
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.name.trim() !== "" && newComment.message.trim() !== "") {
      const randomImage = avatarImages[Math.floor(Math.random() * avatarImages.length)];
      setComments([...comments, { 
        ...newComment, 
        date: new Date().toLocaleDateString(),
        image: randomImage
      }]);
      setNewComment({ name: "", occupation: "", message: "" });
    }
  };

  return (
    <div className="py-12 max-w-[1450px] mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-6 mb-5 ml-5">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <span className="text-white bg-[#3563E9] px-4 py-2 rounded-lg">
            {reviews.length}
          </span>
        </div>

        <div className="flex flex-col bg-white shadow-md w-full rounded-lg">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-lg flex space-x-7 w-full border-b last:border-b-0"
            >
              <div>
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={review.name}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">{review.name}</h3>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400 mt-4">{review.role}</p>
                  <Image
                    src="/images/review-stars.svg"
                    alt="Rating"
                    width={100}
                    height={20}
                  />
                </div>
                <p className="mt-4 text-gray-600 leading-8 text-base">
                  {review.text}
                </p>
              </div>
            </div>
          ))}

          {/* "Show More" Button */}
          {visibleReviews < reviews.length && (
            <div className="text-center my-10">
              <button
                onClick={handleShowMore}
                className="text-gray-400 hover:underline flex items-center justify-center space-x-2 text-center mx-auto"
              >
                <span>Show All</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.7l3.71-3.47a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* User Comments Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">User Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className="bg-white p-4 rounded-lg mb-4 flex items-start space-x-4 shadow-sm">
                <div className="flex-shrink-0">
                  <Image
                    src={comment.image || "/placeholder.svg"}
                    alt={comment.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">{comment.name}</h4>
                    <p className="text-sm text-gray-500">{comment.date}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{comment.occupation}</p>
                  <p className="text-gray-700">{comment.message}</p>
                </div>
              </div>
            ))}
            <form onSubmit={handleAddComment} className="mt-6 bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-4">Add Your Comment</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newComment.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={newComment.occupation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={newComment.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3563E9] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;

