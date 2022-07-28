import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getDogs, sortByWeight, filterByCreated, sortByName, getTemperaments, filterByTemperaments } from '../../actions';
import DogCard from '../DogCard/DogCard'
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import './Home.css'

export default function Home() {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs) //me traigo el estado de dogs
  const temps = useSelector((state) => state.temperaments)



  const [currentPage, setCurrentPage] = useState(1); //estado con paginba actual y estado que setea pagina actual
  const [dogsPerPage, setDogsPerPage] = useState(8); //seteo personajes por página
  const indexOfLastDog = currentPage * dogsPerPage
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const [orden, setOrden] = useState('');

  const paginado = (pageNumber) => { //para renderizar
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
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

  function handleByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleCreate(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value))
    setCurrentPage(1);
  }

  function handleTemperaments(e) {
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value))
    setCurrentPage(1);
  }

  return (

    <div >
      <div className="head">
        <div className="titulo">
          <h1 className="h1">Dogs!</h1>
        </div>
        <div className="searchBar">
          <SearchBar />
        </div>
        <button onClick={(e) => { handleClick(e) }}>
          Todas las razas
        </button>
        <Link to='/dogs'> <h3> Crea tu raza!</h3></Link>

      </div>

      <nav className="container_nav">
        <div>
          <h3>Filtrar por temperamento</h3>
          <select onChange={handleTemperaments}>
            <option value="All">Todos</option>
            {
              temps.map(temp => {
                return <option key={temp.id} value={temp.name}> {temp.name} </option>
              })
            }
          </select>
        </div>
        <div>
          <h3>Ordenar Alfabéticamente</h3>
          <select onChange={handleByName}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        <div>
          <h3>Ordenar por peso</h3>
          <select onChange={(e) => { handleByWeight(e) }}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div>
          <h3>Razas: creadas/existentes</h3>
          <select onChange={(e) => { handleCreate(e) }}>
            <option value="Todas">Todas</option>
            <option value="createdInDb">Creadas</option>
            <option value="Existentes">Existentes</option>
          </select>
        </div>




      </nav>

      <div className="cards">
        {
          currentDogs && currentDogs.map((info) => {

            return (

              <DogCard
                id={info.id}
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

    </div >
  )

}