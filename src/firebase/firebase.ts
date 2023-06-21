import { ITodo, NewTodo } from '@/types/ITodo';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const colRef = collection(db, 'todos');

export async function addTodo(newTodo: NewTodo): Promise<string> {
  try {
    await addDoc(colRef, newTodo);
    return toast.success('Todo added successfully!');
  } catch (error: unknown) {
    return toast.error('Error: could not add new todo');
  }
}

export async function deleteTodo(deletedTodo: ITodo): Promise<void> {
  try {
    await deleteDoc(doc(db, 'todos', deletedTodo.id));
    toast.success('Todo deleted successfully!');
  } catch (error: unknown) {
    toast.error('Error: could not delete todo');
  }
}

export async function updateTodo(
  updatedTodo: NewTodo,
  id: string,
): Promise<void> {
  try {
    await updateDoc(doc(db, 'todos', id), updatedTodo);
    toast.success('Todo updated successfully!');
  } catch (error: unknown) {
    toast.error('Error: could not update todo');
  }
}

export async function deleteAllTodos(todos: ITodo[]) {
  const todoPromises = todos.map((todo: ITodo) => {
    return deleteDoc(doc(db, 'todos', todo.id));
  });

  try {
    await Promise.all(todoPromises);
    toast.success('Todos deleted successfully!');
  } catch (error) {
    toast.error('Error: could not delete todos');
  }
}

export async function deleteCompletedTodos(todos: ITodo[]) {
  const completedTodos = todos.filter((todo: ITodo) => todo.isDone === true);

  const todoPromises = completedTodos.map((todo: ITodo) => {
    return deleteDoc(doc(db, 'todos', todo.id));
  });

  try {
    await Promise.all(todoPromises);
    toast.success('Completed todos deleted successfully!');
  } catch (error) {
    toast.error('Error: could not delete completed todos');
  }
}
