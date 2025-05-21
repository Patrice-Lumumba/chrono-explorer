-- Database schema for Louvre History Explorer

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS chrono CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE chrono;

-- Historical periods table
CREATE TABLE IF NOT EXISTS periods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_year INT NOT NULL,
  end_year INT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date_start VARCHAR(50) NOT NULL,
  date_end VARCHAR(50),
  location VARCHAR(100),
  civilization VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  period_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (period_id) REFERENCES periods(id) ON DELETE SET NULL
);

-- Media table for images, videos, documents
CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  type ENUM('image', 'video', 'document') NOT NULL,
  title VARCHAR(255),
  description TEXT,
  file_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  content TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Insert sample periods
INSERT INTO periods (name, start_date, end_date, description) VALUES
('Préhistoire', -3000000, -3000, 'La préhistoire couvre la période depuis l''apparition de l''humanité jusqu''à l''invention de l''écriture'),
('Égypte Ancienne', -3000, -30, 'L''Égypte antique est une ancienne civilisation du nord-est de l''Afrique'),
('Grèce Antique', -800, -146, 'La Grèce antique est une civilisation de l''Europe du Sud-Est'),
('Empire Romain', -27, 476, 'L''Empire romain est la période post-républicaine de la Rome antique'),
('Moyen Âge', 476, 1492, 'Le Moyen Âge est une période de l''histoire européenne entre l''Antiquité et l''époque moderne'),
('Renaissance', 1300, 1700, 'La Renaissance est une période de renouveau culturel et artistique'),
('Ère Moderne', 1700, 2000, 'L''ère moderne est marquée par la révolution industrielle et technologique');

-- Insert sample events
INSERT INTO events (title, date_start, date_end, location, civilization, description, image_url) VALUES
('Construction du Colisée', '70 apr. J.C.', '80 apr. J.C.', 'Rome, Italie', 'Romaine', 'Le Colisée, également connu sous le nom d''amphithéâtre Flavien, est un amphithéâtre elliptique situé dans le centre de Rome. C''est le plus grand amphithéâtre jamais construit à l''époque romaine.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop'),
('Fondation de l''Empire Romain', '27 av. J.C.', NULL, 'Rome, Italie', 'Romaine', 'Après un siècle de guerre civile, Auguste devient le premier empereur romain, transformant la République romaine en un empire qui dominera le monde méditerranéen pendant les cinq siècles suivants.', 'https://images.unsplash.com/photo-1471960098958-2059c6681742?q=80&w=2021&auto=format&fit=crop'),
('Conquête de la Gaule', '58 av. J.C.', '50 av. J.C.', 'Gaule (France actuelle)', 'Romaine', 'Jules César mène une série de campagnes militaires contre les tribus gauloises, étendant la République romaine jusqu''au Rhin et à l''océan Atlantique.', 'https://images.unsplash.com/photo-1559535332-db9971090158?q=80&w=1931&auto=format&fit=crop'),
('Éruption du Vésuve', '79 apr. J.C.', NULL, 'Pompéi, Italie', 'Romaine', 'L''éruption catastrophique du mont Vésuve ensevelit les villes romaines de Pompéi et Herculanum, préservant ces sites pendant près de 1700 ans jusqu''à leur redécouverte.', 'https://images.unsplash.com/photo-1516547375098-8d945a64d490?q=80&w=2070&auto=format&fit=crop');

-- Insert a sample admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@louvrehistory.com', '$2b$10$Sx6j0NxQYF2XQ4/nvzNZWeMlgLjYUYyX4sLRmHXW9CgBL.o0/xiQ2', 'admin');

