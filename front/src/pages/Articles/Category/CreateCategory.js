import React, {useContext, useState} from 'react';
import {TextInput} from "evergreen-ui";
import ImageUploader from "../../../components/FileUploader/FileUploader";
import {motion} from "framer-motion";
import {AlertContext} from "../../../components/Alert/AlertContext";
import {useNavigate} from "react-router-dom";

function CreateCategory({createNewCategory}) {
  const alert = useContext(AlertContext)
  const navigate = useNavigate()
  const [newCategory, setNewCategory] = useState({})

  const createCategory = async (e) => {
    e.preventDefault()
    try {
      console.log(newCategory)
      await createNewCategory(newCategory)
      alert.show("New category has been successfully created", "success")
      setTimeout(() => navigate("/articles"), 200)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <motion.form
      initial={{translateX: "-25%", opacity: 0}}
      animate={{translateX: 0, opacity: 1}}
      exit={{translateX: "50%", opacity: 0}}
      transition={{duration: 0.5}}
    >
      <h2>New category</h2>
      <TextInput
        id='CategoryTitle'
        type='text'
        placeholder='Title'
        onChange={e => setNewCategory({...newCategory, name: e.target.value})}
      />
      <div>
        <a className='form_submit' onClick={createCategory}><span>Create catergory</span></a>
      </div>
    </motion.form>
  )
}

export default CreateCategory;
