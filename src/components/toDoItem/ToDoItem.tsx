import { memo } from 'react';
import { deleteTodo, updateTodo } from '@/firebase/firebase';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITodo } from '@/types/ITodo';
import classes from './todoItem.module.css';

function ToDoItem({ todo }: { todo: ITodo }) {
  return (
    <>
      <li className={classes.todoItem}>
        <Checkbox
          className={classes.handler}
          onChange={() =>
            updateTodo({ ...todo, isDone: !todo.isDone }, todo.id)
          }
          checked={todo.isDone}
          color="success"
        />

        <Typography>{todo.title}</Typography>

        <IconButton
          className={classes.handler}
          onClick={() => deleteTodo(todo)}
          aria-label="delete"
          color="error">
          <DeleteIcon />
        </IconButton>
      </li>
    </>
  );
}

function areBookPropsEqual(
  prevProps: Readonly<{ todo: ITodo }>,
  nextProps: Readonly<{ todo: ITodo }>,
) {
  const prevItem = prevProps.todo;
  const nextItem = nextProps.todo;

  return prevItem.isDone === nextItem.isDone;
}

export default memo(ToDoItem, areBookPropsEqual);
