<?php
include 'config.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password_input = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password_input, $user['password'])) {
        $_SESSION['user'] = $username;
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid credentials.";
    }
}
?>
<form method="POST">
    <input type="text" name="username" placeholder="Username" required><br>
    <input type="password" name="password" placeholder="Password" required><br>
    <button type="submit">Login</button>
</form>
