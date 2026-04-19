-- ============================================================
-- HC101 Supabase Schema
-- HomeClosing101 Analytics, Admin Config, and User Data
-- ============================================================

-- 1. Analytics Events (page views, clicks, feature usage)
CREATE TABLE IF NOT EXISTS hc101_analytics (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  page VARCHAR(255) NOT NULL,
  data JSONB DEFAULT '{}',
  device VARCHAR(10) DEFAULT 'desktop',
  browser VARCHAR(100),
  os VARCHAR(100),
  referrer TEXT,
  session_id VARCHAR(50),
  geo_country VARCHAR(2),
  geo_region VARCHAR(100),
  geo_city VARCHAR(100),
  screen_width INTEGER,
  screen_height INTEGER,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hc101_analytics_type ON hc101_analytics(event_type);
CREATE INDEX idx_hc101_analytics_page ON hc101_analytics(page);
CREATE INDEX idx_hc101_analytics_created ON hc101_analytics(created_at);
CREATE INDEX idx_hc101_analytics_session ON hc101_analytics(session_id);

-- 2. Site Config (module toggles, page visibility, ad control)
CREATE TABLE IF NOT EXISTS hc101_site_config (
  id SERIAL PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  updated_by VARCHAR(100),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default config
INSERT INTO hc101_site_config (config_key, config_value) VALUES
  ('modules', '{}'),
  ('pages', '{}'),
  ('ads', '{}'),
  ('active_profile', '"default"')
ON CONFLICT (config_key) DO NOTHING;

-- 3. Config Profiles (saved configurations)
CREATE TABLE IF NOT EXISTS hc101_config_profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  config JSONB NOT NULL,
  created_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Feedback & Bug Reports
CREATE TABLE IF NOT EXISTS hc101_feedback (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL, -- 'bug', 'suggestion', 'feedback', 'question'
  page VARCHAR(255),
  message TEXT NOT NULL,
  email VARCHAR(255),
  user_agent TEXT,
  device VARCHAR(10),
  browser VARCHAR(100),
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'reviewed', 'resolved', 'dismissed'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hc101_feedback_type ON hc101_feedback(type);
CREATE INDEX idx_hc101_feedback_status ON hc101_feedback(status);

-- 5. Ad Impressions (dedicated high-volume table)
CREATE TABLE IF NOT EXISTS hc101_ad_events (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(20) NOT NULL, -- 'impression', 'click'
  ad_format VARCHAR(50) NOT NULL,
  sponsor_name VARCHAR(100),
  page VARCHAR(255),
  device VARCHAR(10),
  session_id VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hc101_ad_events_format ON hc101_ad_events(ad_format);
CREATE INDEX idx_hc101_ad_events_sponsor ON hc101_ad_events(sponsor_name);
CREATE INDEX idx_hc101_ad_events_created ON hc101_ad_events(created_at);

-- 6. Sessions (for session-level analytics)
CREATE TABLE IF NOT EXISTS hc101_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(50) UNIQUE NOT NULL,
  device VARCHAR(10),
  browser VARCHAR(100),
  os VARCHAR(100),
  screen_width INTEGER,
  screen_height INTEGER,
  referrer TEXT,
  geo_country VARCHAR(2),
  geo_region VARCHAR(100),
  geo_city VARCHAR(100),
  entry_page VARCHAR(255),
  page_count INTEGER DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hc101_sessions_started ON hc101_sessions(started_at);

-- 7. County Fraud Programs (for Phase 2 deed fraud tool)
CREATE TABLE IF NOT EXISTS hc101_county_programs (
  id SERIAL PRIMARY KEY,
  state_code VARCHAR(2) NOT NULL,
  state_name VARCHAR(50) NOT NULL,
  county_name VARCHAR(100) NOT NULL,
  fips_code VARCHAR(5),
  is_statewide BOOLEAN DEFAULT FALSE,
  has_program BOOLEAN NOT NULL,
  program_name VARCHAR(200),
  registration_url TEXT,
  recorder_url TEXT,
  cost VARCHAR(50) DEFAULT 'Free',
  notification_method VARCHAR(200),
  phone VARCHAR(50),
  notes TEXT,
  verified_date DATE NOT NULL,
  verified_by VARCHAR(100),
  next_review_date DATE,
  data_source VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(state_code, county_name)
);

CREATE INDEX idx_hc101_county_state ON hc101_county_programs(state_code);

-- 8. Report access log
CREATE TABLE IF NOT EXISTS hc101_report_access (
  id SERIAL PRIMARY KEY,
  report_name VARCHAR(100) NOT NULL,
  accessed_by VARCHAR(100),
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- Analytics: anyone can insert (anon), only authenticated can read
ALTER TABLE hc101_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert analytics" ON hc101_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read analytics" ON hc101_analytics FOR SELECT USING (true);

-- Ad events: same pattern
ALTER TABLE hc101_ad_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert ad events" ON hc101_ad_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read ad events" ON hc101_ad_events FOR SELECT USING (true);

-- Sessions: same pattern
ALTER TABLE hc101_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert sessions" ON hc101_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read sessions" ON hc101_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can update sessions" ON hc101_sessions FOR UPDATE USING (true);

-- Config: anyone can read, anyone can update (admin password gate is client-side for now)
ALTER TABLE hc101_site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read config" ON hc101_site_config FOR SELECT USING (true);
CREATE POLICY "Anyone can update config" ON hc101_site_config FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert config" ON hc101_site_config FOR INSERT WITH CHECK (true);

-- Profiles: same
ALTER TABLE hc101_config_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can manage profiles" ON hc101_config_profiles FOR ALL USING (true);

-- Feedback: anyone can insert, anyone can read (admin reads)
ALTER TABLE hc101_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert feedback" ON hc101_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read feedback" ON hc101_feedback FOR SELECT USING (true);
CREATE POLICY "Anyone can update feedback" ON hc101_feedback FOR UPDATE USING (true);

-- County programs: anyone can read
ALTER TABLE hc101_county_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read county programs" ON hc101_county_programs FOR SELECT USING (true);
CREATE POLICY "Anyone can manage county programs" ON hc101_county_programs FOR ALL USING (true);

-- Report access: open
ALTER TABLE hc101_report_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can manage report access" ON hc101_report_access FOR ALL USING (true);
