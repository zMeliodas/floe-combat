import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="w-4 h-4 text-floesky" />
      ) : (
        <FaRegStar key={i} className="w-4 h-4 text-floesky" />
      ),
    )}
  </div>
);

export default StarRating;
