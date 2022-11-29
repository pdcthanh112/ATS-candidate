import axiosConfig from "../configs/axiosConfig";
import { editFailed, editStart, editSuccess } from "../redux/authSlice";

export const getCandidateById = async (id, token) => {
  return await axiosConfig
    .get(`candidate/getCandidateById/{Id}?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export const updateProfileCandidate = async (id, token, data, dispatch) => {
  return await axiosConfig
    .put(
      `candidate/update/{id}?id=${id}`,
      {
        address: data.address,
        dob: data.dateOfBirth,
        gender: data.gender,
        image: data.image,
        name: data.fullname,
        phone: data.phone,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => dispatch(editFailed()));
};

export const getCVByCandidateId = async (token, id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `cv/getAllCvByCandidate?id=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const uploadCV = async (token, candidateId, linkCV, title) => {
  console.log(candidateId, linkCV, title);
  return await axiosConfig
    .post(
      "cv/create",
      {
        candidateId: candidateId,
        linkCV: linkCV,
        positionName: [],
        title: title,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const deleteCV = async (token, id) => {
  return await axiosConfig
    .delete(`cv/delete/{id}?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => error);
};
