document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-check').forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            const exerciseName = this.id;
    
            // Check if the checkbox is selected
            if (this.checked) {
                // Create a new div for the input field
                const inputDiv = document.createElement('div');
                inputDiv.className = 'reps-input';
                inputDiv.id = `reps-${exerciseName}`; // Unique ID for the div
    
                // Create a label for the input
                const label = document.createElement('label');
                label.textContent = `Reps for ${exerciseName}:`;
    
                // Create the input field for reps
                const input = document.createElement('input');
                input.type = 'number';
                input.name = `reps-${exerciseName}`;
                input.placeholder = `Reps for ${exerciseName}`;
                input.className = 'form-control mb-2';
    
                // Append the label and input to the div
                inputDiv.appendChild(label);
                inputDiv.appendChild(input);
    
                // Append the inputDiv to the form or any container
                document.querySelector('.card-body').appendChild(inputDiv);
            } else {
                // If unchecked, remove the corresponding input field
                const inputDiv = document.getElementById(`reps-${exerciseName}`);
                if (inputDiv) {
                    inputDiv.remove();
                }
            }
        });
    });
});
