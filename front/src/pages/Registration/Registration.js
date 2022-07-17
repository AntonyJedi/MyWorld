import React, {useState} from 'react';
import {authAPI} from "../../API/api";

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sendReg = async e => {
    e.preventDefault();
    const resFromReg = await authAPI.registration(name, email, password)
    console.log(resFromReg);
  }
  return (
    <form onSubmit={sendReg}>
      <input type="text" onChange={e => setName(e.target.value)} placeholder='name'/>
      <input type="text" onChange={e => setEmail(e.target.value)} placeholder='email'/>
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder='password'/>
      <button type='submit'>Registration</button>
    </form>
  );
};

export default Registration;