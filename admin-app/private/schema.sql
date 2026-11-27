-- Israel Taxi & Travel admin dashboard schema (MySQL 8 / MariaDB).
-- Do not put this or production database credentials in the public webroot.
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('owner','admin','editor','viewer') NOT NULL DEFAULT 'viewer',
  active TINYINT(1) NOT NULL DEFAULT 1,
  auth_version INT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  subject_hash CHAR(64) NOT NULL,
  attempted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ix_login_subject_date (subject_hash, attempted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_audit (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  actor_id BIGINT UNSIGNED NULL,
  action VARCHAR(80) NOT NULL,
  module VARCHAR(60) NOT NULL,
  item_id VARCHAR(100) NULL,
  details_json JSON NULL,
  occurred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ix_audit_time (occurred_at),
  INDEX ix_audit_module (module, occurred_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_enquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  request_id CHAR(36) NOT NULL UNIQUE,
  kind ENUM('contact','transfer','driver','shore') NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(160) NOT NULL,
  body TEXT NOT NULL,
  source_path VARCHAR(500) NULL,
  payload_json JSON NULL,
  delivery_status VARCHAR(40) NOT NULL DEFAULT 'accepted',
  status ENUM('new','read','replied','closed') NOT NULL DEFAULT 'new',
  private_note TEXT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX ix_enquiries_status (status, received_at),
  INDEX ix_enquiries_date (received_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_consent_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  event_id CHAR(36) NOT NULL UNIQUE,
  policy_version VARCHAR(32) NOT NULL,
  analytics TINYINT(1) NOT NULL,
  external_content TINYINT(1) NOT NULL,
  marketing TINYINT(1) NOT NULL,
  advertising TINYINT(1) NOT NULL,
  source_path VARCHAR(500) NULL,
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ix_consents_date (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_redirects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_path VARCHAR(500) NOT NULL UNIQUE,
  target_path VARCHAR(500) NOT NULL,
  http_status SMALLINT UNSIGNED NOT NULL DEFAULT 301,
  state ENUM('draft','approved') NOT NULL DEFAULT 'draft',
  updated_by BIGINT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (http_status = 301)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_seo_overrides (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  page_path VARCHAR(500) NOT NULL UNIQUE,
  meta_title VARCHAR(140) NOT NULL,
  meta_description VARCHAR(330) NOT NULL,
  og_title VARCHAR(140) NULL,
  og_description VARCHAR(330) NULL,
  robots ENUM('index,follow','noindex,follow','noindex,nofollow') NOT NULL DEFAULT 'index,follow',
  state ENUM('draft','approved') NOT NULL DEFAULT 'draft',
  updated_by BIGINT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_job_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_name VARCHAR(160) NOT NULL,
  run_id VARCHAR(80) NULL,
  status ENUM('success','failure','running','cancelled','unknown') NOT NULL DEFAULT 'unknown',
  details VARCHAR(500) NULL,
  workflow_url VARCHAR(500) NULL,
  observed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ix_jobs_time (observed_at),
  INDEX ix_jobs_status (status, observed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_backups (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  backup_name VARCHAR(160) NOT NULL,
  backup_kind VARCHAR(50) NOT NULL,
  storage_reference VARCHAR(500) NOT NULL,
  status ENUM('verified','available','failed','unknown') NOT NULL DEFAULT 'unknown',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified_at DATETIME NULL,
  INDEX ix_backup_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Rate-limit only short-lived HMAC identifiers, never plaintext IP addresses.
CREATE TABLE IF NOT EXISTS admin_consent_rate_limits (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  source_hash CHAR(64) NOT NULL,
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ix_consent_rate_window (source_hash, recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
