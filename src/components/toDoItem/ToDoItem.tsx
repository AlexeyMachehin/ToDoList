/* eslint-disable jsx-a11y/no-autofocus */
import { memo, useEffect, useRef, useState } from 'react';
import { deleteTodo, updateTodo } from '@/firebase/firebase';
import { Checkbox, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { ITodo } from '@/types/ITodo';
import classes from './todoItem.module.css';

interface IToDoItemProps {
  todo: ITodo;
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToDoItem({ todo, setIsLoaderOn }: IToDoItemProps) {
  const [titleForUpdate, setTitleForUpdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const updateTodoInput = useRef<HTMLInputElement | null>(null);

  const handleEnterKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      setIsLoaderOn(true);

      updateTodo({ ...todo, title: titleForUpdate }, todo.id).finally(() =>
        setIsLoaderOn(false),
      );
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (updateTodoInput.current) {
      updateTodoInput.current.scrollTo(0, updateTodoInput.current.scrollHeight);
      updateTodoInput.current.setSelectionRange(
        titleForUpdate.length,
        titleForUpdate.length,
      );
    }
  }, [isEdit]);

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

        {isEdit ? (
          <TextField
            multiline
            autoFocus
            fullWidth
            label="Type todo and press Enter"
            value={titleForUpdate}
            inputRef={updateTodoInput}
            maxRows={10}
            onChange={event => setTitleForUpdate(event.target.value)}
            onKeyDown={handleEnterKeyDown}
            onBlur={() => {
              setTitleForUpdate('');
              setIsEdit(false);
            }}
          />
        ) : (
          <Typography className={classes.title}>{todo.title}</Typography>
        )}

        <div className={classes.handlers}>
          {isEdit ? (
            <IconButton className={classes.handler} aria-label="delete">
              <EditOffIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.handler}
              onClick={() => {
                setTitleForUpdate(todo.title);
                setIsEdit(true);
              }}
              aria-label="delete">
              <EditIcon />
            </IconButton>
          )}

          <IconButton
            className={classes.handler}
            onClick={() => deleteTodo(todo)}
            aria-label="delete"
            color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      </li>
    </>
  );
}

function areTodoPropsEqual(
  prevProps: Readonly<{ todo: ITodo }>,
  nextProps: Readonly<{ todo: ITodo }>,
) {
  const prevItem = prevProps.todo;
  const nextItem = nextProps.todo;

  return (
    prevItem.isDone === nextItem.isDone && prevItem.title === nextItem.title
  );
}

export default memo(ToDoItem, areTodoPropsEqual);
