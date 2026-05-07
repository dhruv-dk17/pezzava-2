-- Create Intern Records Table if it doesn't exist
CREATE TABLE IF NOT EXISTS intern_records (
    ref TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    father_name TEXT,
    college TEXT,
    role TEXT NOT NULL,
    duration TEXT,
    authority TEXT,
    company TEXT DEFAULT 'Pezzava',
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE intern_records ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (Idempotent)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON intern_records FOR SELECT USING (true);
    END IF;
END $$;

-- Create policy to allow public insert access (Idempotent)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert access') THEN
        CREATE POLICY "Allow public insert access" ON intern_records FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- Instructions:
-- 1. Go to your Supabase Dashboard
-- 2. Open the SQL Editor
-- 3. Paste this script and run it
