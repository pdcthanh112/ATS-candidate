import axiosConfig from "../configs/axiosConfig";

export const getInterviewNotification = async (id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `interview/getInterviewByCandidateID?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const getCommonNotification = async ( id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `notification/getByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const confirmInterview = async (candidateId, interviewId) => {
  return await axiosConfig
    .patch(`interview/confirmByCandidate?idCandidate=${candidateId}&idInterview=${interviewId}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const rejectInterview = async (candidateId, interviewId) => {
  return await axiosConfig
    .patch(`interview/rejectByCandidate?idCandidate=${candidateId}&idInterview=${interviewId}`)
    .then((response) => response.data)
    .catch((error) => error.response.data);
};