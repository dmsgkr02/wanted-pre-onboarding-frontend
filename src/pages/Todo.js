import React from "react";
import { useLoaderData } from "react-router-dom";

const CheckBox = ({todo, setTodos}) => {
  const [isChecked, setIsChecked] = React.useState(todo.isCompleted);

  
  const handleCheckBox = (event) => {
    setIsChecked(event.target.checked);

    setTodos((todos, outTodo = todo) => {
      const copyTodos = todos;
      const findIndex = todos.findIndex(todo => todo.id === outTodo.id);
      copyTodos[findIndex]['isCompleted'] = event.target.checked;
      
      return copyTodos
    });
  }
  
  return (
    <input type="checkbox" checked={isChecked} onChange={handleCheckBox} />
  );
  
}

const Todo = () => {
  const token = localStorage.getItem("JWT");
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState(useLoaderData());
  
  const [editId, setEditId] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  
  const handleTodo = (event) => {
    setNewTodo(event.target.value);
  }

  const handleEdit = (editId, editText) => {
    setEditId(editId);
    setEditValue(editText);
  }
  
  const handleEditValue = (event) => {
    setEditValue(event.target.value);
  }

  const createTodo = () => {
    
    fetch(`${process.env.REACT_APP_BACK_URL}/todos`, {
      method: 'POST',
      headers : {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "todo": newTodo,
      })
    }).then((response) => response.json())
      .then((data) => {
        setTodos(todos => [...todos, data]);
        setNewTodo("");
      });
  }

  const deleteTodo = (id) => {
    
    fetch(`${process.env.REACT_APP_BACK_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.status === 204) {
        setTodos(todos => todos.filter(todo => todo.id !== id));
      }
    });
  }

  const updateTodo = (id) => {
    const findIndex = todos.findIndex(todo => todo.id === id);

    fetch(`${process.env.REACT_APP_BACK_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "todo": editValue,
        "isCompleted":  todos[findIndex]['isCompleted']
      })
    }).then((response) => response.json())
      .then((data) => {
        setTodos((todos) => {
          const copyTodos = todos;
          copyTodos[findIndex] = data;

          return copyTodos
        });
        setEditId(null);
    });
  }

  return (
    <>
      <div>
        <input data-testid="new-todo-input" type="text" value={newTodo} onChange={handleTodo}/>
        <button data-testid="new-todo-add-button" onClick={createTodo}>추가</button>
      </div>
      
      <div>
        <ul>
          {todos.map((todo) => {            
            return (
              <li key={todo.id} >
                <label>
                  <CheckBox todo={todo} setTodos={setTodos} />
                </label>
                {todo.id === editId ?  (<>
                  <input data-testid="modify-input" value={editValue} onChange={handleEditValue} />
                  <button data-testid="submit-button" onClick={() => updateTodo(todo.id)}>제출</button>
                  <button data-testid="cancel-button" onClick={() => setEditId(null)}>취소</button>
                </>) : (<>
                  <span>{todo.todo}</span>
                  <button data-testid="modify-button" onClick={() => handleEdit(todo.id, todo.todo)}>수정</button>
                  <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
                </>) }
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Todo