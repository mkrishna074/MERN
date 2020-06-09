import React, {useState} from 'react';
import axios from 'axios';
import {useAuth} from './auth'
import {Redirect} from 'react-router-dom'


const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const referer = props.location.state.from.pathname|| '/';
  const handleOnSubmit = (e) => {   
    e.preventDefault();
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post("http://localhost:5000/api/auth/login", {
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
      setErrorMsg(e.response.data.message);
    });
  };
  const clearForm = () => { 
    document.getElementById("create-login-form").reset();
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }
    return(<>
        <div className="component-container clear">
            <form id="create-login-form">
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" 
                    className="form-control" 
                    onChange={e => { setEmail(e.target.value);}}/>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" 
                    className="form-control" 
                    onChange={e => { setPassword(e.target.value);}}/>
                </div>
                <button type="submit" className="btn-border-radius" onClick={handleOnSubmit}>
                    Sign In
                </button>
            </form>
        </div>
      <div className="component-container">{ isError &&<p className="error-msg">{errorMsg}</p>}</div>
      </>
    );
}
export default React.memo(Login);