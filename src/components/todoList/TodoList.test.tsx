import { render, screen, fireEvent } from '@testing-library/react';
import { deleteAllTodos, deleteCompletedTodos } from '@/firebase/firebase';
import TodoList from './TodoList';

jest.mock('@/firebase/firebase', () => ({
  deleteAllTodos: jest.fn(),
  deleteCompletedTodos: jest.fn(),
}));

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders TodoList component', () => {
    render(<TodoList />);
    const todoListElement = screen.getByText('Todos');
    expect(todoListElement).toBeInTheDocument();
  });

  test('displays "No todos" when there are no todos', () => {
    render(<TodoList />);
    const noTodosElement = screen.getByText('No todos');
    expect(noTodosElement).toBeInTheDocument();
  });

  test('displays todos when there are todos', async () => {
    const todos = [
      { id: 1, text: 'Todo 1', isDone: false },
      { id: 2, text: 'Todo 2', isDone: true },
    ];
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(todos),
    });

    render(<TodoList />);

    const todo1Element = screen.getByText('Todo 1');
    const todo2Element = screen.getByText('Todo 2');
    expect(todo1Element).toBeInTheDocument();
    expect(todo2Element).toBeInTheDocument();
  });

  test('calls deleteCompletedTodos when "Clear completed" button is clicked', () => {
    render(<TodoList />);
    const clearCompletedButton = screen.getByText('Clear completed');

    fireEvent.click(clearCompletedButton);

    expect(deleteCompletedTodos).toHaveBeenCalled();
  });

  test('calls deleteAllTodos when "Clear all" button is clicked', () => {
    render(<TodoList />);
    const clearAllButton = screen.getByText('Clear all');

    fireEvent.click(clearAllButton);

    expect(deleteAllTodos).toHaveBeenCalled();
  });
});
