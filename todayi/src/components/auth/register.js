import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from './auth'
import {Link, Redirect} from 'react-router-dom'


const Register = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location.state || '/';
    console.log(props.location.state);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setIsError(true);
        }
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
        axios.post("http://localhost:5000/api/auth/register", {
            userName,
            password
            }, config).then(result => {
            if (result.status === 200) {
                console.log(result.data);
                setAuthTokens(result.data);
                setLoggedIn(true);
                clearForm();
            } else {
                setIsError(true);
            }
            }).catch(e => {
            setIsError(true);
    });
    };
    const clearForm = () => { 
        document.getElementById("create-register-form").reset();
    }
    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }
return(
    <div className="component-container clear">
        <form id="create-register-form">
        <div className="form-group">
            <label >Email</label>
            <input type="email" 
                    placeholder="Email" 
                    className="form-control" 
                    onChange={e => { setUserName(e.target.value);}}/>
        </div>
        <div className="form-group">
                <label >Password</label>
            <input type="password" 
                    placeholder="Password"
                    className="form-control" 
                    onChange={e => { setPassword(e.target.value);}}/>
        </div>
        <div className="form-group">
                <label >Confirm Password</label>
            <input type="password" 
                    className="form-control" 
                    placeholder="Confirm Password" 
                    onChange={e => { setConfirmPassword(e.target.value);}}/>
        </div>
            <button type="submit" className="btn-border-radius" onClick={handleOnSubmit}>
                Sign Up
            </button>
        </form>
      <Link to={{
              pathname: '/login',
              state: { from: props.location }
          }}>Already have an account?</Link>
      { isError &&<error>Passwords don't match!</error> }
    </div>
);
}
export default React.memo(Register);