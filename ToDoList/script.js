class Task {
    constructor(title) {
        this.title = title;
        this.status = "todo";
        this.startDate = Task.formatDate(new Date());
        this.endDate = null;
    }

    markDone() {
        this.status = "done";
        this.endDate = Task.formatDate(new Date());
    }

    static formatDate(date) {
        const pad = (n) => String(n).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hour = pad(date.getHours());
        const minute = pad(date.getMinutes());
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
}

class ToDoApp {
    constructor(input, button, container) {
        this.input = input;
        this.button = button;
        this.container = container;
        this.taskList = [];
        this.bindEvents();
    }

    addTask(title) {
        const task = new Task(title);
        this.taskList.push(task);
        this.render();
    }

    render() {
        this.container.innerHTML = '';

        if (this.taskList.length === 0) {
            this.container.innerHTML = `
                <li class="list-group-item text-center text-muted">
                    No tasks
                </li>`;
            return;
        }

        this.taskList.forEach((task, index) => {
            const isDone = task.status === 'done';
            const li = document.createElement('li');
            li.className = `list-group-item d-flex align-items-start gap-2 ${isDone ? 'list-group-item-success' : 'list-group-item-danger'}`;
            li.style.cursor = 'pointer';

            li.innerHTML = `
                <span class="badge ${isDone ? 'bg-success' : 'bg-secondary'} rounded-circle p-2 mt-1"></span>
                <div class="flex-grow-1">
                    <div class="${isDone ? 'text-decoration-line-through' : ''}">${task.title}</div>
                    <small>
                        Started: ${task.startDate}${isDone ? ` · Done: ${task.endDate}` : ''}
                    </small>
                </div>
            `;

            li.addEventListener('click', () => this.toggleStatus(index));
            this.container.appendChild(li);
        });
    }

    toggleStatus(index) {
        const task = this.taskList[index];
        if (task.status === "todo") {
            task.markDone();
            this.render();
        }
    }

    bindEvents() {
        this.button.addEventListener('click', () => {
            const title = this.input.value.trim();
            if (title === '') return;
            this.addTask(title);
            this.input.value = '';
        });

        this.input.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                this.button.click();
            }
        });
    }
}


const input = document.getElementById('taskInput');
const button = document.getElementById('addBtn');
const container = document.getElementById('taskList');
const app = new ToDoApp(input, button, container);
