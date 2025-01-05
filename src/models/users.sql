CREATE TABLE users (
    u_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    f_name VARCHAR(50),
    l_name VARCHAR(50),
    phone VARCHAR(20),
    role ENUM('Admin', 'User') NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL 
)