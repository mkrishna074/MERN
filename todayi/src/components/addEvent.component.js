import React, {useEffect, useState} from 'react';

const AddEvent = () => {
return(<div className="component-container clear"><form>
            <div className="form-group">
                <label >Category</label>
                <input type="text" name="category" className="form-control"/>
            </div>
            <div className="form-group">
                <label >Title</label>
                <input type="text" name="title" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Highlights</label>
                <input type="text" name="highlights" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Tags</label>
                <input type="text" name="tags" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Media</label>
                <input type="file" multiple className="form-control-file" name="media"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form> </div>);
}

export default React.memo(AddEvent);