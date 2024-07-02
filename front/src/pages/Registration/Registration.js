import React, {useContext, useEffect, useState} from 'react';
import {TextInput, Textarea} from "evergreen-ui";
import {motion} from "framer-motion";
import {AlertContext} from "../../components/Alert/AlertContext";
import {useNavigate} from "react-router-dom";
import validation from "../../helpers/validation";

const Registration = ({doReg, isUserAuth, error}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [job, setJob] = useState('');
  const [mood, setMood] = useState('');
  const [interests, setInterests] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const alert = useContext(AlertContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(formErrors).length >= 1) {
      alert.show(formErrors[Object.keys(formErrors)[0]], 'danger')
    } else if (Object.keys(formErrors).length === 0 && isSubmit) {
      (async () => {
        await doReg(name, email, password, about, job, mood, interests);
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
            label="Your name"
            value={name}
            name='text-input-name'
            placeholder='Please, enter your name'
            onChange={e => setName(e.target.value)}
          />
          <TextInput
            label="Your email"
            value={email}
            name='text-input-email'
            placeholder='Please, enter your email'
            onChange={e => setEmail(e.target.value)}
          />
          <TextInput
            label="Your password"
            type='password'
            value={password}
            name='text-input-password'
            placeholder='Please, make up your password'
            onChange={e => setPassword(e.target.value)}
          />
          <hr />
          <Textarea
            label="Some info"
            type='text'
            value={about}
            name='text-input-about'
            placeholder='Please, enter some info about yourself'
            onChange={e => setAbout(e.target.value)}
          />
          <TextInput
            label="Current mood"
            type='text'
            value={mood}
            name='text-input-name'
            placeholder='Please, share what your mood is (optional)'
            onChange={e => setMood(e.target.value)}
          />
          <TextInput
            type='text'
            value={job}
            name='text-input-job'
            placeholder='Please, share your job position (optional)'
            onChange={e => setJob(e.target.value)}
          />
          <TextInput
            label="Your interests"
            type='text'
            value={interests}
            name='text-input-interests'
            placeholder='Please, share your interests (optional)'
            onChange={e => setInterests(e.target.value)}
          />
          <a className='form_submit' onClick={sendReg}><span>Sign up</span></a>
        </motion.form>
      }
    </>
  );
};

export default Registration;