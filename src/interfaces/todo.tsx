export interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string | null;
  completed: boolean;
}

export interface TodoForm {
  id: number;
  title: string;
  description: string;
  createdAt: string | null;
  completed: boolean;
  errors: TodoFormErrors;
}

export interface TodoFormErrors {
  title: '',
  description: '',
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (item: { title: string; description: string }) => void;
  toggleTodo: (id: number) => void;
  editTodo: (item: Todo) => void;
  deleteTodo: (id: number) => void;
}

export interface TodoFormStore {
  todoForm: TodoForm;
  formReset: () => void;
  todoFormSet: (field: keyof Omit<TodoForm, 'errors'>, value: string | number | boolean | null) => void;
  todoFormSetError: (field: keyof TodoFormErrors, value: string) => void;
  loadForm: (todo: Todo) => void;
}