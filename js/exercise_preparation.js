document.addEventListener('DOMContentLoaded', function() {
    const cardBody = document.querySelector('.card-body');
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.className = 'btn btn-primary mt-3';
    startButton.disabled = true;
    cardBody.appendChild(startButton);

    let setInputContainer = null;

    cardBody.addEventListener('change', function(event) {
        if (event.target.classList.contains('btn-check')) {
            handleCheckboxChange(event.target);
        }
    });

    cardBody.addEventListener('input', function(event) {
        if (event.target.classList.contains('exercise-preparation-input')) {
            checkAllInputs();
        }
    });

    startButton.addEventListener('click', function() {
        sendAjaxRequest();
    });

    function handleCheckboxChange(checkbox) {
        const exerciseName = checkbox.id;
        const inputContainerId = `inputs-${exerciseName}`;
        let inputContainer = document.getElementById(inputContainerId);

        if (checkbox.checked && !inputContainer) {
            inputContainer = createRepsInputContainer(exerciseName);
            cardBody.insertBefore(inputContainer, setInputContainer || startButton);
        } else if (!checkbox.checked && inputContainer) {
            inputContainer.remove();
            if (document.querySelectorAll('.input-container').length === 0 && setInputContainer) {
                setInputContainer.remove();
                setInputContainer = null;
            }
        }

        if (!setInputContainer && document.querySelectorAll('.input-container').length > 0) {
            setInputContainer = createSetInputContainer();
            cardBody.insertBefore(setInputContainer, startButton);
        }

        checkAllInputs();
    }

    function createRepsInputContainer(exerciseName) {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container mb-2';
        inputContainer.id = `inputs-${exerciseName}`;

        const repsField = createInputField(`reps-${exerciseName}`, `Reps for ${exerciseName}`);

        inputContainer.appendChild(repsField);
        return inputContainer;
    }

    function createSetInputContainer() {
        const setInputContainer = document.createElement('div');
        setInputContainer.className = 'set-input-container mb-2';

        const setsField = createInputField('sets-all', 'Sets for all exercises');
        setInputContainer.appendChild(setsField);

        return setInputContainer;
    }

    function createInputField(name, placeholder) {
        const field = document.createElement('input');
        field.type = 'number';
        field.name = name;
        field.placeholder = placeholder;
        field.className = 'form-control mb-2 exercise-preparation-input';
        field.min = '1';
        return field;
    }

    function checkAllInputs() {
        const inputs = document.querySelectorAll('.exercise-preparation-input');
        const allFilled = [...inputs].every(input => input.value.trim() !== '');

        startButton.disabled = !allFilled || inputs.length === 0;

        if (allFilled && inputs.length > 0) {
            console.log("All fields are filled!");
        } else {
            console.log("Not all fields are filled or no fields exist.");
        }
    }

    function sendAjaxRequest() {
        const formData = new FormData();
        document.querySelectorAll('.input-container').forEach(container => {
            const exerciseName = container.id.replace('inputs-', '');
            const reps = container.querySelector(`[name^="reps-"]`).value;
            formData.append(exerciseName, reps);
        });

        const sets = document.querySelector('[name="sets-all"]').value;
        formData.append('sets', sets);

        fetch('routes/exercise_preparation.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Fetch raw response as text
        .then(data => {
            console.log('Raw Response:', data);
            try {
                const jsonData = JSON.parse(data);
                console.log('Success:', jsonData);

                // Log individual exercise data
                for (let exercise in jsonData) {
                    if (exercise !== 'sets') {
                        console.log(`${exercise} reps: ${jsonData[exercise]}`);
                    }
                }
                console.log(`Sets: ${jsonData['sets']}`);
                disableInputs();
            } catch (error) {
                console.error('JSON Parse Error:', error);
                console.error('Response was not valid JSON:', data);
            }
        })
        .catch((error) => {
            console.error('Fetch Error:', error);
        });
    }

    function disableInputs() {
        document.querySelectorAll('.btn-check, .exercise-preparation-input').forEach(el => {
            el.disabled = true;
        });
        startButton.disabled = true;
    }
});
