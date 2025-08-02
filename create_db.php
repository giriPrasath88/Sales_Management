<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sales_management";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database created or already exists.<br>";
} else {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($dbname);

// Create users table
$table = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'rep') DEFAULT 'rep',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($table) === TRUE) {
    echo "Users table created successfully.";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
