import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

const categories = [
  "Motivation",
  "Love",
  "Humor",
  "Life",
  "Success",
  "Wisdom",
  "Happiness",
];

export function QuoteForm() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('quotes')
        .insert([
          {
            quote,
            author,
            category,
            likes: 0
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your quote has been shared with the galaxy!",
      });

      // Reset form
      setQuote("");
      setAuthor("");
      setCategory("");
      
      // Refresh quotes list
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Error",
        description: "Failed to submit quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <Textarea
        placeholder="Enter your quote (max 250 characters)"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        maxLength={250}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        required
      />
      <Input
        placeholder="Author name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        required
      />
      <Select value={category} onValueChange={setCategory} required>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="w-full bg-space-purple hover:bg-space-light text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Quote"}
      </Button>
    </form>
  );
}