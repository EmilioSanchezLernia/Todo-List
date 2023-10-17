// My HTML elements
const input = document.querySelector('#inputField');
const list = document.querySelector('ul')
const button = document.querySelector('#btn');
const info = document.querySelector("#info");
const completedTasks = document.querySelector("#completedTasks")

// My JavaScript elements
let completedCount = 0;
const todoList = [];

// Function to change completed status on objects inside array
function changeStatus(todoText, status) {
    // Find index
    const correctIndex = todoList.map(t => t.name).indexOf(todoText);

    // Change status on the competed object in the correct index.
    todoList[correctIndex].completed = status;
}

// Button and Enter press
button.addEventListener('click', function () { handleButtonClick(); })
input.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleButtonClick();
    }
})

// Function that tells the program what to do when the button is pressed
function handleButtonClick() {

    // The text that is written in the input field trimmed so that empty list items don't get created
    const text = input.value.trim();

    // Check that the text is not empty
    if (text === "") {
        info.innerText = "Input must not be empty";
        info.classList.add('infoBlink');
        input.value = "";
        return;
    } else {
        info.innerText = "";
        info.classList.remove('infoBlink');
    }
    // If there is text
    if (input.value != "") {

        // Add input to todoList array
        const inputObject = { name: text, completed: false };
        todoList.push(inputObject);

        // Create li element inside of the ul
        const item = document.createElement('li');
        list.appendChild(item);

        // Create span inside of li element
        const itemLabel = document.createElement('span')
        itemLabel.innerText = text;
        item.appendChild(itemLabel);

        // Give each li a delete button and delete button class
        const deleteButton = document.createElement('button')
        deleteButton.innerText = "🗑️";
        item.appendChild(deleteButton)
        deleteButton.classList.add('deleteButton');

        // Add a listener to the delete button
        deleteButton.addEventListener('click', function () {

            // Check if deleted element is already completed and change the count if it is
            if (item.getAttribute('class') == 'completed') {
                completedCount--
                completedTasks.innerText = `${completedCount} completed`;
            }
            // Delete the object from the array.
            const correctIndex = todoList.map(t => t.name).indexOf(item.childNodes[1].textContent);
            todoList.splice(correctIndex, 1)
            console.log(todoList);

            // Remove li which also deletes the corresponding child elements
            item.remove();
        })


        // Add a listener to the span
        itemLabel.addEventListener('click', function () {

            // Toggle complete/uncomplete
            if (item.classList.contains('completed')) {
                item.classList.toggle('completed')
                // Change status on object in array to false
                let clickedText = item.firstChild.textContent;
                changeStatus(clickedText, false);
                console.log(todoList);
                // Derease completed element by 1
                completedCount--
            } else {
                item.classList.toggle('completed')
                // Change status on object in array to true
                let clickedText = item.firstChild.textContent;
                changeStatus(clickedText, true);
                console.log(todoList);
                //Increase completed eelement by 1
                completedCount++
            }
            // Using tenary operator to add a little ! if completed tasks is greater than 0
            completedTasks.innerText = `${completedCount} completed`;

        })
    }
    // Empty input field
    input.value = "";
}