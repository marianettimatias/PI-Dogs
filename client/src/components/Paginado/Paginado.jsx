import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(num => ( //mapeo cada uno de los numeros que tengo en pagNumber
                        <li key={num}>
                            <a onClick={() => paginado(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}