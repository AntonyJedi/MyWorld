import React, {useContext, useEffect, useState} from 'react';
import {TextInput} from "evergreen-ui";
import {motion} from "framer-motion";
import {AlertContext} from "../../components/Alert/AlertContext";
import {useNavigate} from "react-router-dom";
import validation from "../../helpers/validation";

const Registration = ({doReg, isUserAuth, error}) => {
  const [name, setName] = useState('');
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
      (async () => {
        await doReg(name, email, password);
        alert.show('User has been created', 'success')
      })()
    }
  }, [formErrors])

  useEffect(() => {
    Object.keys(error).length !== 0 && alert.show(error.message, 'danger')
  }, [error])


  const sendReg = () => {
    const validateResult = validation(email, password);
    const errors = !name ? {...validateResult, name: 'Name is required'} : validateResult;
    setFormErrors(errors)
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
          <h2>Registration form</h2>
          <TextInput
            value={name}
            name='text-input-name'
            placeholder='Please, enter your name'
            onChange={e => setName(e.target.value)}
          />
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
          <a className='form_submit' onClick={sendReg}><span>Sign up</span></a>
        </motion.form>
      }
    </>
  );
};

export default Registration;