import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getDogDetail } from "../actions";


export default function DogDetail() {

    const { id } = useParams();
   

    const dispatch = useDispatch()
    const dog = useSelector((state) => state.detail)


    useEffect(() => {
        dispatch(getDogDetail(id))
    },)

    if (Array.isArray(dog.temperaments)) {
        var temp = dog.temperaments.map(e => e.name).join(', ')

    } else {
        var temp_api = dog.temperaments
    }

    return (

        <div>
            {

                <div>
                    <h1>Raza: {dog.name} </h1>
                    <img src={dog.image} alt="Imagen no disponible" />
                    <h3>Altura:  {dog.height} cm  </h3>
                    <h3>Peso: {dog.weight} Kgs </h3>
                    <h3>Esperanza de vida: {dog.life_span} años </h3>
                    <h3>Temperamentos: {temp ? temp : temp_api}</h3>
                </div>

            }
            <Link to='/home'><button>Volver al inicio</button></Link>
        </div>



    )
}