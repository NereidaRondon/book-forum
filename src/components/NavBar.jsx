import React from 'react';

function NavBar() {
  return (
    <nav className='navbar'>
      <h1>Book Club Forum</h1>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/create-post'>Create Post</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
