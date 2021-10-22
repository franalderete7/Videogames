import React from 'react'



export function GameCreated() {

    return (
        <div>
            <div> 
            Game created, returning home in {setTimeout(() => {
            window.location.href = 'http://localhost:3000/home'
            }, 3000)} seconds...
            </div>
            <p> 
            You'll see the game created and its details in the database from home    
            </p>
        </div>
            
        
    )
};

export default GameCreated;