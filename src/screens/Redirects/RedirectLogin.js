import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RedirectLogin() {
    let location = useLocation();

    return (
        <div>
            No match for <code>{location.pathname}</code>
        </div>
    );
}