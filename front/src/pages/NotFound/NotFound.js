import React from 'react';
import style from './NonFound.module.scss'

const NotFound = () => {
  // const navigate = useNavigate()
  // setTimeout(() => navigate('/'), 3000)
  return (
    <div className={style.notFound}>
      404
    </div>
  );
};

export default NotFound;