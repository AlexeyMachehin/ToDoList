import { Toaster } from 'react-hot-toast';
import './styles/App.css';
import TodoList from './components/toDoList/ToDoList';

export default function App() {
  return (
    <div className="App">
      <Toaster toastOptions={{ duration: 4000 }} />
      <TodoList />
    </div>
  );
}
