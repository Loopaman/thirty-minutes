document.getElementById("addNewExercise").addEventListener("click", function() {
    // Get the card body where the form will be added
    const cardBody = document.querySelector(".card-body");
    
    // Create a new form element
    const form = document.createElement("form");
    form.id = "newExerciseForm"; // Add a unique ID to the form

    // Create an input field
    const input = document.createElement("input");
    input.type = "text";
    input.name = "exerciseName";
    input.placeholder = "Enter exercise name";
    input.className = "form-control mb-2"; // Optional: add Bootstrap classes for styling

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary"; // Optional: add Bootstrap classes for styling
    submitButton.textContent = "Submit";

    // Append the input and submit button to the form
    form.appendChild(input);
    form.appendChild(submitButton);

    // Append the form to the card body
    cardBody.appendChild(form);

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the value of the input field
        const exerciseName = input.value.trim();

        // Check if the input is not empty
        if (exerciseName) {
            // Send the data to a PHP script using fetch
            fetch('routes/add_new_exercise.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'exerciseName': exerciseName
                })
            })
            .then(response => response.text())
            .then(result => {
                // Handle the response from the PHP script
                alert(`Server response: ${result}`);
                
                // Optionally, clear the form after submission
                form.reset();
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                alert('An error occurred while sending the data.');
            });
        } else {
            alert("Please enter an exercise name.");
        }
    });
});
