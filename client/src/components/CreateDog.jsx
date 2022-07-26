import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postDogs, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";


function validate(input) {
    let error = {}

    if (!/^([0-9])*$/.test(input.height_min)) {
        error.height_min = 'La altura debe ser un valor numerico mayor a 0';
    }
    if (!/^[0-9]*$/.test(input.height_max)) {
        error.height_max = 'La altura debe ser un valor numerico mayor a 0';
    }
    if (!/^[0-9]*$/.test(input.weight_min)) {
        error.weight_min = 'El peso debe ser un valor numerico mayor a 0 ';
    }

    if (!/^[0-9]*$/.test(input.weight_max)) {
        error.weight_max = 'El peso debe ser un valor numerico mayor a 0';
    }
    if ((!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image))) {
        error.image = 'Url no valida';
    }
    if (!/^[0-9]*$/.test(input.life_span_min)) {
        error.life_span_min = 'La edad debe ser un valor numerico mayor a 0';
    }
    if (!/^[0-9]*$/.test(input.life_span_max)) {
        error.life_span_max = 'La edad debe ser un valor numerico mayor a 0';
    }
    
    return error;
}




export default function PostDog() {

    const dispatch = useDispatch();
    const alltemperaments = useSelector((state) => state.temperaments)



    const [input, setInput] = useState({
        name: '',
        height: '',
        height_min: '',
        height_max: '',
        weight: '',
        weight_min: '',
        weight_max: '',
        image: '',
        life_span: '',
        life_span_min: '',
        life_span_max: '',
        temperaments: []
    })

    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        let objError = validate({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(objError);
    }

    const handleSelect = (e) => {
        if (input.temperaments.includes(e.target.value)) {
            alert('Temperamento ya seleccionado')
        } else {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
        }
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit', input)
        dispatch(postDogs(input))
        alert('Raza creada correctamente')
        setInput({
            name: '',
            height: '',
            height_min: '',
            height_max: '',
            weight: '',
            weight_min: '',
            weight_max: '',
            image: '',
            life_span: '',
            life_span_min: '',
            life_span_max: '',
            temperaments: []
        })
        // history.push('/home')
    }

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            temperaments: input.temperaments.filter(el => el !== e.target.value)
        })
    }

    return (
        <div>
            <h1>Crea una nueva Raza!</h1>
            <form onSubmit={(e) => { handleSubmit(e) }} >
                <div>
                    <label >Nombre: </label>
                    <input type="text"
                        placeholder="Nombre de la raza "
                        name='name'
                        value={input.name}
                        onChange={handleInput}
                    />
                    {input.name === '' ? <p>*</p> : ''}
                </div>
                <div>
                    <label >Altura mínima: </label>
                    <input type="text"
                        name='height_min'
                        placeholder="centímetros"
                        value={input.height_min}
                        onChange={handleInput}
                    />
                    {input.height_min === '' ? <p>*</p> : ''}
                    {error.height_min && <p>{error.height_min}</p>}
                </div>
                <div>
                    <label>Altura máxima: </label>
                    <input type="text"
                        name='height_max'
                        placeholder="centímetros"
                        value={input.height_max}
                        onChange={handleInput}
                    />
                    {input.height_max === '' ? <p>*</p> : ''}
                    {error.height_max && <p>{error.height_max}</p>}
                </div>
                <div>
                    <label >Peso mínimo: </label>
                    <input type="text"
                        placeholder="Kgs "
                        name='weight_min'
                        value={input.weight_min}
                        onChange={handleInput}
                    />
                    {input.weight_min === '' ? <p>*</p> : ''}
                    {error.weight_min && <p>{error.weight_min}</p>}
                </div>
                <div>
                    <label >Peso máximo: </label>
                    <input type="text"
                        placeholder="Kgs "
                        name='weight_max'
                        value={input.weight_max}
                        onChange={handleInput}
                    />
                    {input.weight_max === '' ? <p>*</p> : ''}
                    {error.weight_max && <p>{error.weight_max}</p>}
                </div>
                <div>
                    <label >Imagen: </label>
                    <input type="text"
                        placeholder="Url de la imagen "
                        name='image'
                        value={input.image}
                        onChange={handleInput}
                    />

                    {error.image && <p>{error.image}</p>}
                </div>
                <div>
                    <label >Años de vida (desde): </label>
                    <input type="text"
                        placeholder="Años "
                        name='life_span_min'
                        value={input.life_span_min}
                        onChange={handleInput}
                    />
                    {input.life_span_min === '' ? <p>*</p> : ''}
                    {error.life_span_min && <p>{error.life_span_min}</p>}
                </div>
                <div>
                    <label >Años de vida (hasta): </label>
                    <input type="text"
                        placeholder="Años"
                        name='life_span_max'
                        value={input.life_span_max}
                        onChange={handleInput}
                    />
                    {input.life_span_max === '' ? <p>*</p> : ''}
                    {error.life_span_max && <p>{error.life_span_max}</p>}
                </div>
                <div>
                    {input.temperaments === '' ? <p>*</p> : ''}
                    <span>Temperamentos: </span>
                    <select onChange={(e) => { handleSelect(e) }}  >

                        {
                            alltemperaments.map(temp => {
                                return <option key={temp.id} value={temp.name}> {temp.name} </option>

                            })
                        }
                    </select>
                    <ul>
                        <span>Temperamentos seleccionados: </span>
                        {
                            input.temperaments.map((e) => {
                                return <li value={e} key={e}> {e} <button value={e} onClick={handleDelete} >X</button>  </li>
                            })
                        }
                    </ul>
                    <p>* Campos obligatorios</p>
                    {
                        input.name===''||input.height_min===''||input.height_max===''||input.weight_min===''||input.weight_max===''||input.name===''||input.life_span_min===''||
                        input.life_span_max===''||input.temperaments.length===0?
                        <button type="submit" disabled={true} >Faltan datos por completar</button>:
                        <button type="submit">Crear Raza</button>
                    }
                    
                    

                </div>


            </form>

            <Link to='/home'><button>Volver al inicio</button></Link>
        </div>
    )

}
