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
        <header>
        <NavLink to='/' className="logo">
        <span className="heading">testing</span>
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
        { state.auth.isAuthenticated &&<><button type="submit" className="ti-btn" onClick={onLogout}>Log Out</button></>}
        </div>
    </header>
    )
}
