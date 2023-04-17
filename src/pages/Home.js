import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>To Do List</h1>
      <Link to="/signin" >로그인</Link>
      <br />
      <br />
      <Link to="/signup" >회원가입</Link>    
    </div>
  );
}

export default Home