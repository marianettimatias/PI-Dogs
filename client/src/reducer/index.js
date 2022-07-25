
const initialState = {
    dogs: [],
    alldogs: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                alldogs: action.payload
            }
        case 'SORT_BY_WEIGHT':

            let filter_dogs2 = state.dogs.filter(e => !e.weight.includes('NaN'))
            let sortedDogs = action.payload === 'asc' ?
                filter_dogs2.sort(function (a, b) {
                    if (parseInt(a.weight_min) > (parseInt(b.weight_min))) {
                        return 1;
                    }
                    if (parseInt(a.weight_min) < (parseInt(b.weight_min))) {
                        return -1;
                    }
                    else
                        return 0;
                }) :
                filter_dogs2.sort(function (a, b) {
                    if (parseInt(a.weight_min) < (parseInt(b.weight_min))) {
                        return 1;
                    }
                    if (parseInt(a.weight_min) > (parseInt(b.weight_min))) {
                        return -1;
                    }
                    else
                        return 0;
                })

            return {
                ...state,
                dogs: sortedDogs

            }

        case 'SORT_BY_NAME':
            let sort_name = state.alldogs
            let sorted = action.payload === 'asc' ?
                sort_name.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    else
                        return 0;
                }) :
                sort_name.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    else
                        return 0;
                })
            return {
                ...state,
                dogs: sorted
            }

        case 'FILTER_DB':

            const filter_db = action.payload === 'createdInDb' ? state.alldogs.filter(e => e.createdInDb) : state.alldogs.filter(e => !e.createdInDb)

            if (!filter_db.length) {
                alert('No se crearon razas!')
            }
            return {
                ...state,
                dogs: action.payload === 'Todas' ? state.alldogs : filter_db
            }

        default: return state;
    }

}

export default rootReducer;