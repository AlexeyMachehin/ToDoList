import './matchMedia.mock';
import { render } from '@testing-library/react';
import TodoInput from '@/components/todoInput/TodoInput';

test('TodoInput renders correctly', () => {
  const component = render(<TodoInput setIsLoaderOn={() => {}} />);
  expect(component).toMatchSnapshot();
});
