import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Todo from './pages/Todo';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const signLoader = () => {
  const token = localStorage.getItem("JWT");
  if (token) {
    return redirect('/todo');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signin",
    loader:signLoader,
    element: <Signin />
  },
  {
    path: "/signup",
    loader:signLoader,
    element: <Signup />
  },
  {
    path: "/todo",
    element: <Todo />
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
