import { useSelector, useDispatch } from 'react-redux'
import axiosConfig from "../axiosConfig";
import jwtDecode from 'jwt-decode';


export const getCandidateById = (token) => {
    const userId = jwtDecode(token).accountId
    return axiosConfig.get(`candidate/${userId}`, {
        headers: {token: token}
    })
    .then(response => {
       
        console.log(response)
    })
    .catch(error => console.log(error))
} 
