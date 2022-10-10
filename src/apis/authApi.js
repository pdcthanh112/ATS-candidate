import axiosConfig from "./axiosConfig";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axiosConfig.post("/auth/login", user);
    if (response) {
      dispatch(loginSuccess(response.data));
      navigate("/#/");
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const regiserUser = async (user, dispatch) => {
  return await axiosConfig
    .post("/auth/register", {
      email: user.email,
      name: user.fullname,
      password: user.password,
      address: user.address,
      phone: user.phone,
    })
    .then((response) => response.data.status)
    .catch((error) => error.response.data.status);
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    navigate("/#/dashboard");
  } catch (error) {
    dispatch(logoutFailed());
  }
};
