import React from "react";
import { Link } from "react-router-dom";
import './DogCard.css'

export default function DogCard({ id, name, image, temperaments, weight }) {

  if (Array.isArray(temperaments)) {
    var temp = temperaments.map(e => e.name).join(', ')

  } else {
    var temp_api = temperaments
  }
  return (
    <div >
      <div className="card">
        <h3 className="titulo-card">Raza: {name}</h3>
        <div>
          <img className="img" src={image} alt="Imagen no disponible" />
        </div>
        <div >
          <h4 className="h4-peso">Peso: {weight} kgs</h4>
        </div>
        <div className="temperamento">
          <h4 className="h4">Temperamentos: {temp ? temp : temp_api}</h4>
        </div>
        <div className="link-detalle">
          <Link to={'/dogs/' + id}> 
          <button className="btn">Detalles de la raza</button>
           </Link>
        </div>


      </div>
    </div>
  )
}