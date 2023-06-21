import { Toaster } from 'react-hot-toast';
import TodoList from './components/todoList/TodoList';
import './styles/App.css';

export default function App() {
  return (
    <div className="App">
      <Toaster toastOptions={{ duration: 2000 }} />
      <TodoList />
    </div>
  );
}
