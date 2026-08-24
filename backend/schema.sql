CREATE DATABASE floe_combat;

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_public_id TEXT NOT NULL UNIQUE,
  sizes TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE admin_activity_logs (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admins(id),
  action VARCHAR(50) NOT NULL,
  product_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE highlights (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    athlete VARCHAR(255) NOT NULL,
    media_type VARCHAR(10) NOT NULL CHECK (media_type IN ('video', 'image')),
    media_url TEXT NOT NULL,
    media_public_id TEXT NOT NULL,
    thumbnail_url TEXT,
    thumbnail_public_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);