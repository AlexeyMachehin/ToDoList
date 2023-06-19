import { useEffect, useMemo, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { colRef } from '@/firebase/firebase';
import Loader from '../loader/Loader';
import { toast } from 'react-hot-toast';
import { SortingType } from '@/types/sortingType';
import Sorting from '../sorting/Sorting';
import { group } from '@/utils/group';
import classes from './toDoList.module.css';
import { Typography } from '@mui/material';
import ToDoItem from '../toDoItem/ToDoItem';

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
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
        })) as any[];

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
      <Typography component="h1" variant="h1">
        Todos
      </Typography>

      <section className={classes.filters}>
        <Sorting sortingType={sortingType} setSortingType={setSortingType} />
      </section>

      <section className={classes.todosList}>
        {!sortedTodos.length || isLoaderOn ? (
          <Loader isFirstLoad={!sortedTodos.length} />
        ) : null}

        {sortedTodos.length &&
          sortedTodos.map(todo => <ToDoItem key={todo.id} todo={todo} />)}
      </section>
    </div>
  );
}
