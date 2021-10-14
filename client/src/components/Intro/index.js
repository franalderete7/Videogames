
import React from 'react';
import { Link } from 'react-router-dom';
import './intro.scss'


export default function Intro(){
    return(
    <div className="intro-container">
        <div className="intro-text">
            <h1>VIDEOGAMES APP</h1>
            <h3>by Francisco Alderete</h3>
        </div>
        <div>
            <Link className="intro-link" to="/home">
                <h4 className="intro-home-link">Go to home!</h4>
            </Link>
        </div>
    </div>
    )


}