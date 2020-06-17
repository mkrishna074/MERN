import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import '../app.scss'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../store/actions/authActions';
import useSearch from '../hooks/useSearch'
import {setEvents} from '../store/actions/eventActions'

export default function Header() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [searchTxt, setSearchTxt] = useState('')
    const [pageNumber, setPagenumber] = useState(1)
    const [menuToggle, setMenuToggle] = useState(false)
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
    const menuToggleClick = () =>{
      setMenuToggle(!menuToggle);
    }
    return (
        <header>
            <NavLink to='/' className="logo">testing
            </NavLink>
            <div className="input-border"><i className="fa fa-search"></i><input type="text" 
                name="type"
                className="search-input form-control" 
                onChange={e => { setSearchTxt(e.target.value);}}></input></div>
            <div className="dropdown">
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
                  <a onClick={onLogout} >Log Out</a>
                </div>}
              </div>}
            </div>
        </header>
    )
}
