import React, { useState } from 'react';
import { Link } from 'react-router-dom'


export default function Login({ setUser }) {
    const [username, setUsername] = useState('');

    function handleUsername(evt) {
        setUsername(evt.target.value);
    }

    return (
        <form onSubmit={e => { e.preventDefault(); setUser(username) }} >
            <label htmlFor="login-username">Username:</label>
            <input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername} />
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="login-password" />
            <input type="submit" value="Login" disabled={username.length === 0} />
        </form>
    )
}