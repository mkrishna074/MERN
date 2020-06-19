import React, {useState, useEffect, useRef} from 'react'
import {NavLink} from 'react-router-dom'
import '../app.scss'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/actions/authActions';
import useSearch from '../hooks/useSearch'
import {setEvents, setStateSearchTxt} from '../store/actions/eventActions'

export default function Header() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [searchTxt, setSearchTxt] = useState('');
    const [pageNumber, setPagenumber] = useState(1);
    const [menuToggle, setMenuToggle] = useState(false);
    const headerRef = useRef();
    const onLogout = () => {
        console.log('logout')
      dispatch(logout());
      console.log('logout success')
    }
    const {isLoading, events, hasMore} = useSearch(searchTxt, pageNumber);

    useEffect(() => {
      dispatch(setEvents(events, isLoading, hasMore))
    }, [events, dispatch, isLoading, hasMore])

    const handleClickOutside = e => {
      if (!headerRef.current.contains(e.target)) {
        setMenuToggle(false);
      }
    };

    useEffect(() => {
      if(menuToggle){
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [menuToggle]);

    useEffect(() => {
      setPagenumber(state.event.pageNumber);
    }, [state.event.pageNumber])

    useEffect(() => {
      dispatch(setStateSearchTxt(searchTxt))
    }, [searchTxt, dispatch])

    const menuToggleClick = () =>{
      setMenuToggle(!menuToggle);
    }
    return (
        <header>
            <NavLink to='/' className="logo">testing
            </NavLink>
            <div className="search-box"><i className="fa fa-search"></i><input type="text" 
                name="type"
                className="search-input form-control"
                value={state.event.searchTxt}
                onChange={e => {setSearchTxt(e.target.value);}}></input></div>
            <div ref={headerRef} className="dropdown">
              <button className="dropbtn ti-user" 
              onClick={menuToggleClick}>
              <i className="fas fa-user-circle"></i>
              </button>
              {menuToggle && <div className="dropdown-content">
                {!(state.auth.isAuthenticated) && 
                <div>
                  <NavLink to='/login'>Login
                  </NavLink>
                  <NavLink to='/register'>Register
                  </NavLink> 
                </div>}
                {state.auth.isAuthenticated && 
                <div>
                  <NavLink to='/addtype'>Event Type
                  </NavLink>
                  <NavLink to='/addevent'>Event
                  </NavLink>
                  <button onClick={onLogout} className="logout-btn" >Log Out</button>
                </div>}
              </div>}
            </div>
        </header>
    )
}
