import { useEffect, useMemo, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import {
  deleteAllTodos,
  colRef,
  deleteCompletedTodos,
} from '@/firebase/firebase';
import { group } from '@/utils/group';
import Loader from '../loader/Loader';
import { toast } from 'react-hot-toast';
import Sorting from '../sorting/Sorting';
import { Button, Typography } from '@mui/material';
import ToDoItem from '../toDoItem/ToDoItem';
import TodoInput from '../todoInput/TodoInput';
import { SortingType } from '@/types/sortingType';
import { ITodo } from '@/types/ITodo';
import classes from './toDoList.module.css';

export default function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.All);
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  const sortedTodos = useMemo(
    () => group(todos, sortingType),
    [todos, sortingType],
  );

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.isDone === true);
  }, [todos]);

  useEffect(() => {
    const todosSnapshotSubscription = onSnapshot(
      colRef,
      snapshot => {
        const todosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ITodo[];

        if (todosData) {
          setTodos(todosData);
        }
      },
      error => {
        console.log(error.message);
        toast.error('Error while loading todos');
      },
    );

    return () => todosSnapshotSubscription();
  }, []);

  return (
    <div className={classes.toDoListWrapper}>
      {isLoaderOn ? <Loader /> : null}

      <Typography component="h1" variant="h1">
        Todos
      </Typography>

      <section className={classes.filters}>
        <Sorting
          isDisabled={!todos.length}
          sortingType={sortingType}
          setSortingType={setSortingType}
        />

        <Button
          disabled={!completedTodos.length}
          onClick={() => {
            setIsLoaderOn(true);
            deleteCompletedTodos(todos).finally(() => setIsLoaderOn(false));
          }}
          variant="outlined"
          color="secondary">
          Clear completed
        </Button>

        <Button
          disabled={!todos.length}
          onClick={() => {
            setIsLoaderOn(true);
            deleteAllTodos(todos).finally(() => setIsLoaderOn(false));
          }}
          variant="outlined"
          color="error">
          Clear all
        </Button>
      </section>

      <TodoInput setIsLoaderOn={setIsLoaderOn} />

      <ul className={classes.todoList}>
        {sortedTodos?.length ? (
          sortedTodos.map((todo: ITodo) => {
            return <ToDoItem key={todo.id} todo={todo} />;
          })
        ) : (
          <div>No todos</div>
        )}
      </ul>
    </div>
  );
}
