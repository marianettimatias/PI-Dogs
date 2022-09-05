import React from "react";
import './Paginado.css'

export default function Paginado({ dogsPerPage, allDogs, paginado, currentPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handleClick(e) {
        if (e.target.value === 'prev') {
            paginado(currentPage - 1)
        }
        if (e.target.value === 'next') {
            paginado(currentPage + 1)
        }
    }

    return (
        <nav className="nav-pag" >
            {
                currentPage === 1 ?
                    <button className="btn-pag" disabled>Prev</button> :
                    <button className="btn-pag" value='prev' onClick={(e) => handleClick(e)} >Prev</button>
            }
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
            {
                currentPage === Math.ceil(allDogs / dogsPerPage) ?
                    <button className="btn-pag" disabled>Next</button> :
                    <button className="btn-pag" value='next' onClick={(e) => handleClick(e)}>Next</button>
            }
        </nav>
    )
}