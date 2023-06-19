export interface ITodo {
  title: string;
  isDone: boolean;
  id: string;
}

export type NewTodo = Omit<ITodo, 'id'>;
