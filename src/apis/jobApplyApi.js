import axiosConfig from "../configs/axiosConfig";

export const getAppliedJobByCandidateId = async (token, id, pageNo, pageSize) => {
  return await axiosConfig
    .get(
      `jobApply/getJobApplyByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const applyJob = async (token, data) => {
  console.log(data);
  return await axiosConfig
    .post(
      "jobApply/create",
      {
        candidateId: data.candidateId,
        cityName: data.cityName,
        educationLevel: data.educationLevel,
        foreignLanguage: data.foreignLanguage,
        titleCV: data.titleCV,
        linkCV: data.linkCV,
        experience: data.experience,
        recruitmentRequestId: data.recruitmentRequestId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => response.data)
    .catch((error) => error);
};

export const checkApplyByCandidateAndRequest = async (
  token,
  candidateId,
  requestId
) => {
  return await axiosConfig
    .get(
      `jobApply/checkApplyByCandidateAndRequest?candidateId=${candidateId}&requestId=${requestId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => response)
    .catch((error) => error);
};
