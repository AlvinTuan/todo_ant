import { HandleTodo } from '@/types/todo.type'

export const syncReactWithLocal = (handleTodo: HandleTodo) => {
  const todosFromLocal = JSON.parse(localStorage.getItem('todos') ?? '[]')
  const newTodos = handleTodo(todosFromLocal)
  localStorage.setItem('todos', JSON.stringify(newTodos))
  return newTodos
}
