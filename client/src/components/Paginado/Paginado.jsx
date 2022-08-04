import React from "react";
import './Paginado.css'

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="nav-pag" >
            <ul className="ul" >
                {
                    pageNumbers && pageNumbers.map(num => ( //mapeo cada uno de los numeros que tengo en pagNumber
                        <button className="btn-pag" 
                            key={num}>
                            <p className="num" onClick={() => paginado(num)}>{num}</p>
                        </button>
                    ))
                }
            </ul>
        </nav>
    )
}