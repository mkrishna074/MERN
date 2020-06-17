import React from 'react';
import {NavLink} from 'react-router-dom'

const Nav = props => {
    const activeStyle = {
      color: '#f3704c', background: '#ecf0f1', textDecoration: 'none', 
      borderRadius: '0.3rem'
    };
  return (
    <>
    <nav>
        <ul>
        <NavLink exact to='/' activeStyle={activeStyle}>
            Home
        </NavLink>
        <NavLink to='/works' activeStyle={activeStyle}>
            Works
        </NavLink>
        <NavLink to='/partners' activeStyle={activeStyle}>
            Partners
        </NavLink>
        <NavLink to='/price' activeStyle={activeStyle}>
            Price
        </NavLink>
        <NavLink to='/contacts' activeStyle={activeStyle}>
            Contacts
        </NavLink>
        <NavLink to='/contacts' activeStyle={activeStyle}>
            Contacts
        </NavLink>
        </ul>
    </nav>
    </>
  );
}

export default Nav;
