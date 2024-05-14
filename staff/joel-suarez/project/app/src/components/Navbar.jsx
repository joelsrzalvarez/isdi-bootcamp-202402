import React, { useState, useEffect } from 'react';
import logic from '../logic';
import { logger } from '../utils';

function Navbar({ onUserLoggedOut }) {
    const [user, setUser] = useState(null);

    let token = sessionStorage.getItem('token');

    const handleLogoutClick = () => {
        try {
            logic.logoutUser();
        } 
        catch (error) {
            logic.cleanUpLoggedInUserId();
        } 
        finally {
            onUserLoggedOut();
        }
    }

    useEffect(() => {
        if (token) {
            logic.retrieveUser(token)
                .then(usuario => {
                    setUser(usuario);
                })
                .catch(error => {
                    logger.error('Error al recuperar usuario:', error);
                });
        } else {
            logger.debug('No token available, user not loaded');
        }

        return (() => {
            setUser(null)
        })
    }, [token]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">⚔️</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <h2 className='title-aoh'>Arena of Honor</h2>
                        </li>
                    </ul>
                </div>
                <div className='user-token'>
                {user && (
                    <div className="dropdown show">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Welcome, {user.name} ! 
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Settings</a>
                        <a className="dropdown-item" href="#" onClick={handleLogoutClick}>Close session</a>
                    </div>
                    </div>
                    )}                
                    </div>
            </div>
        </nav>
    );
}

export default Navbar;
