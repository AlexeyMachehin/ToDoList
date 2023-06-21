export interface ITodo {
  date: number;
  title: string;
  isDone: boolean;
  id: string;
}

export type NewTodo = Omit<ITodo, 'id'>;
