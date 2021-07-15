import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

function NavButton({ to, children }) {
    const { pathname } = useLocation();

    return (
        <Link to={to}>
            <Button customClass={pathname === to? 'nav-it active' : 'nav-it'}>{children}</Button>
        </Link>
    )
}

export default NavButton;