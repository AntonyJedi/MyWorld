import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <h2><Link to='/'>Navbar</Link></h2>
      <ul>
        <li><Link to='/articles'>Articles</Link></li>
        <li><Link to='/newpost'>New article</Link></li>
      </ul>
      <hr/>
    </div>
  );
};

export default Navbar;