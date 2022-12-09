import axiosConfig from "../configs/axiosConfig";
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
      dispatch(loginSuccess(response.data.data));
      navigate("/#/");
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const loginByGoogle = async (accessToken, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axiosConfig.post("auth/loginGoogle", accessToken);
    if (response) {
      dispatch(loginSuccess(response.data.data));
      navigate("/#/");
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const regiserUser = async (data) => {
  return await axiosConfig
    .post("/auth/register", {
      address: data.address,
      dob: data.dob,
      email: data.email,
      gender: data.gender,
      image: data.image,
      name: data.name,
      password: data.password,
      phone: data.phone,
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    navigate("/#/");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export const forgetPassword = async (email) => {
  return axiosConfig
    .get("auth/forgot-password", {
      params: {
        email: email,
      },
    })
    .then((response) => response)
    .catch((error) => error);
};
export const resetPassword = async (email, newPassword, resetToken) => {
  return axiosConfig
    .patch("auth/reset-password", {
      email: email,
      newPassword: newPassword,
      token: resetToken,
    })
    .then((response) => response)
    .catch((error) => error);
};
export const changePassword = async (email, newPassword, oldPassword) => {
  return axiosConfig
    .patch("auth/change-password", {
      email: email,
      newPassword: newPassword,
      oldPassword: oldPassword,
    })
    .then((response) => response)
    .catch((error) => error);
};
