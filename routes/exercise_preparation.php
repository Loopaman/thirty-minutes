<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = [];

    foreach ($_POST as $exerciseName => $jsonData) {
        $data = json_decode($jsonData, true);
        if ($data) {
            $response[$exerciseName] = $data;
        } else {
            $response['error'] = 'Invalid data for ' . $exerciseName;
        }
    }

    // Ensure the output is JSON-encoded
    echo json_encode($response);
} else {
    // Return an error if the request is not POST
    echo json_encode(['error' => 'Invalid request']);
}
?>
