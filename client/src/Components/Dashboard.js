import React from 'react';

const Dashboard = () => {
    var token = localStorage.getItem('token');
    var usersname = localStorage.getItem('name');
    return (
        <div>
            {
                (token || !token === undefined)?<h1>Welcome To Dashboard {usersname}!</h1>:
                <h2>Please Login First!</h2>

            }
        </div>
    )
}

export default Dashboard
