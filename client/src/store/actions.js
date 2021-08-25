import {
    SET_USERS,
    SET_SORTED
} from './actionTypes'
import axios from 'axios'

export const setUsers = (input) => {
    return {
        type: SET_USERS,
        payload: input
    }
}

export const setSorted = (input) => {
    let unsorted = [...input]
    let sorted = unsorted.sort((a, b) => a.name.first.localeCompare(b.name.first))

    return {
        type: SET_SORTED,
        payload: sorted
    }
}

export const fetchUsers = () => {
    return (dispatch, getState) => {
        (async () => {
            try {
                const {data} = await axios.get('https://randomuser.me/api/?results=20')
                dispatch(setUsers(data.results))
                dispatch(setSorted(data.results))
                
            } catch (err) {
                console.log(err);
            }
        }) ()
    }
}


