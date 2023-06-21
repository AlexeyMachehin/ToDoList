import { memo, useState } from 'react';
import { addTodo } from '@/firebase/firebase';
import { TextField } from '@mui/material';

function TodoInput({
  setIsLoaderOn,
}: {
  setIsLoaderOn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [todoInputValue, setTodoInputValue] = useState('');

  const handleEnterKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === 'Enter' && todoInputValue !== '') {
      event.preventDefault();
      setIsLoaderOn(true);

      addTodo({
        date: new Date().getTime(),
        isDone: false,
        title: todoInputValue.trim(),
      }).finally(() => setIsLoaderOn(false));

      setTodoInputValue('');
    }
  };

  return (
    <>
      <TextField
        fullWidth
        multiline
        maxRows={20}
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
