import axiosConfig from "../configs/axiosConfig";

export const getAppliedJobByCandidateId = async (token, id, pageNo, pageSize) => {
  return await axiosConfig.get(`jobApply/getJobApplyByCandidate?candidateId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`, 
    {headers: { Authorization: `Bearer ${token}` }})
    .then((response) => response.data)
    .catch((error) => error);
};

export const applyJob = async (token, data) => {
  console.log("sub", data);
  return await axiosConfig
    .post("jobApply/create", {
      candidateId: data.candidateId,
      cityName: [data.cityName],
      educationLevel: data.educationLevel,
      foreignLanguage: data.foreignLanguage,
      linkCV: data.linkCV,
      positionName: [data.positionName],
      recruitmentRequestId: data.recruitmentRequestId,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => error);
};
