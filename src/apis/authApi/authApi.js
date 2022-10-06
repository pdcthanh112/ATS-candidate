import axiosConfig from "../axiosConfig";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axiosConfig.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
    navigate("/#/");
  } catch (err) {
    dispatch(loginFailed);
  }
};

export const regiserUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const response = await axiosConfig.post("/auth/register", {     
        email: user.email,
        name: user.fullname,
        password: user.password,
        address: user.address,
        phone: user.phone,    
    });
    console.log("checkkkkkkkkkkkkkkkk");
    dispatch(registerSuccess(response.data));
    navigate("/#/login");
  } catch (err) {
    dispatch(registerFailed);
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart())
  try {
    
  } catch (error) {
    
  }
}
