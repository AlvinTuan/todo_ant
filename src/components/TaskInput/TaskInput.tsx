import { Todo } from '@/@types/todo.type'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  finishEditTodo: (name: string) => void
}

export default function TaskInput({ addTodo, currentTodo, finishEditTodo }: TaskInputProps) {
  const [form] = Form.useForm()

  const onFinish: FormProps<{ name: string }>['onFinish'] = (values) => {
    console.log('name', values.name)

    if (currentTodo) {
      finishEditTodo(values.name)
    } else {
      addTodo(values.name)
    }

    form.resetFields()
  }

  return (
    <div>
      <Form
        style={{ width: '100%' }}
        form={form}
        onFinish={onFinish}
        fields={[
          {
            name: ['name'],
            value: currentTodo?.name ?? ''
          }
        ]}
      >
        <div className='flex space-x-2'>
          <Form.Item name={'name'} className='flex-1'>
            <Input width={'100%'} />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' variant='filled' color='default'>
              {currentTodo ? 'Done' : 'Add'}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}
