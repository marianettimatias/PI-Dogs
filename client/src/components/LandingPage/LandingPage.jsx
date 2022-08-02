import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage() {
    return (
        <div className="landing">
            <h1>Dogs!</h1>
            <div className="btn_conteiner">
                <Link to='/home'>
                    <button className="btn_landing">Ingresar!</button>
                </Link>
            </div>
        </div>
    )
}