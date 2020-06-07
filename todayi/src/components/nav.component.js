import React from 'react';
import {NavLink} from 'react-router-dom'

const Nav = props => {
    const logo = {
        color: '#2c3e50',textDecoration: 'none'
      };
      const activeStyle = {
        color: '#64696e', background: '#ecf0f1', textDecoration: 'none'
      };
  return (
    <>
    <header>
        <NavLink to='/' style={logo}>
        <span className="heading">nikki my love</span>
        </NavLink>
    </header>
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
        </ul>
    </nav>
    </>
  );
}

export default Nav;
