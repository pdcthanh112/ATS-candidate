import { useSelector, useDispatch } from 'react-redux'
import axiosConfig from "../axiosConfig";


export const getCandidateById = (token) => {
    return axiosConfig.get(`candidate/${token}`)
    .then(response => {
       
        console.log(response)
    })
    .catch(error => console.log(error))
} 
