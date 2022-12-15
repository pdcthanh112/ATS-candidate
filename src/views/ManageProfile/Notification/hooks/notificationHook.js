import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { confirmInterview, rejectInterview} from "../../../../apis/notificationApi";

export const useHandleApproveInterview = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const queryClient = useQueryClient();
  return useMutation(
    "approveInterview",
    async (interviewId) => {
      await confirmInterview(currentUser.candidate.id, interviewId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listNoti");
      },
    }
  );
};

export const useHandleRejectInterview = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const queryClient = useQueryClient();
  return useMutation(
    "rejectInterview",
    async (interviewId) => {
      await rejectInterview(currentUser.candidate.id, interviewId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listNoti");
      },
    }
  );
};
