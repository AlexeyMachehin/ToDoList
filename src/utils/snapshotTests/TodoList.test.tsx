import './matchMedia.mock';
import { render } from '@testing-library/react';
import TodoList from '@/components/todoList/TodoList';

test('TodoList renders correctly', () => {
  const component = render(<TodoList />);
  expect(component).toMatchSnapshot();
});
