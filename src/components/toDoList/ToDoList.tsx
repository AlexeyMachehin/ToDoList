import { useEffect, useMemo, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import {
  deleteAllTodos,
  colRef,
  deleteCompletedTodos,
} from '@/firebase/firebase';
import Loader from '../loader/Loader';
import { toast } from 'react-hot-toast';
import { SortingType } from '@/types/sortingType';
import Sorting from '../sorting/Sorting';
import { group } from '@/utils/group';
import { Button, Divider, List, TextField, Typography } from '@mui/material';
import ToDoItem from '../toDoItem/ToDoItem';
import classes from './toDoList.module.css';
import React from 'react';
import TodoInput from '../todoInput/TodoInput';
import { ITodo } from '@/types/ITodo';

export default function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.All);
  const [isLoaderOn, setIsLoaderOn] = useState(false);

  const sortedTodos = useMemo(
    () => group(todos, sortingType),
    [todos, sortingType],
  );

  useEffect(() => {
    const todosSnapshotSubscription = onSnapshot(
      colRef,
      snapshot => {
        const todosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ITodo[];

        console.log(todosData);

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
      {/* {!sortedTodos.length || isLoaderOn ? (
        <Loader isFirstLoad={!sortedTodos.length} />
      ) : null} */}

      <Typography component="h1" variant="h1">
        Todos
      </Typography>

      <section className={classes.filters}>
        <Sorting sortingType={sortingType} setSortingType={setSortingType} />

        <Button
          disabled={!todos.length}
          onClick={() => deleteCompletedTodos(todos)}
          variant="outlined"
          color="secondary">
          Clear completed
        </Button>

        <Button
          disabled={!todos.length}
          onClick={() => deleteAllTodos(todos)}
          variant="outlined"
          color="error">
          Clear all
        </Button>
      </section>

      <TodoInput />

      <List className={classes.todoList}>
        {sortedTodos ? (
          sortedTodos.map((todo: ITodo) => {
            return (
              <React.Fragment key={todo.id}>
                <Divider /> <ToDoItem todo={todo} />
              </React.Fragment>
            );
          })
        ) : (
          <div>No todos</div>
        )}

        {todos.length ? <Divider /> : null}
      </List>
    </div>
  );
}
