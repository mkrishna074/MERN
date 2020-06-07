import React, {useState} from 'react';
import axios from 'axios';

const AddEvent = () => {
    const[event, setEvent] = useState({});

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
        console.log(event);
        let formData = getFormData(event);
        for (const key of Object.keys(event.media)) {
            formData.append('media', event.media[key]);
        }
        axios
        .post('http://localhost:5000/api/todayi/addEvent', formData, config)
        .then(res => {
            console.log(res);
            clearForm();
        })
        .catch(err => {
            console.log(err)
        });
    };
    const clearForm = () => { 
        document.getElementById("create-event-form").reset();
    }
    const getFormData = obj => Object.keys(obj).reduce((formData, key) => {
        formData.append(key, obj[key]);
        console.log(formData);
        return formData;
    }, new FormData());
    
return(<div className="component-container clear"><form id ="create-event-form" encType="multipart/form-data">
            <div className="form-group">
                <label >Category</label>
                <input type="text" 
                        name="category" 
                        className="form-control" 
                        onChange={(e) => setEvent({...event, category: e.target.value})}/>
            </div>
            <div className="form-group">
                <label >Title</label>
                <input type="text" 
                        name="title" 
                        className="form-control" 
                        onChange={(e) => setEvent({...event, title: e.target.value})}/>
            </div>
            <div className="form-group">
                <label>Highlights</label>
                <input type="text" 
                       name="highlights" 
                       className="form-control" 
                       onChange={(e) => setEvent({...event, highlights: e.target.value.split(',')})}/>
            </div>
            <div className="form-group">
                <label>Tags</label>
                <input type="text" 
                        name="tags" 
                        className="form-control" 
                        onChange={(e) => setEvent({...event, tags: e.target.value.split(',')})}/>
            </div>
            <div className="form-group">
                <label>Media</label>
                <input type="file" multiple 
                       className="form-control-file" 
                       name="media"  
                       onChange={(e) => setEvent({...event, media: Array.from(e.target.files)})}/>
            </div>
            <button type="submit" className="add-event-btn"  onClick={handleOnSubmit}>Add</button>
            </form> </div>);
}

export default React.memo(AddEvent);