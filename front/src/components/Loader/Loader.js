import React from 'react';
import {RingLoader} from 'react-spinners'
import style from './Loader.module.scss'

const Loader = () => {
  return (
    <section className={style.loader_back}>
      <RingLoader
        size={100}
        color={'#00ccff'}
        speedMultiplier={1}
      />
    </section>
  );
};

export default Loader;