import toast from 'react-hot-toast';
import {
  addTodo,
  deleteTodo,
  updateTodo,
  deleteAllTodos,
  deleteCompletedTodos,
} from './firebase';

describe('Todo Functions', () => {
  const toastSuccessMock = jest.spyOn(toast, 'success');
  const toastErrorMock = jest.spyOn(toast, 'error');

  describe('addTodo', () => {
    it('should add a new todo successfully', async () => {
      const newTodo = { title: 'New Todo', isDone: false, date: 1 };

      await addTodo(newTodo);

      expect(toastSuccessMock).toHaveBeenCalledWith('Todo added successfully!');
      expect(toastErrorMock).not.toHaveBeenCalled();
    }, 5000);
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      const deletedTodo = {
        id: '123',
        title: 'Delete Me',
        isDone: false,
        date: 1,
      };

      await deleteTodo(deletedTodo);

      expect(toastSuccessMock).toHaveBeenCalledWith(
        'Todo deleted successfully!',
      );
      expect(toastErrorMock).not.toHaveBeenCalled();
    }, 5000);
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      const updatedTodo = { title: 'Updated Todo', isDone: true, date: 1 };
      const id = '12334';

      await updateTodo(updatedTodo, id);

      expect(toastSuccessMock).toHaveBeenCalledWith(
        'Todo updated successfully!',
      );
      expect(toastErrorMock).not.toHaveBeenCalled();
    }, 5000);
  });

  describe('deleteAllTodos', () => {
    it('should delete all todos successfully', async () => {
      const todos = [
        { id: 'todo-1', title: 'Todo 1', isDone: false, date: 1 },
        { id: 'todo-2', title: 'Todo 2', isDone: true, date: 1 },
        { id: 'todo-3', title: 'Todo 3', isDone: false, date: 1 },
      ];

      await deleteAllTodos(todos);

      expect(toastSuccessMock).toHaveBeenCalledWith(
        'Todos deleted successfully!',
      );
      expect(toastErrorMock).not.toHaveBeenCalled();
    }, 5000);
  });

  describe('deleteCompletedTodos', () => {
    it('should delete completed todos successfully', async () => {
      const todos = [
        { id: 'todo-1', title: 'Todo 1', isDone: false, date: 1 },
        { id: 'todo-2', title: 'Todo 2', isDone: true, date: 1 },
        { id: 'todo-3', title: 'Todo 3', isDone: true, date: 1 },
      ];

      await deleteCompletedTodos(todos);

      expect(toastSuccessMock).toHaveBeenCalledWith(
        'Completed todos deleted successfully!',
      );
      expect(toastErrorMock).not.toHaveBeenCalled();
    }, 5000);
  });
});
