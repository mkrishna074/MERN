import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {addEventType} from '../store/actions/eventActions'


const AddEventType = () => {
    const[type, setType] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(state => state, shallowEqual);
    const handleInput = (e) => {
        setType(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(addEventType({name: type, isActive: true}))
    };
    useEffect(() => {
        if(!state.event.isError){
            document.getElementById("create-type-form").reset();
        }
    }, [state.event.isError]);
return(<>
    <div className="component-container">
        <form id="create-type-form">
        <div className="row">
        <div className="form-group col-xs-3">
            <label>Type</label>
            <input type="text" 
            name="type"
            className="form-control" 
            onChange={handleInput}></input>
        </div>
        </div>
            <button type="submit" className="ti-btn" onClick={handleOnSubmit}>
                Add
            </button>
        </form>
     </div>
     <div className="component-container">{ state.event.isError &&<p className="error-msg">{state.event.responseMsg}</p>}</div>
    <div className="component-container">{ state.event.responseMsg !== null &&<p className="success-msg">{state.event.responseMsg}</p>}</div> </>
);
}
export default React.memo(AddEventType);