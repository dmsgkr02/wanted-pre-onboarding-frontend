import React, { useState } from 'react'
import { useLoaderData } from "react-router-dom";
import './Todo.css'

const TodoElement =({todo, deleteTodo, token, setTodos}) => {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);
  const [isChecked, setIsChecked] = useState(todo.isCompleted);
  
  const handleTodo = (event) => {
    setEditValue(event.target.value);
  }

  const cancelEdit = () => {
    setEdit(false);
    setEditValue(todo.todo);
  }

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  }

  const updateTodo = (id) => {
    fetch(`${process.env.REACT_APP_BACK_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "todo": editValue,
        "isCompleted":  isChecked,
      })
    }).then((response) => response.json())
      .then((data) => {
        setEdit(false);
        setTodos(todos => todos.map((todo) => {
          if (todo.id === data.id) {
            return data
          }
          return todo
        }));
    });
  }

  return (
    <>
      <input type="checkbox" checked={isChecked} onChange={handleChecked}/>
      {edit ? 
      <>
        <input data-testid="modify-input" value={editValue} onChange={handleTodo}/>
        <button data-testid="submit-button" onClick={() => updateTodo(todo.id)}>제출</button>
        <button data-testid="cancel-button" onClick={cancelEdit}>취소</button>
      </> : 
       <>
        <span>{todo.todo}</span>
        <button data-testid="modify-button" onClick={() => setEdit(true)}>수정</button>
        <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>삭제</button>
      </>
      }
    </>
  );
}

export default function Todo() {
  const token = localStorage.getItem("JWT");
  const [todos, setTodos] = useState(useLoaderData());
  const [newTodo, setNewTodo] = useState("");
  const [createTodoDisabled, setCreateTodoDisabled] = useState(true);

  const handleNewTodo = (event) => {
    setNewTodo(event.target.value);
    if (event.target.value.length > 0) {
      setCreateTodoDisabled(false);
    } else {
      setCreateTodoDisabled(true);
    }
  }

  const createTodo = () => {
    fetch(`${process.env.REACT_APP_BACK_URL}/todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "todo": newTodo,
      })
    })
    .then(response => response.json())
    .then((data) => {
      if (data.statusCode === 400) {
        throw new Error(data.message);
      } else {
        setTodos(todos => [...todos, data]);
        setNewTodo("");
      }
    }).catch((error) => {
      console.log(error);
    })
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
      else {
        throw new Error(response.statusText);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className='container'>
      <div className='todo-container'>
        <div className='title'>
          투두 리스트
        </div>
        <div className='new-todo-container'>
          <input placeholder="추가" data-testid="new-todo-input" value={newTodo} onChange={handleNewTodo}/>
          <button data-testid="new-todo-add-button" disabled={createTodoDisabled} onClick={createTodo}>추가</button>
        </div>
        <div>
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <label>
                    <TodoElement token={token} todo={todo} deleteTodo={deleteTodo} setTodos={setTodos}/>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
