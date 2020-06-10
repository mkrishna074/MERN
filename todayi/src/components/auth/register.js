import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from './auth'
import {Link, Redirect} from 'react-router-dom'


const Register = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setAuthTokens } = useAuth();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setIsError(true);
            setErrorMsg('Passwords dont match!');
            return false;
        }
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
        axios.post("http://localhost:5000/api/auth/register", {
            name,
            email,
            password
            }, config).then(result => {
            if (result.status === 200) {
                console.log(result.data);
                setAuthTokens(result.data);
                setLoggedIn(true);
                clearForm();
            } else {
                setIsError(true);
                setErrorMsg(result.data.message);
            }
            }).catch(e => {
            setIsError(true);
            setErrorMsg(e);
    });
    };
    const clearForm = () => { 
        document.getElementById("create-register-form").reset();
    }
    if (isLoggedIn) {
        return <Redirect to={'/'} />;
    }
return(<>
    <div className="component-container clear">
        <form id="create-register-form">
        <div className="form-group">
            <label >Name</label>
            <input type="text" 
                    className="form-control" 
                    onChange={e => { setUserName(e.target.value);}}/>
        </div>
        <div className="form-group">
            <label >Email</label>
            <input type="email" 
                    className="form-control" 
                    onChange={e => { setUserEmail(e.target.value);}}/>
        </div>
        <div className="form-group">
                <label >Password</label> <span className="tag"> Password must contain one uppercase letter, one lowercase letter, one numeric and one symbol. </span>
            <input type="password" 
                    className="form-control" 
                    onChange={e => { setPassword(e.target.value);}}/>
        </div>
        <div className="form-group">
                <label >Confirm Password</label>
            <input type="password" 
                    className="form-control" 
                    onChange={e => { setConfirmPassword(e.target.value);}}/>
        </div>
            <button type="submit" className="btn-border-radius" onClick={handleOnSubmit}>
                Sign Up
            </button>
        </form>
    </div>
    <div className="component-container">
      <Link to={{
              pathname: '/login',
              state: { from: props.location }
          }}>Already have an account?</Link>
      </div>
      <div className="component-container">{ isError &&<p className="error-msg">{errorMsg}</p>}</div>
</>
);
}
export default React.memo(Register);