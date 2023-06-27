import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Logs out the user and reloads the page
export default function Logout() {
    const [logout, setLogout] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        axios.get('https://e-commerce-model.onrender.com/users/logout')
        .then(res => {
            // Removes Token
            cookies.remove("TOKEN", {
                path: "/",
            });
            setLogout(true);
            window.location.reload()
        })
        .catch(error => console.log(error));   
    }

    if (logout === false) {
        return (
            <>
                <button onClick={(e) => handleLogout(e)}>Logout</button>
            </>
        )
    }
}
