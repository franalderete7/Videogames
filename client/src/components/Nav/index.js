
import React from 'react';
import './nav.scss';

export default function Nav(){
    return (
        <>
        <header className="header">
            <div className="container logo-nav-container">
                <a href="/" className="logo">VIDEOGAMES</a>
                <nav className="navigation">
                <ul clasName="show">
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a className="createYourGame" href="/createyourgame">Create your game</a>
                    </li>    
                </ul> 

                </nav>
                
            </div>
        </header>
        </>
    )
}