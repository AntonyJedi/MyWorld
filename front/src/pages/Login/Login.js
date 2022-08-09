import React, {useState} from 'react';
import {TextInput} from "evergreen-ui";
import style from './Login.module.scss'

const Login = ({doLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sendLogin = async e => {
    e.preventDefault();
    await doLogin(email, password);
  }
  return (
    <form>
      <h2>Login form</h2>
      <TextInput
        value={email}
        name="text-input-name"
        placeholder="Please, enter your email"
        onChange={e => setEmail(e.target.value)}
      />
      <TextInput
        type='password'
        value={password}
        name="text-input-name"
        placeholder="Please, enter your password"
        onChange={e => setPassword(e.target.value)}
      />
      <a className="form_submit" onClick={sendLogin}><span>Sign in</span></a>
    </form>
  );
};

export default Login;