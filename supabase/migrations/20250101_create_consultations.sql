-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Common fields
  name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  visa_type TEXT,

  -- Consultation type: 'telecom', 'loan', 'visa', 'other'
  consultation_type TEXT NOT NULL,

  -- Service-specific data stored as JSON
  form_data JSONB DEFAULT '{}'::jsonb,

  -- Status management
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')),
  admin_notes TEXT,

  -- Privacy consent
  privacy_consent BOOLEAN DEFAULT false NOT NULL,

  -- Timestamps
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_type ON consultations(consultation_type);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can insert (submit consultation)
CREATE POLICY "Anyone can submit consultation"
  ON consultations
  FOR INSERT
  TO public
  WITH CHECK (privacy_consent = true);

-- RLS Policy: Only authenticated admins can view all consultations
CREATE POLICY "Admins can view all consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Only authenticated admins can update consultations
CREATE POLICY "Admins can update consultations"
  ON consultations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Only authenticated admins can delete consultations
CREATE POLICY "Admins can delete consultations"
  ON consultations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to auto-update updated_at
CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
