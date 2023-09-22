let add = document.querySelector('#push');
let tasksContainer = document.querySelector('#tasks');

// Load tasks from local storage when the page loads
window.addEventListener('load', function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(function (taskName) {
        createTaskElement(taskName);
    });
});

add.addEventListener("click", function () {
    let taskInput = document.querySelector('#newtask input');
    let taskName = taskInput.value;

    if (taskName.length == 0) {
        alert("Kindly Enter Task Name!!!!");
    } else {
        createTaskElement(taskName);

        // Save tasks to local storage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.push(taskName);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        taskInput.value = ''; // Clear the input field
    }
});

function createTaskElement(taskName) {
    let taskHTML = `
        <div class="task">
            <span id="taskname">
                ${taskName}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    `;
    tasksContainer.innerHTML += taskHTML;

    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            this.parentNode.remove();

            // Remove the task from local storage
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskIndex = savedTasks.indexOf(taskName);
            if (taskIndex !== -1) {
                savedTasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(savedTasks));
            }
        }
    }
}
