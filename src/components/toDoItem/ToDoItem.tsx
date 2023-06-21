/* eslint-disable jsx-a11y/no-autofocus */
import { memo, useEffect, useRef, useState } from 'react';
import { deleteTodo, updateTodo } from '@/firebase/firebase';
import { Checkbox, IconButton, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import DoneIcon from '@mui/icons-material/Done';
import { ITodo } from '@/types/ITodo';
import classes from './todoItem.module.css';

interface IToDoItemProps {
  todo: ITodo;
  editTodoId: string | null;
  setEditTodoId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToDoItem({
  todo,
  editTodoId,
  setIsLoaderOn,
  setEditTodoId,
}: IToDoItemProps) {
  const [titleForUpdate, setTitleForUpdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const updateTodoInput = useRef<HTMLInputElement | null>(null);

  const handleClickUpdateTodo = () => {
    if (!titleForUpdate) {
      toast.error('Error: type text in the text field');
      return;
    }

    setIsLoaderOn(true);

    updateTodo({ ...todo, title: titleForUpdate }, todo.id).finally(() =>
      setIsLoaderOn(false),
    );
    setIsEdit(false);
    setEditTodoId(null);
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

        {todo.id === editTodoId ? (
          <TextField
            multiline
            autoFocus
            fullWidth
            label="Type todo"
            value={titleForUpdate}
            inputRef={updateTodoInput}
            maxRows={20}
            onChange={event => setTitleForUpdate(event.target.value)}
          />
        ) : (
          <Typography className={classes.title}>{todo.title}</Typography>
        )}

        <div className={classes.handlers}>
          <div className={classes.handlersContainer}>
            {todo.id === editTodoId ? (
              <IconButton
                className={classes.handler}
                onClick={() => {
                  setIsEdit(false);
                  setEditTodoId(null);
                }}>
                <EditOffIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.handler}
                onClick={() => {
                  setTitleForUpdate(todo.title);
                  setIsEdit(true);
                  setEditTodoId(todo.id);
                }}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton
              className={classes.handler}
              onClick={() => deleteTodo(todo)}
              color="error">
              <DeleteIcon />
            </IconButton>
          </div>

          {todo.id === editTodoId && (
            <IconButton onClick={handleClickUpdateTodo} color="success">
              <DoneIcon />
            </IconButton>
          )}
        </div>
      </li>
    </>
  );
}

function areTodoPropsEqual(
  prevProps: Readonly<{ todo: ITodo; editTodoId: string | null }>,
  nextProps: Readonly<{ todo: ITodo; editTodoId: string | null }>,
) {
  const prevTodo = prevProps.todo;
  const nextTodo = nextProps.todo;

  const prevEditTodoId = prevProps.editTodoId;
  const nextEditTodoId = nextProps.editTodoId;

  return (
    prevTodo.isDone === nextTodo.isDone &&
    prevTodo.title === nextTodo.title &&
    prevEditTodoId === nextEditTodoId
  );
}

export default memo(ToDoItem, areTodoPropsEqual);
