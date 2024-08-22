document.getElementById("addNewExercise").addEventListener("click", function() {

    // Get the card body where the form will be added
    const cardBody = document.querySelector(".card-body");
    // Create a new form element
    const form = document.createElement("form");
    form.id = "newExerciseForm"; // Add a unique ID to the form
    // add styles to form
    form.style.margin = "20px";
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

    // Create a close button with Font Awesome icon
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerHTML = '<i class="fas fa-times"></i>'; // Font Awesome close icon

    // add styles to close button
    closeButton.style.margin = "6px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "1.8em";

    // Append the close button to the form
    form.appendChild(closeButton);

    // Add event listener to the close button
    closeButton.addEventListener("click", function() {
        form.style.display = "none"; // Hide the form when the close button is clicked
    });


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
                // reload part of html containing exercise list using ajax in jquery
                $("#exerciseList").load(location.href + " #exerciseList > *");
                // Optionally, clear the form after submission
                form.reset();
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                alert('An error occurred while sending the data.');
            });
        } else {
            alert("Do the code if the exercise name is empty.");
        }
    });
});
