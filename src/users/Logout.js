/*import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export default function Logout() {
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
        axios.get('https://e-commerce-model.onrender.com/users/logout')
        .then(res => {
            setLogout(true);
            cookies.remove("TOKEN", {
                path: "/",
            });
            window.location.reload()
            navigate("/hompeage")
        })
        .catch(error => console.log(error));   
    }

    if (logout === false) {
        return (
            <>
                <h10>Logout</h10>
                <button onClick={(e) => handleLogout(e)}>Logout</button>
            </>
        )
    } else {
        return (
            <>
                <h2>You are now logged out</h2>
            </>
        )
    }
}

*/


import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export default function Logout() {
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
        axios.get('https://e-commerce-model.onrender.com/users/logout')
        .then(res => {
            setLogout(true);
            cookies.remove("TOKEN", {
                path: "/",
            });
            window.location.reload()
            navigate("/hompeage")
        })
        .catch(error => console.log(error));   
    }



    if (logout === false) {
        return (
            <>
                <h10>Logout</h10>
                <button onClick={(e) => handleLogout(e)}>Logout</button>
            </>
        )
    } else {
        return (
            <>
                <h2>You are now logged out</h2>
            </>
        )
    }
}
