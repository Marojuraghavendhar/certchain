-- Database Schema for CertiChain Student Profile

-- Users/Students Table
CREATE TABLE IF NOT EXISTS Students (
    student_id VARCHAR(50) PRIMARY KEY, -- Using VARCHAR for IDs like 'STD2023001'
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL DEFAULT 'password123',
    date_of_birth DATE,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic Records Table
-- Linked to Students table via student_id
CREATE TABLE IF NOT EXISTS Academic_Records (
    record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id VARCHAR(50) NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    year_of_study VARCHAR(20), -- e.g., '3rd Year'
    gpa DECIMAL(3, 2), -- e.g., 3.80
    institution_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_student_email ON Students(email);
CREATE INDEX IF NOT EXISTS idx_academic_student ON Academic_Records(student_id);
