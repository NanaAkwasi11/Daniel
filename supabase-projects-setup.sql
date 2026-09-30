-- Run this in the Supabase SQL Editor to enable Admin-added portfolio projects.

CREATE TABLE IF NOT EXISTS public.portfolio_project_admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.portfolio_project_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.portfolio_project_admins FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_portfolio_project_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.portfolio_project_admins
    WHERE user_id = (SELECT auth.uid())
  );
$$;

REVOKE ALL ON FUNCTION public.is_portfolio_project_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_portfolio_project_admin() TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_type TEXT NOT NULL DEFAULT 'website' CHECK (project_type IN ('website', 'flyer')),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] NOT NULL DEFAULT '{}',
  image_path TEXT NOT NULL,
  demo_url TEXT,
  source_url TEXT,
  status TEXT NOT NULL DEFAULT 'Live',
  duration TEXT NOT NULL DEFAULT 'Project',
  color TEXT NOT NULL DEFAULT 'from-cyan-500 to-blue-600',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_public_order
  ON public.portfolio_projects (is_published, sort_order, created_at);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.portfolio_projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.portfolio_projects TO authenticated;

DROP POLICY IF EXISTS "Public read published portfolio projects" ON public.portfolio_projects;
CREATE POLICY "Public read published portfolio projects"
  ON public.portfolio_projects FOR SELECT TO anon, authenticated
  USING (is_published OR public.is_portfolio_project_admin());

DROP POLICY IF EXISTS "Portfolio admins insert projects" ON public.portfolio_projects;
CREATE POLICY "Portfolio admins insert projects"
  ON public.portfolio_projects FOR INSERT TO authenticated
  WITH CHECK (public.is_portfolio_project_admin());

DROP POLICY IF EXISTS "Portfolio admins update projects" ON public.portfolio_projects;
CREATE POLICY "Portfolio admins update projects"
  ON public.portfolio_projects FOR UPDATE TO authenticated
  USING (public.is_portfolio_project_admin())
  WITH CHECK (public.is_portfolio_project_admin());

DROP POLICY IF EXISTS "Portfolio admins delete projects" ON public.portfolio_projects;
CREATE POLICY "Portfolio admins delete projects"
  ON public.portfolio_projects FOR DELETE TO authenticated
  USING (public.is_portfolio_project_admin());

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-project-images',
  'portfolio-project-images',
  TRUE,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read portfolio project images" ON storage.objects;
CREATE POLICY "Public read portfolio project images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'portfolio-project-images');

DROP POLICY IF EXISTS "Portfolio admins upload project images" ON storage.objects;
CREATE POLICY "Portfolio admins upload project images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-project-images'
    AND public.is_portfolio_project_admin()
  );

DROP POLICY IF EXISTS "Portfolio admins update project images" ON storage.objects;
CREATE POLICY "Portfolio admins update project images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'portfolio-project-images'
    AND public.is_portfolio_project_admin()
  )
  WITH CHECK (
    bucket_id = 'portfolio-project-images'
    AND public.is_portfolio_project_admin()
  );

DROP POLICY IF EXISTS "Portfolio admins delete project images" ON storage.objects;
CREATE POLICY "Portfolio admins delete project images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'portfolio-project-images'
    AND public.is_portfolio_project_admin()
  );

-- After creating your admin user in Supabase Auth, replace the email below and run:
-- INSERT INTO public.portfolio_project_admins (user_id)
-- SELECT id FROM auth.users WHERE email = lower('YOUR_ADMIN_EMAIL')
-- ON CONFLICT (user_id) DO NOTHING;