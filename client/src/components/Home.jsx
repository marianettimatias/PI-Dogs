import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getDogs, sortByWeight, filterByCreated, sortByName } from '../actions';
import DogCard from './DogCard'
import Paginado from "./Paginado";

export default function Home() {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs) //me traigo el estado de dogs

  const [currentPage, setCurrentPage] = useState(1); //estado con paginba actual y estado que setea pagina actual
  const [dogsPerPage, setDogsPerPage] = useState(150); //seteo personajes por página
  const indexOfLastDog = currentPage * dogsPerPage
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const [orden, setOrden] = useState('');

  const paginado = (pageNumber) => { //para renderizar
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleByName(e){
    e.preventDefault();
    dispatch(sortByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleCreate(e){
     e.preventDefault();
    dispatch(filterByCreated(e.target.value))
    setCurrentPage(1);
  }

  return (

    <div>
      <h1>Dogs!</h1>
      <Link to='/dogs'>Crea tu raza!</Link>
      <button onClick={(e) => { handleClick(e) }}>
        Todas las razas
      </button>
      <div>
        <h2>Temperamento</h2>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div>
        <h2>Orden Alfabético</h2>
        <select onChange={handleByName}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div>
        <h2>Orden por peso</h2>
        <select onChange={(e) => { handleByWeight(e) }}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div>
        <h2>Razas: creadas/existentes</h2>
        <select onChange={(e)=>{ handleCreate (e)}}>
          <option value="Todas">Todas</option>
          <option value="createdInDb">Creadas</option>
          <option value="Existentes">Existentes</option>
        </select>
      </div>



      <div>
        {
          currentDogs && currentDogs.map((info) => {

            return (

              <DogCard
                key={info.id}
                name={info.name}
                image={info.image}
                temperaments={info.temperaments}
                weight={info.weight}
              />

            )

          })
        }
      </div>

      <div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length} // .length porque necesito un valor numerico
          paginado={paginado}
        />
      </div>

    </div>
  )

}