document.getElementById('task-form').addEventListener('submit', addTask);


function addTask(e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const deadline = document.getElementById('task-deadline').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', getPriorityClass(priority), category);

    taskItem.innerHTML = `
        <div class="task-info">
            <h3>${title}</h3>
            <p>${desc}</p>
            <p>Deadline: ${deadline}</p>
        </div>
        <button onclick="completeTask(this)">Complete</button>
    `;

    document.getElementById('task-list').appendChild(taskItem);

    // Check if task deadline is approaching
    checkDeadline(taskItem, deadline);

    // Clear form
    document.getElementById('task-form').reset();
}

function getPriorityClass(priority) {
    switch (priority) {
        case 'high':
            return 'high-priority';
        case 'medium':
            return 'medium-priority';
        case 'low':
            return 'low-priority';
        default:
            return '';
    }
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.add('completed');
    document.getElementById('completed-task-list').appendChild(taskItem);
    button.remove();
}

function checkDeadline(taskItem, deadline) {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const timeDiff = deadlineDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 3) {
        taskItem.style.backgroundColor = '#f8d7da';  // Red alert color
    }
}
