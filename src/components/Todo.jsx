import { useState ,useRef ,useEffect } from "react";

import "../components/Todo.css"
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [warning, setWarning] = useState("");
  const inputRef = useRef(null)

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  function AddTodo() {
    if (newTodo === "") {
      setWarning("Input Field is empty");
    } else if (newTodo !== "") {
      setTodos([...todos, { id: Date.now(), task: newTodo, status: false }]);
      setNewTodo("");
      setWarning("");
      inputRef.current.focus()
    }
  }

  const toggleStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  function handleDelete(id){
 setTodos( prevTodos => prevTodos.filter(del => del.id != id))
  }

  return (
    <>
      {" "}
      <div className="outerbox" >
        <h4>Todos</h4>
        <label>
          Todos : {" "}
          <input
            value={newTodo}
            ref={inputRef}
            type="text"
            placeholder="Enter Task"
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </label>
        <button onClick={AddTodo}>Add Todo</button>
        {warning && <p>{warning}</p>}
      </div>
      <div>
        {todos.map((todo) => (
          <div className="innerbox" key={todo.id}>
            {todo.task}
            {todo.status}
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => toggleStatus(todo.id)}
            />
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
