import React, { useState } from 'react';
import styled from 'styled-components';
import LoggedInTeacherDashboard from './LoggedInTeacherDashboard';
import UserBar from '../components/UserBar/UserBar';

const LandingPageWrapper = styled.div`
    color: #000;
`;

export default function LandingPage() {
    const [user, setUser] = useState('');

    return (
        <LandingPageWrapper>
            <h1>Collabanno</h1>
            <UserBar user={user} setUser={setUser} />
            <p>is an app that will enhance the experience of reading a document as a group.
            It will allow the user to annotate a PDF and have those changes reflected
            in another window viewing the same PDF on another computer, in real time.
            This could be useful in a classroom setting when the instructor wants to
            highlight/underline a portion of the text on the screen while he or she is
            away from the computer. The real value in this application will be in the
                ability to markup a document across more than one device. </p>
            {user && ( <LoggedInTeacherDashboard user={user} /> )}
            <p>Github: <a href="https://github.com/JMU-CS/Collabanno" target="_blank">CollabAnno</a></p>

        </LandingPageWrapper>
    );
}