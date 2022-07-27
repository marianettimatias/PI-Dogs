import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        const info = await axios.get('http://localhost:3001/dogs');

        return dispatch({
            type: 'GET_DOGS',
            payload: info.data
        })
    }
}

export function getDogsByName(name) {
    return async function (dispatch) {
        const info_name = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        return dispatch({
            type: 'GET_DOGS_NAME',
            payload: info_name.data
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        const temps = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: temps.data
        })
    }
}

export function getDogDetail(id) {
    return async function (dispatch) {
        const info_id = await axios.get(`http://localhost:3001/dogs/${id}`)

        return dispatch({
            type: 'GET_DOG_DETAIL',
            payload: info_id.data
        })
    }
}

export function postDogs(payload) {
    return async function (dispatch) {
        const post_dog = await axios.post('http://localhost:3001/dogs', payload);
        return post_dog;
    }
}

export function sortByWeight(payload) {
    return {
        type: 'SORT_BY_WEIGHT',
        payload
    }

}


export function sortByName(payload) {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}


export function filterByCreated(payload) {
    return {
        type: 'FILTER_DB',
        payload
    }
}

export function filterByTemperaments(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    }
}