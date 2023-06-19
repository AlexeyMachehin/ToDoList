import { memo, useState } from 'react';
import { addTodo } from '@/firebase/firebase';
import { TextField } from '@mui/material';

function TodoInput({
  setIsLoaderOn,
}: {
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [todoInputValue, setTodoInputValue] = useState('');

  const handleEnterKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter' && todoInputValue !== '') {
      setIsLoaderOn(true);

      addTodo({ isDone: false, title: todoInputValue }).finally(() =>
        setIsLoaderOn(false),
      );

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

export default memo(TodoInput);
