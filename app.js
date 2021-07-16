const addTodo = document.querySelector('.form-add-todo')
const todosList = document.querySelector('.todos-container')
const searchTodo = document.querySelector('.form-search input')

const removeTodo = event => {
    const clickedElement = event.target
    const dataDeleteValue = clickedElement.dataset.delete
    const todo = document.querySelector(`[data-todo="${dataDeleteValue}"]`)

    if(dataDeleteValue) todo.remove()
}

const filterTodos = event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosList.children)

    todos
        .filter(todo => !todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => {
            todo.classList.add('hidden')
            todo.classList.remove('d-flex')
        })

    todos
        .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => {
            todo.classList.add('d-flex')
            todo.classList.remove('hidden')
    })
}

const addTodoToList = inputValue => {
    todosList.innerHTML += `
        <li class="list-group-item d-flex align-items-center justify-content-between" data-todo="${inputValue}"> 
            <span>${inputValue}</span>
            <i class="fas fa-trash-alt delete" data-delete="${inputValue}"></i>
        </li>
    `
}

const validateNewTodo = () => {
    const inputValue = event.target.add.value.trim()

    if(inputValue.length) {
        addTodoToList(inputValue)
    }

    event.target.reset()
}

const addNewTodo = event => {
    event.preventDefault()

    validateNewTodo()
}

addTodo.addEventListener('submit', addNewTodo)
todosList.addEventListener('click', removeTodo)
searchTodo.addEventListener('input', filterTodos)