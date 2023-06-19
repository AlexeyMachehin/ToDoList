import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodo, updateTodo } from '@/firebase/firebase';
import classes from './todoItem.module.css';

export default function ToDoItem({ todo }: { todo: any }) {
  return (
    <ListItem className={classes.todoItem}>
      <Checkbox
        onChange={() => updateTodo({ ...todo, isDone: !todo.isDone }, todo.id)}
        checked={todo.isDone}
        color="success"
      />

      <Typography>{todo.title}</Typography>

      <IconButton
        onClick={() => deleteTodo(todo)}
        aria-label="delete"
        color="error">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}
