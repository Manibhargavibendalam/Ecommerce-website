import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({rating,handleRatingChange}) {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button 
      key={star}
      variant="outline"
      size="icon"
      className={`p-2 rounded-full transition-colors hover:bg-yellow-200 ${
        star <= rating 
          ? 'text-yellow-500' 
          : 'text-black'
      }`}
      onClick={ handleRatingChange ? ()=> handleRatingChange(star) : null }
    >
      <StarIcon 
        className={`w-6 h-6 transition-colors ${
          star <= rating 
            ? 'fill-yellow-500' 
            : 'fill-black'
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;

