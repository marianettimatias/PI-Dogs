import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getDogs } from '../actions';
import DogCard from './DogCard'

export default function Home() {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs) //me traigo el estado de dogs
  

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
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
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div>
        <h2>Orden por peso</h2>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div>
        <h2>Razas: creadas/existentes</h2>
        <select>
          <option value="Todas">Todas</option>
          <option value="Creadas">Creadas</option>
          <option value="Existentes">Existentes</option>
        </select>
      </div>

      <div>
        {
          allDogs && allDogs.map((info) => {
           
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

    </div>
  )

}