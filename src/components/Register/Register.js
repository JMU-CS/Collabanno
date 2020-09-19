import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingPage from '../../containers/LandingPage';

export default function Register({ setUser }) {

    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    

    function setUserObject(e) {
        e.preventDefault();
        const user = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };
        setUser(user);
    }


    return (
        <form onSubmit={setUserObject} >
            <label htmlFor="register-username">Username:</label>
            <input 
                type="text" 
                name="register-username" 
                id="register-username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="first-name">First Name:</label>
            <input 
                type="text" 
                name="first-name" 
                id="first-name" 
                value={firstname}
                onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="last-name">Last Name:</label>
            <input 
                type="text" 
                name="last-name" 
                id="last-name" 
                value={lastname}
                onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email Address:</label>
            <input 
                type="email" 
                name="email" 
                id="email"
                value={email}
                onChange={e => setEmailAddress(e.target.value)}
            />
            <label htmlFor="register-password">Password:</label>
            <input 
                type="password" 
                name="register-password" 
                id="register-password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="register-password-repeat">Repeat password:</label>
            <input type="password" name="register-password-repeat" id="register-password-repeat" />
            
            <input type="submit" value="Register" />

        </form>
    )
}