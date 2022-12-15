import axiosConfig from "../configs/axiosConfig";

export const getAppliedJobByCandidateId = async (id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `jobApply/getJobApplyByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const applyJob = async (data) => {
  return await axiosConfig
    .post("jobApply/create", {
      candidateId: data.candidateId,
      cityName: data.cityName,
      educationLevel: data.educationLevel,
      foreignLanguage: data.foreignLanguage,
      titleCV: data.titleCV,
      linkCV: data.linkCV,
      cvId: data.cvId,
      experience: data.experience,
      recruitmentRequestId: data.recruitmentRequestId,
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export const checkApplyByCandidateAndRequest = async (
  candidateId,
  requestId
) => {
  return await axiosConfig
    .get(
      `jobApply/checkApplyByCandidateAndRequest?candidateId=${candidateId}&requestId=${requestId}`
    )
    .then((response) => response)
    .catch((error) => error);
};
