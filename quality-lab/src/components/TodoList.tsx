type Todo = {
  id: number;
  text: string;
};

type TodoListProps = {
  todoList: Todo[];
  onRemoveTodo: (id: number) => void;
};

// I will write down the edit version out first

// Now, to edit. When a user clicks on the particular item to edit,
// It must be identifiable through the item's id.
// Now, we should go through the list, identify that id of what should be
// edited and edit it and then click save button to confirm.
// so when edit is clicked on a todo, it should have cancel or save button

function TodoList({ todoList, onRemoveTodo }: TodoListProps) {
  return (
    <div>
      <h2>LIST OF TODO</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
