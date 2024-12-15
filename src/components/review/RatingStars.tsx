import { useState } from "react";

type RatingStarProps = {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const RatingStar: React.FC<RatingStarProps> = ({ rating, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${star <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
            ))}
        </div>
    );
};

export default RatingStar;