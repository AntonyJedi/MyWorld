import React, {useState} from 'react';
import {authAPI} from "../../API/api";
import {TextInput} from "evergreen-ui";
import style from "../Registration/Registration.module.scss";

const Registration = ({doReg}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sendReg = async e => {
    e.preventDefault();
    const finaReg = await doReg(name, email, password);
    console.log(finaReg);
  }
  return (
    <form>
      <h2>Registration form</h2>
      <TextInput
        value={name}
        name="text-input-name"
        placeholder="Please, enter your name"
        onChange={e => setName(e.target.value)}
      />
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
      <a className="form_submit" onClick={sendReg}><span>Sign up</span></a>
    </form>
  );
};

export default Registration;