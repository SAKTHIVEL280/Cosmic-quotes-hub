import { useState } from "react";
import { QuoteCard } from "@/components/QuoteCard";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";

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
];

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark to-space-purple p-4 md:p-8">
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            QuoteGalaxy
          </h1>
          <p className="text-xl text-white/80">Where words find their universe!</p>
        </header>

        <div className="mb-12">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="mx-auto block bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            {showForm ? "Browse Quotes" : "Share Your Quote"}
          </Button>
        </div>

        {showForm ? (
          <QuoteForm />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preloadedQuotes.map((quote, index) => (
              <QuoteCard key={index} {...quote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;