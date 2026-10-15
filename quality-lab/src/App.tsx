import TodoList from './components/TodoList';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
};

function App() {
  const [todoText, setTodotext] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  function onChangeTodo(e: React.ChangeEvent<HTMLInputElement>) {
    setTodotext(e.target.value);
  }

  function onChangeEditedTodo(e: React.ChangeEvent<HTMLInputElement>) {
    setEditText(e.target.value);
  }

  function onSubmit() {
    setTodoList((prev) => [...prev, { id: Math.random(), text: todoText }]);
    setTodotext('');
  }

  function onRemoveTodo(id: number) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function onEditTodo(id: number) {
    const todo = todoList.find((todo) => todo.id === id);
    if (todo) {
      setEditingTodoId(id);
      setEditText(todo.text);
    }
  }

  function onCancelEdit() {
    setEditingTodoId(null);
    setEditText('');
  }

  function onSaveEditText(id: number) {
    //go through all the todoList and then single the one with
    // matching id to what is been edited and and then

    setTodoList((prev) => {
      return prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: editText,
            }
          : todo,
      );
    });

    setEditingTodoId(null);
    setEditText('');
  }

  return (
    <main>
      <h1>TODO APP</h1>
      <h3>ADD A TODO</h3>
      <div>
        <input type="text" id="text" value={todoText} onChange={onChangeTodo} />
        <button onClick={onSubmit}>Enter</button>
      </div>
      <TodoList
        todoList={todoList}
        onEditTodo={onEditTodo}
        onRemoveTodo={onRemoveTodo}
        editingTodoId={editingTodoId}
        editText={editText}
        onChangeEditedTodo={onChangeEditedTodo}
        onCancelEdit={onCancelEdit}
        onSaveEditText={onSaveEditText}
      />
    </main>
  );
}

export default App;
