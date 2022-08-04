import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getDogDetail } from "../../actions";
import './DogDetail.css'


export default function DogDetail() {

    const { id } = useParams();


    const dispatch = useDispatch()
    const dog = useSelector((state) => state.detail)


    useEffect(() => {
        dispatch(getDogDetail(id))
    }, [dispatch, id])

    if (Array.isArray(dog.temperaments)) {
        var temp = dog.temperaments.map(e => e.name).join(', ')

    } else {
        var temp_api = dog.temperaments
    }

    return (

        <div>
            <div className="cont">
                {
                    <div className="container">
                        <h1 className="raza">Raza: {dog.name} </h1>
                        <img className="image" src={dog.image} alt="Imagen no disponible" />
                        <h3 className="h3-detail">Altura:  {dog.height} cm  </h3>
                        <h3 className="h3-detail">Peso: {dog.weight} Kgs </h3>
                        <h3 className="h3-detail">Esperanza de vida: {dog.life_span} años </h3>
                        <h3 className="h3-detail">Temperamentos: {temp ? temp : temp_api}</h3>
                    </div>

                }
                <div className="volver-detail">
                    <Link to='/home'><button  >Volver al inicio</button></Link>
                </div>
            </div>
        </div>



    )
}