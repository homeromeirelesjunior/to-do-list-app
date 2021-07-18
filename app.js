const formAddTodo = document.querySelector('.form-add-todo')
const todosList = document.querySelector('.todos-container')
const inputSearchTodo = document.querySelector('.form-search input')

const removeTodo = event => {
    const clickedElement = event.target
    const dataDeleteValue = clickedElement.dataset.delete

    if(dataDeleteValue) {    
        const todo = document.querySelector(`[data-todo="${dataDeleteValue}"]`)
        todo.remove()
    }
}

const manipulateTodos = event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosList.children)

    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
}

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todo => {
        const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
        return returnMatchedTodos ? matchedTodos : !matchedTodos
    })
    
const manipulateClasses = (todos, classToAdd, classToRemove) => {
    todos.forEach(todo => {
        todo.classList.add(classToAdd)
        todo.classList.remove(classToRemove)
    })
}

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}


const updateTodosList = inputValue => {
    todosList.innerHTML += `
        <li class="list-group-item d-flex align-items-center justify-content-between" data-todo="${inputValue}"> 
            <span>${inputValue}</span>
            <i class="fas fa-trash-alt delete" data-delete="${inputValue}"></i>
        </li>
    `
}

const addTodo = event => {
    event.preventDefault()
  
    const inputValue = event.target.add.value.trim()   
  
    if (inputValue.length) {  
      updateTodosList(inputValue)
    }

    event.target.reset()  
}

formAddTodo.addEventListener('submit', addTodo)
todosList.addEventListener('click', removeTodo)
inputSearchTodo.addEventListener('input', manipulateTodos)