<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thirty Minutes</title>
    <link rel="stylesheet" href="external-resources/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <link href="external-resources/fontawesome-free-6.6.0-web/fontawesome-free-6.6.0-web/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    
    <div class="card" style="width: 18rem;">
        <button id="addNewExercise" type="button" class="btn btn-primary">Add New Exercise</button>
        <div class="card-body">
            <div id="exerciseList" class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <?php
                require_once("config/db_connection.php");
                $query = "SELECT * FROM exercises";
                $result = $pdo->query($query);
                while ($row = $result->fetch()) {
                    echo "<input type='checkbox' class='btn-check' id='" . $row['exercise_name'] . "' autocomplete='off'>";
                    echo "<label class='btn btn-outline-danger' for='" . $row['exercise_name'] . "'>" . $row['exercise_name'] . "</label>";
                }
                ?>
            </div>
        </div>
    </div>
    <script src="external-resources/jquery-3.7.1.min.js"></script>
    <script src="external-resources/bootstrap-5.3.3-dist/js/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/add_new_exercise.js"></script>
</body>
</html>