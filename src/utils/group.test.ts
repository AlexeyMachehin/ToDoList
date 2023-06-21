import { group } from './group';
import { ITodo } from '@/types/ITodo';
import { SortingType } from '@/types/sortingType';

describe('group', () => {
  const todos: ITodo[] = [
    { id: '1', title: 'Task 1', isDone: true },
    { id: '2', title: 'Task 2', isDone: false },
    { id: '3', title: 'Task 3', isDone: true },
    { id: '4', title: 'Task 4', isDone: false },
  ];

  test('should return all todos when sorting type is "All"', () => {
    const sortingType: SortingType = SortingType.All;
    const result = group(todos, sortingType);
    expect(result).toEqual(todos);
  });

  test('should return active todos when sorting type is "Active"', () => {
    const sortingType: SortingType = SortingType.Active;
    const expectedActiveTodos: ITodo[] = [
      { id: '2', title: 'Task 2', isDone: false },
      { id: '4', title: 'Task 4', isDone: false },
    ];
    const result = group(todos, sortingType);
    expect(result).toEqual(expectedActiveTodos);
  });

  test('should return completed todos when sorting type is "Completed"', () => {
    const sortingType: SortingType = SortingType.Completed;
    const expectedCompletedTodos: ITodo[] = [
      { id: '1', title: 'Task 1', isDone: true },
      { id: '3', title: 'Task 3', isDone: true },
    ];
    const result = group(todos, sortingType);
    expect(result).toEqual(expectedCompletedTodos);
  });
});
