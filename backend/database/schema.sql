-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for User Roles
CREATE TYPE user_role AS ENUM ('admin', 'member');
-- Enum for Meeting Types
CREATE TYPE meeting_type AS ENUM ('Club', 'Domain', 'Event');
-- Enum for Attendance Status
CREATE TYPE attendance_status AS ENUM ('Present', 'Absent');

-- USERS Table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role user_role DEFAULT 'member'::user_role,
  domain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEETINGS Table
CREATE TABLE public.meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type meeting_type DEFAULT 'Club'::meeting_type,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  
  -- V2 Fields
  venue TEXT,
  agenda TEXT,
  mom TEXT,
  domain TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.users(id)
);

-- ATTENDANCE Table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meeting_id UUID NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status attendance_status DEFAULT 'Present'::attendance_status,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(meeting_id, user_id)
);

-- RLS POLICIES --
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Users can read all users (needed for admin dashboard and member displays)
CREATE POLICY "Users are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Meetings can be viewed by everyone, only inserted by admins
CREATE POLICY "Meetings viewable by everyone" ON public.meetings FOR SELECT USING (true);
CREATE POLICY "Meetings insertable by admins" ON public.meetings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Meetings updatable by admins" ON public.meetings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Attendance can be viewed by self or admin
CREATE POLICY "Attendance viewable by self or admin" ON public.attendance FOR SELECT USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
-- Attendance can be inserted by members representing themselves
CREATE POLICY "Attendance insertable by users" ON public.attendance FOR INSERT WITH CHECK (
  auth.uid() = user_id
);

-- Improved Auto-Absence Logic: Function to mark members absent if they didn't scan in
CREATE OR REPLACE FUNCTION mark_absentees_for_ended_meetings()
RETURNS void AS $$
BEGIN
  -- 1. Insert 'Absent' for Club meetings (applies to all members)
  INSERT INTO public.attendance (meeting_id, user_id, status, scanned_at)
  SELECT m.id, u.id, 'Absent'::attendance_status, m.end_time
  FROM public.meetings m
  CROSS JOIN public.users u
  WHERE m.end_time < NOW()
    AND m.type = 'Club'
    AND u.role = 'member'
    AND NOT EXISTS (
      SELECT 1 FROM public.attendance a WHERE a.meeting_id = m.id AND a.user_id = u.id
    )
  ON CONFLICT (meeting_id, user_id) DO NOTHING;

  -- 2. Insert 'Absent' for Domain meetings (applies only to matching members)
  INSERT INTO public.attendance (meeting_id, user_id, status, scanned_at)
  SELECT m.id, u.id, 'Absent'::attendance_status, m.end_time
  FROM public.meetings m
  CROSS JOIN public.users u
  WHERE m.end_time < NOW()
    AND m.type = 'Domain'
    AND u.role = 'member'
    AND u.domain = m.domain
    AND NOT EXISTS (
      SELECT 1 FROM public.attendance a WHERE a.meeting_id = m.id AND a.user_id = u.id
    )
  ON CONFLICT (meeting_id, user_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Set up a function that automatically creates a user row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New Member'),
    new.email,
    'member'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to allow clean re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
