import React, {useState} from 'react';
import {authAPI, usersAPI} from "../../API/api";

const Login = ({doLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sendLogin = async e => {
    debugger
    e.preventDefault();
    const finalLog = await doLogin(email, password);
    console.log(finalLog);
  }
  return (
    <form onSubmit={sendLogin}>
      <input value={email} type="text" onChange={e => setEmail(e.target.value)} placeholder='email'/>
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder='password'/>
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;