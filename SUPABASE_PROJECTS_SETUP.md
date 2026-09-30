# Admin-Added Portfolio Projects

The existing projects and flyer samples remain built into the site. New projects added in Admin are stored in Supabase and appear after those built-in entries on both the carousel and `/work` page.

## One-Time Supabase Setup

1. In Supabase, open **SQL Editor** and run [`supabase-projects-setup.sql`](supabase-projects-setup.sql).
2. Make sure your admin account already exists under **Authentication → Users**.
3. In the SQL Editor, run the admin allowlist query below, replacing the email with the email used for your Supabase Auth login:

```sql
INSERT INTO public.portfolio_project_admins (user_id)
SELECT id FROM auth.users WHERE email = lower('YOUR_ADMIN_EMAIL')
ON CONFLICT (user_id) DO NOTHING;
```

The query adds no rows if the email does not match an existing Auth user. Confirm the email before continuing.

The setup creates the `portfolio_projects` table, the public-read image bucket, and row/storage policies. Only users in `portfolio_project_admins` can add or remove portfolio entries; the public can read published entries and their images.

## Adding Projects

Sign in to `/admin` with the allowlisted Supabase Auth account, open **Projects** in the admin navigation, and submit the project details and image. Website projects require a live URL. Flyer entries can be added without a website link; visitors can enlarge their images.

New entries are appended after the built-in projects. Removing an admin-added project does not remove or change the built-in entries.