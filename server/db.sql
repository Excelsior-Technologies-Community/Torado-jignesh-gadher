-- Create Database
CREATE DATABASE IF NOT EXISTS torado_db;
USE torado_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    image_url VARCHAR(255),
    category_id INT,
    stock_quantity INT DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    badge VARCHAR(20),
    badge_type ENUM('new', 'sale', 'discount'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT,
    payment_method VARCHAR(50),
    currency VARCHAR(10) DEFAULT 'INR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Sample Categories
INSERT INTO categories (name, slug) VALUES 
('Machine Tools', 'machine-tools'),
('Hand Tools', 'hand-tools'),
('Power Tools', 'power-tools');

-- Insert Sample Products
INSERT INTO products (name, price, old_price, image_url, category_id, stock_quantity, rating, reviews_count, badge, badge_type) VALUES 
('Cordless Drill Professional Combo', 200.00, 300.00, 'shop-1.webp', 3, 50, 5.0, 1000, '10% Off', 'discount'),
('Professional Cordless Drill Set', 100.00, 120.00, 'shop-7.webp', 3, 30, 4.0, 3000, 'New', 'new'),
('DFMLAb 20V Max XX Multi Tool', 300.00, 400.00, 'shop-3.webp', 3, 20, 5.0, 2000, 'Sale', 'sale');
