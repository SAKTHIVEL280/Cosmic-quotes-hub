import { useState } from "react";
import { QuoteCard } from "@/components/QuoteCard";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Temporary data - would come from backend
const preloadedQuotes = [
  {
    quote: "The stars don't look bigger, but they do look brighter.",
    author: "Sally Ride",
    category: "Inspiration",
    likes: 42,
  },
  {
    quote: "That's one small step for man, one giant leap for mankind.",
    author: "Neil Armstrong",
    category: "History",
    likes: 156,
  },
  {
    quote: "The universe is not required to make sense to you.",
    author: "Neil deGrasse Tyson",
    category: "Wisdom",
    likes: 89,
  },
  {
    quote: "Life is what happens while you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
    likes: 120,
  },
  {
    quote: "To infinity and beyond!",
    author: "Buzz Lightyear",
    category: "Humor",
    likes: 95,
  },
];

const categories = [
  "All",
  "Inspiration",
  "History",
  "Wisdom",
  "Life",
  "Humor",
  "Love",
  "Success",
  "Happiness",
];

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredQuotes = selectedCategory === "All" 
    ? preloadedQuotes
    : preloadedQuotes.filter(quote => quote.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-space-purple to-space-light p-4 md:p-8 relative overflow-hidden">
      {/* Enhanced stars background with more stars and varying sizes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `radial-gradient(circle at center, #fff, rgba(255,255,255,0.5))`,
              boxShadow: '0 0 4px #fff',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-float">
            QuoteGalaxy
          </h1>
          <p className="text-xl text-white/80">Where words find their universe!</p>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:scale-105"
          >
            {showForm ? "Browse Quotes" : "Share Your Quote"}
          </Button>

          {!showForm && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {showForm ? (
          <div className="animate-fade-in">
            <QuoteForm />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredQuotes.map((quote, index) => (
              <QuoteCard key={index} {...quote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;