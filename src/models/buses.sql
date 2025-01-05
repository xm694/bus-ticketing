CREATE TABLE buses (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    rego INT NOT NULL UNIQUE,
    capacity INT NOT NULL,
    made VARCHAR(50),
    year_made INT NOT NULL
)