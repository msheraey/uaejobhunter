
-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  gender TEXT,
  summary TEXT,
  cv_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile upsert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Title pool (shared catalog of job titles)
CREATE TABLE public.title_pool (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.title_pool TO anon, authenticated;
GRANT ALL ON public.title_pool TO service_role;
ALTER TABLE public.title_pool ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read titles" ON public.title_pool FOR SELECT USING (true);
CREATE POLICY "auth add titles" ON public.title_pool FOR INSERT TO authenticated WITH CHECK (true);

-- User titles
CREATE TABLE public.user_titles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, title)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_titles TO authenticated;
GRANT ALL ON public.user_titles TO service_role;
ALTER TABLE public.user_titles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own titles read" ON public.user_titles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own titles write" ON public.user_titles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own titles delete" ON public.user_titles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Job pool (scraped jobs - read only for users; backend writes via service role)
CREATE TABLE public.job_pool (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT,
  location TEXT,
  platform TEXT,
  url TEXT,
  salary TEXT,
  description TEXT,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.job_pool TO authenticated;
GRANT ALL ON public.job_pool TO service_role;
ALTER TABLE public.job_pool ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read jobs" ON public.job_pool FOR SELECT TO authenticated USING (true);

-- Per-user match scores
CREATE TABLE public.job_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.job_pool(id) ON DELETE CASCADE,
  match_score INT NOT NULL DEFAULT 0,
  applied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, job_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_matches TO authenticated;
GRANT ALL ON public.job_matches TO service_role;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own matches read" ON public.job_matches FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own matches update" ON public.job_matches FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Feedback
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INT,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.feedback TO authenticated, anon;
GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone submit feedback" ON public.feedback FOR INSERT WITH CHECK (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.phone)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed popular UAE titles
INSERT INTO public.title_pool (title) VALUES
  ('Software Engineer'), ('Senior Software Engineer'), ('Product Manager'),
  ('Data Analyst'), ('Data Scientist'), ('Marketing Manager'),
  ('Sales Manager'), ('Account Manager'), ('Project Manager'),
  ('Operations Manager'), ('HR Manager'), ('Finance Manager'),
  ('Accountant'), ('Business Development Manager'), ('Digital Marketing Specialist'),
  ('UX Designer'), ('UI Designer'), ('DevOps Engineer'),
  ('Customer Success Manager'), ('Executive Assistant'), ('Receptionist'),
  ('Civil Engineer'), ('Mechanical Engineer'), ('Procurement Manager'),
  ('Supply Chain Manager'), ('Regional Manager'), ('Brand Manager')
ON CONFLICT (title) DO NOTHING;
