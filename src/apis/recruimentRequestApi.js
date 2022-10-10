import axiosConfig from "./axiosConfig";
import jwtDecode from 'jwt-decode';


export const getAllRecruimentRequest = async () => {  
    return await axiosConfig.get('recruitmentRequest/getAll')
    .then(response => response.data)
    .catch(error => error)
} 