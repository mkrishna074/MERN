import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { register } from '../../store/actions/authActions';


const Register = (props) => {
    const [name, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const state = useSelector(state => state, shallowEqual);

    const handleOnSubmit = (e) => {
        try{
            e.preventDefault();
            dispatch(register({name, email, password, confirmPassword}));
            document.getElementById("create-register-form").reset();
        } catch (e){
            console.log(state);
        }
        
    };
    if (state.auth.isAuthenticated) {
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
                    onChange={e => { setPassword(e.target.value);}} 
                    autoComplete="off"/>
        </div>
        <div className="form-group">
                <label >Confirm Password</label>
            <input type="password" 
                    className="form-control" 
                    onChange={e => { setConfirmPassword(e.target.value);}}
                    autoComplete="off"/>
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
      <div className="component-container">{ state.auth.isError &&<p className="error-msg">{state.auth.responseMsg}</p>}</div>
</>
);
}
export default React.memo(Register);