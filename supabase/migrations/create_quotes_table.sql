-- Create the quotes table
CREATE TABLE public.quotes (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

-- Add some sample data
INSERT INTO public.quotes (quote, author, category) VALUES
('The only way to do great work is to love what you do.', 'Steve Jobs', 'Motivation'),
('In three words I can sum up everything I've learned about life: it goes on.', 'Robert Frost', 'Life'),
('To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', 'Ralph Waldo Emerson', 'Wisdom');