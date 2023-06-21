import { ITodo } from '@/types/ITodo';
import { SortingType } from '@/types/sortingType';

export function group(todos: ITodo[], sortingType: SortingType) {
  switch (sortingType) {
    case 'all':
      return todos.sort((a, b) => a.date - b.date);

    case 'active':
      return todos.filter(todo => !todo.isDone).sort((a, b) => a.date - b.date);

    case 'completed':
      return todos.filter(todo => todo.isDone).sort((a, b) => a.date - b.date);
  }
}
