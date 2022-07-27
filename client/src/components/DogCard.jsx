import React from "react";
import { Link } from "react-router-dom";

export default function DogCard({ id, name, image, temperaments, weight }) {

  if (Array.isArray(temperaments)) {
    var temp = temperaments.map(e => e.name).join(', ')

  } else {
    var temp_api = temperaments
  }
  return (
    <div>
      <h2>Raza: {name}</h2>
      <img src={image} alt="Imagen no disponible" />
      <h3>Peso: {weight} kgs</h3>
      <h3>Temperamentos: {temp ? temp : temp_api}</h3>
      <Link to={'/dogs/'+id}><p>Detalles de la raza</p></Link>
    </div>
  )
}