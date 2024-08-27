document.getElementById("addNewExercise").addEventListener("click", function() {
    const cardBody = document.querySelector(".card-body");
    let form = document.getElementById("newExerciseForm");

    if (form) {
        form.style.display = "block";
        return;
    }

    form = createForm();
    cardBody.appendChild(form);

    form.addEventListener("submit", handleSubmit);
});

function createForm() {
    const form = document.createElement("form");
    form.id = "newExerciseForm";
    form.style.margin = "20px";

    const input = createInput();
    const submitButton = createSubmitButton();
    const closeButton = createCloseButton(form);

    form.appendChild(input);
    form.appendChild(submitButton);
    form.appendChild(closeButton);

    return form;
}

function createInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "exerciseName";
    input.placeholder = "Enter exercise name";
    input.className = "form-control mb-2";
    return input;
}

function createSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.textContent = "Submit";
    return submitButton;
}

function createCloseButton(form) {
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.margin = "6px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "1.8em";
    closeButton.style.color = "red";

    closeButton.addEventListener("click", () => form.style.display = "none");

    return closeButton;
}

async function handleSubmit(event) {
    event.preventDefault();
    const input = this.querySelector('input[name="exerciseName"]');
    const exerciseName = input.value.trim();

    if (!exerciseName) {
        alert("Please enter an exercise name.");
        return;
    }

    try {
        const response = await fetch('routes/add_new_exercise.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ exerciseName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.text();
        $("#exerciseList").load(`${location.href} #exerciseList > *`);
        this.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the data.');
    }
}