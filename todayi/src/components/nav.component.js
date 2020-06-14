import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/actions/authActions';
import useSearch from '../hooks/useSearch'
import {setEvents} from '../store/actions/eventActions'

const Nav = props => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [searchTxt, setSearchTxt] = useState('')
    const [pageNumber, setPagenumber] = useState(1)
    const logo = {
      color: '#2c3e50',textDecoration: 'none'
    };
    const activeStyle = {
      color: '#64696e', background: '#ecf0f1', textDecoration: 'none'
    };
    const onLogout = () => {
        console.log('logout')
      dispatch(logout());
      console.log('logout success')
    }
    console.log(searchTxt);
    const {isLoading, events, hasMore, isError} = useSearch(searchTxt, pageNumber);

    useEffect(() => {
      dispatch(setEvents(events, isLoading, hasMore))
    }, [events, dispatch, isLoading, hasMore])

    useEffect(() => {
      setPagenumber(state.event.pageNumber);
    }, [state.event.pageNumber])
  return (
    <>
    <header>
        <NavLink to='/' style={logo}>
        <span className="heading">test</span>
        </NavLink>
        <div>
        <div className="form-group">
            <input type="text" 
            name="type"
            className="form-control" 
            onChange={e => { setSearchTxt(e.target.value);}}></input>
        </div>
        </div>
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
