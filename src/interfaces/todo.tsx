export interface Todo {
  id: number;
  title: string;
  description: string;
  created_at: string;
  completed: boolean;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (item: { title: string; description: string }) => void;
  toggleTodo: (id: number) => void;
  editTodo: (item: Todo) => void;
  deleteTodo: (id: number) => void;
}