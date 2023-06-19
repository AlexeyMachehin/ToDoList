import { ITodo } from '@/types/ITodo';
import { SortingType } from '@/types/sortingType';

export function group(todos: ITodo[], sortingType: SortingType) {
  if (sortingType === 'all') {
    return todos;
  }

  if (sortingType === 'active') {
    const result = todos.filter(todo => todo.isDone === false);
    return result;
  }

  if (sortingType === 'completed') {
    const result = todos.filter(todo => todo.isDone === true);
    return result;
  }
}
