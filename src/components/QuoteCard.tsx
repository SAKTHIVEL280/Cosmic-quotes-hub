import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  author: string;
  category: string;
  likes?: number;
}

export function QuoteCard({ quote, author, category, likes = 0 }: QuoteCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="relative p-6 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl animate-float hover:scale-105 transition-transform duration-300">
      <div className="mb-4">
        <p className="text-lg text-white mb-4">{quote}</p>
        <p className="text-sm text-white/80">- {author}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-full bg-space-purple/30 text-white">
          {category}
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <Heart className={cn("w-5 h-5", liked && "fill-red-500 text-red-500")} />
            <span className="text-sm">{likeCount}</span>
          </button>
          <button className="text-white/80 hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}