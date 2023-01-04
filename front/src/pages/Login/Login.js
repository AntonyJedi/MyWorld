import React, {useContext, useEffect, useState} from 'react';
import {TextInput} from "evergreen-ui";
import {AlertContext} from "../../components/Alert/AlertContext";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import validation from '../../helpers/validation';

const Login = ({doLogin, isUserAuth}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const alert = useContext(AlertContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(formErrors).length >= 1) {
      alert.show(formErrors[Object.keys(formErrors)[0]], 'danger')
    } else if (Object.keys(formErrors).length === 0 && isSubmit) {
      (async function UserLogin() {
        await doLogin(email, password)
      })()
    }
  }, [formErrors])

  const sendLogin = () => {
    const validateResult = validation(email, password);
    setFormErrors(validateResult)
    setIsSubmit(true)
  }

  return (
    <>
      {isUserAuth ? setTimeout(() => navigate("/"), 100) :
        <motion.form
          initial={{translateX: "-25%", opacity: 0}}
          animate={{translateX: 0, opacity: 1}}
          exit={{translateX: "50%", opacity: 0}}
          transition={{duration: 0.5}}
        >
          <h2>Login form</h2>
          <TextInput
            value={email}
            name='text-input-name'
            placeholder='Please, enter your email'
            onChange={e => setEmail(e.target.value)}
          />
          <TextInput
            type='password'
            value={password}
            name='text-input-name'
            placeholder='Please, enter your password'
            onChange={e => setPassword(e.target.value)}
          />
          <a className='form_submit' onClick={sendLogin}><span>Sign in</span></a>
        </motion.form>
      }
    </>
  );
};

export default Login;