<?php
require_once '../config/db_connection.php'; // Include the database connection file

function insertExercise($exerciseText) {
    global $pdo; // Access the global PDO instance

    // Prepare the SQL statement
    $sql = "INSERT INTO exercises (exercise_name) VALUES (:exercise_text)";
    $stmt = $pdo->prepare($sql);

    // Bind the parameter
    $stmt->bindParam(':exercise_text', $exerciseText, PDO::PARAM_STR);

    // Execute the statement
    try {
        $stmt->execute();
    } catch (PDOException $e) {
        // Handle execution errors
        echo 'Insert failed: ' . $e->getMessage();
    }
}

// Example usage
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the posted data
    $exerciseName = isset($_POST['exerciseName']) ? $_POST['exerciseName'] : '';

    // Process the data (e.g., save to database, etc.)
    // For demonstration purposes, we'll just return the received data
    insertExercise($exerciseName);
    
} else {
    echo "Invalid request method.";
}
?>
