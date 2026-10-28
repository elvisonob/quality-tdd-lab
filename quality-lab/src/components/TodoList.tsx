type Todo = {
  id: number;
  text: string;
};

type TodoListProps = {
  todoList: Todo[];
  onRemoveTodo: (id: number) => void;
  onEditTodo: (id: number) => void;
  editingTodoId: number | null;
  editText: string;
  onChangeEditedTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveEditText: (id: number) => void;
  onCancelEdit: () => void;
};

function TodoList({
  todoList,
  onRemoveTodo,
  onEditTodo,
  editingTodoId,
  editText,
  onChangeEditedTodo,
  onSaveEditText,
  onCancelEdit,
}: TodoListProps) {
  return (
    <div>
      <h2>LIST OF TODO</h2>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  aria-label="editText"
                  value={editText}
                  type="text"
                  id="editText"
                  onChange={onChangeEditedTodo}
                />
                <button onClick={() => onSaveEditText(todo.id)}>Save</button>
                <button onClick={onCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
                <button onClick={() => onEditTodo(todo.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
