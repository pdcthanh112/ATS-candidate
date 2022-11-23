import axiosConfig from "../configs/axiosConfig";

export const getAllNotification = async (token, id, pageNo, pageSize) => {
  return await axiosConfig.get(`notification/getByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`, 
    {headers: { Authorization: `Bearer ${token}` }})
    .then((response) => response.data)
    .catch((error) => error);
};