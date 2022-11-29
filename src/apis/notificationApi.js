import axiosConfig from "../configs/axiosConfig";

export const getInterviewNotification = async (token, id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `interview/getInterviewByCandidateID?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const getCommonNotification = async (token, id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `notification/getByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const confirmInterview = async (token, candidateId, interviewId) => {
  console.log('asdfas');
  return await axiosConfig
    .patch(
      `interview/confirmByCandidate?idCandidate=${candidateId}&idInterview=${interviewId}`, {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const rejectInterview = async (token, candidateId, interviewId) => {
  return await axiosConfig
    .patch(
      `interview/rejectByCandidate?idCandidate=${candidateId}&idInterview=${interviewId}`, {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error.response.data);
};