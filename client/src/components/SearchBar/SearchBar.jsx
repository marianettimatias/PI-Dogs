import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName} from '../../actions'; 
import './SearchBar.css'

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getDogsByName(name));
        setName('');
    }
    return (
        <div className="searchBar">
            <input type="text" placeholder='Nombre de la raza' value={name} onChange={handleInput} onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)} />
            <button type="submit" onClick={handleSubmit} > Buscar </button>
        </div>

    )

}