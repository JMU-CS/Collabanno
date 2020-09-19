import React, { useState } from 'react';

import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Register from '../Register/Register';

export default function UserBar ({ user, setUser }) {

    if (user) {
        return <Logout user={user} setUser={setUser} />
    } else {
        return (
            <React.Fragment>
                <Login setUser={setUser}/>
                <Register setUser={setUser}/>
            </React.Fragment>
        )
    }
}