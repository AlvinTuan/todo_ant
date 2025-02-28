import TaskInput from '@/components/TaskInput'
import TaskList from '@/components/TaskList'
import { syncReactWithLocal } from '@/lib/utils'
import { Todo } from '@/types/todo.type'
import { FileDoneOutlined, FileOutlined } from '@ant-design/icons'
import { Card, Menu, MenuProps, Typography } from 'antd'
import { useEffect, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: 'Todo',
    key: 'todo',
    icon: <FileOutlined />
  },
  {
    key: 'complete',
    label: 'Complete',
    icon: <FileDoneOutlined />
  }
]

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const [current, setCurrent] = useState('todo')
  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todoFromLocal = JSON.parse(localStorage.getItem('todos') ?? '[]') as Todo[]
    setTodos(todoFromLocal)
  }, [])

  // Thêm mới
  const addTodo = (name: string) => {
    const todoNew: Todo = { name, done: false, id: new Date().toISOString() }
    const newTodos = syncReactWithLocal((todoFromLocal: Todo[]) => [...todoFromLocal, todoNew])
    setTodos(newTodos)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const newTodos = syncReactWithLocal((todoFromLocal) =>
      todoFromLocal.map((todo) => (todo.id === id ? { ...todo, done } : todo))
    )
    setTodos(newTodos)
  }

  // edit
  const startEditTodo = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id)
    if (foundTodo) {
      setCurrentTodo(foundTodo)
    }
  }

  const finishEditTodo = (name: string) => {
    const newTodos = syncReactWithLocal((todosFromLocal) =>
      todosFromLocal.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return { ...todo, name }
        }
        return todo
      })
    )
    setTodos(newTodos)
    setCurrentTodo(null)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo?.id === id) {
      setCurrentTodo(null)
    }

    const newTodos = syncReactWithLocal((todosFromLocal) => {
      return todosFromLocal.filter((todo) => todo.id !== id)
    })

    setTodos(newTodos)
  }

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  return (
    <>
      <div className='mx-auto max-w-[40rem]'>
        <div className='text-center'>
          <Typography.Title level={3}>My Todos</Typography.Title>
        </div>

        <Card size='small'>
          <TaskInput currentTodo={currentTodo} addTodo={addTodo} finishEditTodo={finishEditTodo} />
          <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
          {current === 'todo' && (
            <TaskList
              todos={notDoneTodos}
              handleDoneTodo={handleDoneTodo}
              startEditTodo={startEditTodo}
              deleteTodo={deleteTodo}
            />
          )}
          {current === 'complete' && (
            <TaskList
              todos={doneTodos}
              handleDoneTodo={handleDoneTodo}
              startEditTodo={startEditTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </Card>
      </div>
    </>
  )
}
