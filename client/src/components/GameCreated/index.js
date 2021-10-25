import React from 'react'
import './gamecreated.scss'


export function GameCreated() {

    return (
        <div>
            <div className="wait"> 
            Game created, returning home in {setTimeout(() => {
            window.location.href = 'http://localhost:3000/home'
            }, 3000)} seconds...
            </div>
        </div>
            
        
    )
};

export default GameCreated;

