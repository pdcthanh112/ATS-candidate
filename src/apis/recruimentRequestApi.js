import axiosConfig from "../configs/axiosConfig";
import { setCategoryData } from "../redux/categoryDataSlice";

export const getAllRecruimentRequest = async (pageNo, pageSize) => {
  return await axiosConfig
    .get(`recruitmentRequest/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getAllOpenRecruimentRequest = async (pageNo, pageSize) => {
  return await axiosConfig
    .get(`recruitmentRequest/getOpenRecruitmentRequest?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getRecruimentRequestById = async (id) => {
  return await axiosConfig   
    .get(`recruitmentRequest/getById?id=${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const searchRecruimentRequest = async (searchObject) => {
  return await axiosConfig
    .put("recruitmentRequest/searchRecruitmentRequest", {
      city: searchObject.city,
      experience: searchObject.experience,
      industry: searchObject.industry,
      jobLevel: searchObject.jobLevel,
      jobName: searchObject.jobName,
      salaryFrom: searchObject.salaryFrom,
      salaryTo: searchObject.salaryTo,
      typeOfWork: searchObject.typeOfWork,
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export const getCategory = async (dispatch) => {
  const response = await axiosConfig.get("recruitmentRequest/getCategory");
  if (response) {
    dispatch(setCategoryData(response.data.data));
  }
};

export const getNewestRecruitmentRequest = async () => {
  return await axiosConfig
    .get("recruitmentRequest/getNewestRecruitmentRequest")
    .then((response) => response.data)
    .catch((error) => error);
};

