import './App.css';
import { Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Link to={`/signin`}>로그인</Link>
      <Link to={`/signup`}>회원가입</Link>
      <Link to={`/todo`}>투두 리스트</Link>
    </div>
  );
}

export default App;
