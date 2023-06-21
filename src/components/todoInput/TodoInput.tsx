import { memo, useState } from 'react';
import toast from 'react-hot-toast';
import { addTodo } from '@/firebase/firebase';
import { Button, TextField } from '@mui/material';
import classes from './todoInput.module.css';

function TodoInput({
  setIsLoaderOn,
}: {
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [todoInputValue, setTodoInputValue] = useState('');

  const handleClickSubmit = () => {
    if (!todoInputValue) {
      toast.error('Error: type text in the text field');
      return;
    }

    setIsLoaderOn(true);

    addTodo({
      date: new Date().getTime(),
      isDone: false,
      title: todoInputValue.trim(),
    }).finally(() => setIsLoaderOn(false));

    setTodoInputValue('');
  };

  return (
    <div className={classes.todoInput}>
      <TextField
        fullWidth
        multiline
        maxRows={20}
        label="Type new todo"
        variant="outlined"
        value={todoInputValue}
        onChange={event => setTodoInputValue(event.target.value)}
      />

      <Button
        className={classes.addTodoButton}
        variant="outlined"
        onClick={handleClickSubmit}>
        Add todo
      </Button>
    </div>
  );
}

export default memo(TodoInput);
