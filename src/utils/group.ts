import { ITodo } from '@/types/ITodo';
import { SortingType } from '@/types/sortingType';

export function group(todos: ITodo[], sortingType: SortingType) {
  switch (sortingType) {
    case 'all':
      return todos;

    case 'active':
      return todos.filter(todo => !todo.isDone);

    case 'completed':
      return todos.filter(todo => todo.isDone);
  }
}
