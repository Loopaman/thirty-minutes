<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = [];

    foreach ($_POST as $key => $value) {
        $data = json_decode($value, true);
        if ($data) {
            $response[$key] = $data;
        } else {
            $response['error'] = 'Invalid data for ' . $exerciseName;
        }
    }
    var_dump($response);
    // Ensure the output is JSON-encoded
    echo json_encode($response);
} else {
    // Return an error if the request is not POST
    echo json_encode(['error' => 'Invalid request']);
}
?>