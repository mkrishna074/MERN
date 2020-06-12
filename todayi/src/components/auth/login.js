import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { login } from '../../store/actions/authActions';


const Login = (props) => {
  //inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //store
  const dispatch = useDispatch();
  const state = useSelector(state => state, shallowEqual);

  const referer = props.location.state.from.pathname|| '/';
  const handleOnSubmit = (e) => {   
    e.preventDefault();
    console.log(referer);
    dispatch(login({email, password, referer}));
  };

  useEffect(() => {
    if(!state.auth.isError){
        document.getElementById("create-login-form").reset();
    }
    console.log(state.auth.isAuthenticated);
}, [state.auth.isAuthenticated, state.auth.isError]);

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
        <div className="component-container">{ state.auth.isError &&<p className="error-msg">{state.auth.responseMsg}</p>}</div>
      </>
    );
}
export default React.memo(withRouter(Login));