export interface Todo {
  name: string
  done: boolean
  id: string
}

export type HandleTodo = (todo: Todo[]) => Todo[]
