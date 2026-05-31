
DROP POLICY IF EXISTS "auth add titles" ON public.title_pool;
CREATE POLICY "auth add titles" ON public.title_pool FOR INSERT TO authenticated WITH CHECK (length(trim(title)) > 0);

DROP POLICY IF EXISTS "anyone submit feedback" ON public.feedback;
CREATE POLICY "submit own feedback" ON public.feedback FOR INSERT TO authenticated WITH CHECK (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "anon submit feedback" ON public.feedback FOR INSERT TO anon WITH CHECK (user_id IS NULL);

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
