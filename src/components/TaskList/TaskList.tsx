import { Todo } from '@/@types/todo.type'
import type { CheckboxProps } from 'antd'
import { Button, Checkbox, Typography } from 'antd'

interface TaskListProps {
  todos: Todo[]
  doneTaskList?: boolean
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList({ todos, doneTaskList, handleDoneTodo, startEditTodo, deleteTodo }: TaskListProps) {
  const onChange =
    (id: string): CheckboxProps['onChange'] =>
    (e) => {
      handleDoneTodo(id, e.target.checked)
    }

  return (
    <div>
      <Typography.Title level={5}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</Typography.Title>
      <div className='tasks'>
        {todos.map((todo) => (
          <div key={todo.id} className='flex items-center justify-between [&:not(:last-child)]:mb-2 task'>
            <Checkbox onChange={onChange(todo.id)} checked={todo.done}>
              <Typography.Text type={todo.done ? 'secondary' : undefined} delete={todo.done}>
                {todo.name}
              </Typography.Text>
            </Checkbox>
            <div className='flex items-center justify-between space-x-2'>
              <Button color='default' variant='filled' onClick={() => startEditTodo(todo.id)}>
                Edit
              </Button>
              <Button color='default' variant='filled' onClick={() => deleteTodo(todo.id)}>
                🗑️
              </Button>
            </div>
          </div>
        ))}

        {/* <div className='flex items-center justify-between [&:not(:last-child)]:mb-2 task'>
          <Checkbox onChange={onChange} checked>
            <Typography.Text type='secondary' delete>
              Checkbox
            </Typography.Text>
          </Checkbox>
          <div className='flex items-center space-x-2'>
            <Button color='default' variant='filled'>
              Edit
            </Button>
            <Button color='default' variant='filled'>
              🗑️
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
