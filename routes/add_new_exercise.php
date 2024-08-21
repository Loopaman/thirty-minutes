<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the posted data
    $exerciseName = isset($_POST['exerciseName']) ? $_POST['exerciseName'] : '';

    // Process the data (e.g., save to database, etc.)
    // For demonstration purposes, we'll just return the received data
    echo "Received exercise name: " . htmlspecialchars($exerciseName);
} else {
    echo "Invalid request method.";
}
?>
