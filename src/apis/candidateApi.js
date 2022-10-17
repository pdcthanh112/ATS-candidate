import axiosConfig from "./axiosConfig";
import jwtDecode from 'jwt-decode';


export const getCandidateById = async (token) => {
    const userId = jwtDecode(token).accountId
    return await axiosConfig.get(`candidate/getCandidateById/{Id}?id=${userId}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => response.data)
    .catch(error => error)
} 

export const updateProfileCandidate = async () => {
    
}
