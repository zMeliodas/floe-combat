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

