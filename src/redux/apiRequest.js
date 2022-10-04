import axiosConfig from "../apis/axiosConfig";
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axiosConfig.post("/auth/login", user);
    console.log("checkkkkkkkkkkkkkkkk");
    dispatch(loginSuccess(response.data));
    navigate("/#/");
  } catch (err) {
    dispatch(loginFailed);
  }
};

export const regiserUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const response = await axiosConfig.post("/auth/register", user);
    console.log("checkkkkkkkkkkkkkkkk");
    dispatch(registerSuccess(response.data));
    navigate("/#/login");
  } catch (err) {
    dispatch(registerFailed);
  }
};
