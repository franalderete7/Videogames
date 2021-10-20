import React from 'react'



export function GameCreated() {

    return (
        <div>
            <div className="wait"> 
            Juego creado, regresando al home en {setTimeout(() => {
            window.location.href = 'http://localhost:3000/home'
            }, 3000)} segundo... 
            </div>
            <p className="wait"> 
            Podra visalizar el juego ingresado y sus detalles en la base de datos desde el home 
            </p>
        </div>
            
        
    )
};

export default GameCreated;