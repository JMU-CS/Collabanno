import React from 'react';
import Class from '../Class/Class';

export default function ClassList({ classes }) {
    return (
        <ul>
             {classes.map((schoolClass, key) => {
                return <Class schoolClass={schoolClass} key ={key}/>
            })}
           
        </ul>
    );
}