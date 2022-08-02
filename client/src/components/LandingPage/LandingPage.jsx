import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="dogs">Dogs!</h1>
            <div className="btn-landing">
                <Link to='/home'>
                    <button className="btn_landing">Ingresar!</button>
                </Link>
            </div>
        </div>
    )
}