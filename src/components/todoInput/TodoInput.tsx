import { addTodo } from '@/firebase/firebase';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function TodoInput() {
  const [todoInputValue, setTodoInputValue] = useState('');

  const handleEnterKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      addTodo({ isDone: false, title: todoInputValue });
      setTodoInputValue('');
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label="Type new todo and press Enter"
        variant="outlined"
        onChange={event => setTodoInputValue(event.target.value)}
        value={todoInputValue}
        onKeyDown={handleEnterKeyDown}
      />
    </>
  );
}
