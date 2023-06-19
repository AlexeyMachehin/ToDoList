import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
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

export async function addTodo(newTodo: any): Promise<void> {
  try {
    await addDoc(colRef, newTodo);
    toast.success('Todo added successfully!');
  } catch (error: unknown) {
    toast.error('Error: could not add new todo');
  }
}

export async function deleteTodo(deletedTodo: any): Promise<void> {
  try {
    await deleteDoc(doc(db, 'todos', deletedTodo.id));
    toast.success('Todo deleted successfully!');
  } catch (error: unknown) {
    toast.error('Error: could not delete todo');
  }
}
