import React, {useState } from 'react';
import ClassList from './ClassList';
import PDFSearchComponent from '../../PDFSearchComponent';


const classList = [
    "Biology 101",
    "CS 118",
    "Hello"
];

export default function LoggedInTeacherDashboard() {
    const [classes, addClass] = useState(classList);
    const [className, setClassName] = useState("");

    const addItem = (e) => {
        e.preventDefault();
        addClass(classes => [...classes, className]);
    }

    return (
        <div>
            <PDFSearchComponent />

            <ClassList classes={classes} />

            <form onSubmit={addItem}>
                <input 
                    type="text" 
                    name="class"
                    value={className}
                    onChange={e => setClassName(e.target.value)} 
                />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}

//passwordrajen!