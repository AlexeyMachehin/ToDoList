export function group(todos, sortingType) {
  if (sortingType === 'all') {
    return todos;
  }

  if (sortingType === 'active') {
    const result = todos.filter(todo => todo.isDone === false);
    return result;
  }

  if (sortingType === 'completed') {
    const result = todos.filter(todo => todo.isDone === true);
    return result;
  }
}
