import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface QuoteCardProps {
  id: number;
  quote: string;
  author: string;
  category: string;
  likes: number;
}

export function QuoteCard({ id, quote, author, category, likes = 0 }: QuoteCardProps) {
  const [isLiking, setIsLiking] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const { error } = await supabase
        .from('quotes')
        .update({ likes: likes + 1 })
        .eq('id', id);

      if (error) throw error;

      // Refresh quotes list
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    } catch (error) {
      console.error('Error liking quote:', error);
      toast({
        title: "Error",
        description: "Failed to like quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check out this quote!',
        text: `"${quote}" - ${author}`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
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
            disabled={isLiking}
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors disabled:opacity-50"
          >
            <Heart className={cn("w-5 h-5")} />
            <span className="text-sm">{likes}</span>
          </button>
          <button 
            onClick={handleShare}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}