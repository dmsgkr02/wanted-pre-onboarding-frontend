import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';
import Fallback from './pages/Fallback';


const signLoader = () => {
  const token = localStorage.getItem("JWT");
  if (token) {
    return redirect('/todo');
  }
  return null;
}

const todoLoader = async () => {
  const token = localStorage.getItem("JWT");
  if (!token) {
    return redirect('/signin');
  }
  
  const data = await fetch(`${process.env.REACT_APP_BACK_URL}/todos`, {
    method: "GET",
    headers : {
      Authorization: `Bearer ${token}`,
    }
  }).then(response => response.json())
    .then((data) => {
      if (data.statusCode === 401) {
        throw new Error(data.message);
      } else {
        return data;
      }
    })
    .catch((error) => {
      
    });
    
  return data;
}

const router = createBrowserRouter([
  {path: "/", element: <Home /> },
  {path: "/signin", loader:signLoader, element: <SignIn /> },
  {path: "/signup", loader:signLoader, element: <SignUp /> },
  {path: "/todo", loader:todoLoader, element: <Todo /> },
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={Fallback} />
  );
}

export default App;
