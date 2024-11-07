import React, { useContext, useState } from 'react';
import { TextInput } from "evergreen-ui";
import { motion } from "framer-motion";
import { AlertContext } from "../../../components/Alert/AlertContext";
import { IconButton, TrashIcon } from "evergreen-ui";
import style from './CreateCatogory.module.scss';
import DialogWindow from '../../../components/Dialog/Dialog';


const CreateCategory = ({ createNewCategory, allCategories, deleteOne }) => {
  const alert = useContext(AlertContext)
  const [newCategory, setNewCategory] = useState({ name: "" })
  const [dialog, setDialog] = useState({ isShown: false, catId: 1, title: '' });

  const handleDelete = id => {
    deleteOne(id);
    alert.show('Category and all related article were deleted', 'danger');
    setDialog({ ...dialog, isShown: false })
  };

  const createCategory = async (e) => {
    e.preventDefault()
    if (newCategory.name.length < 1) {
      alert.show('Please, write your new category title', 'danger')
      return
    }
    await createNewCategory(newCategory)
    alert.show('New category has been successfully created', 'success')
    setNewCategory({ name: '' })
  }
  return (
    <motion.div
      initial={{ translateX: "-25%", opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: "50%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main>
        <form>
          <h2>New category</h2>
          <TextInput
            id='CategoryTitle'
            type='text'
            placeholder='Title'
            value={newCategory.name}
            onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <div>
            <a className='form_submit' onClick={createCategory}><span>Create catergory</span></a>
          </div>
        </form>
        <section className={style.categories}>
          <ul>
            {allCategories.map(category =>
              <li key={category.id}>
                {category.title}
                <IconButton icon={TrashIcon} intent='danger' onClick={() => setDialog({ isShown: true, catId: category.id, title: category.title })} />
              </li>)}
          </ul>
        </section>
      </main>
      <DialogWindow
        isShown={dialog.isShown}
        catId={dialog.catId}
        title={dialog.title}
        deleteAll={handleDelete}
      />
    </motion.div>
  )
}

export default CreateCategory;
