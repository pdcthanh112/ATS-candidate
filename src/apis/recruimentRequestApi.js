import axiosConfig from "../configs/axiosConfig";
import jwtDecode from 'jwt-decode';


export const getAllRecruimentRequest = async (pageNo, pageSize) => {  
    return await axiosConfig.get(`recruitmentRequest/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then(response => response.data)
    .catch(error => error)
} 

export const getRecruimentRequestDetail = async (id) => {  
    return await axiosConfig.get(`recruitmentRequest/getById/{id}?id=${id}`)
    .then(response => response)
    .catch(error => error)
} 

