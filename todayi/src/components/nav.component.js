import React from 'react';
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/actions/authActions';

const Nav = props => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const logo = {
        color: '#2c3e50',textDecoration: 'none'
      };
      const activeStyle = {
        color: '#64696e', background: '#ecf0f1', textDecoration: 'none'
      };
      console.log(state);
      const onLogout = () =>{
          console.log('logout')
        dispatch(logout());
        console.log('logout success')
      }
  return (
    <>
    <header>
        <NavLink to='/' style={logo}>
        <span className="heading">nikki my love</span>
        </NavLink>
        <div className="user-details">
        { state.auth.isAuthenticated &&<><span>Hi {state.auth.username}</span> <button type="submit" className="ti-btn" onClick={onLogout}>Log Out</button></>}
        </div>
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
