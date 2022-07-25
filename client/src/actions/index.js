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

export function sortByWeight(payload) {
    return {
        type: 'SORT_BY_WEIGHT',
        payload
    }

}

export function sortByName(payload){
    return{
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