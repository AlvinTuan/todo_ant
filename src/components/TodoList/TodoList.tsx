import { Todo } from '@/@types/todo.type'
import TaskInput from '@/components/TaskInput'
import TaskList from '@/components/TaskList'
import { Card, Typography } from 'antd'
import { useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  // Thêm mới
  const addTodo = (name: string) => {
    const todo: Todo = { name, done: false, id: new Date().toISOString() }
    setTodos((prevTodos) => [...prevTodos, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo)))
  }

  // edit
  const startEditTodo = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id)
    if (foundTodo) {
      setCurrentTodo(foundTodo)
    }
  }

  const finishEditTodo = (name: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === currentTodo?.id ? { ...todo, name } : todo)))
    setCurrentTodo(null)
  }

  // const cancelEditTodo = () => {}

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    setTodos((prev) => {
      const foundIndexTodo = prev.findIndex((todo) => todo.id === id)
      if (foundIndexTodo > -1) {
        const res = [...prev]
        res.splice(foundIndexTodo, 1)
        return res
      }
      return prev
    })
  }

  return (
    <div className='mx-auto max-w-[40rem]'>
      <Card size='small'>
        <Typography.Title level={4}>To do list</Typography.Title>
        <TaskInput currentTodo={currentTodo} addTodo={addTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todos={notDoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todos={doneTodos}
          doneTaskList
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </Card>
    </div>
  )
}
