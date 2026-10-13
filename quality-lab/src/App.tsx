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
    setTodotext(e.target.value);
  }

  function onSubmit() {
    setTodoList((prev) => [...prev, { id: Math.random(), text: todoText }]);
    setTodotext('');
  }

  function onRemoveTodo(id: number) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function onEditTodo(id: number) {
    setEditingTodoId(id);
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
      />
    </main>
  );
}

export default App;
