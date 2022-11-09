import axiosConfig from "../configs/axiosConfig";

export const getAppliedJobByCandidateId = async (token, id, pageNo, pageSize) => {
  return await axiosConfig
    .get(`jobApply/getJobApplyByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error);
};
