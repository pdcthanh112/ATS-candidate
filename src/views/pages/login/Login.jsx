import React, { useEffect, useState } from 'react'
import headerLogo from '../../../assets/image/big-logo.png'
import loginpageImage from '../../../assets/image/loginpage-image.png'
import './Login.scss'

import { auth } from '../../../configs/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginByGoogle, loginUser } from '../../../apis/authApi'
import { initializeApp } from "firebase/app";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { firebaseNotificationConfig } from '../../../configs/firebaseConfig'
import { getMessaging, getToken } from "firebase/messaging";
import { GoogleButton } from 'react-google-button'
import ReactLoading from 'react-loading'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const Login = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loginError = useSelector((state) => state.auth.login.error);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const requestPermission = () => {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // const notification = new Notification('Example notification', {
          //   body: 'this is body',
          //   data: {hello: 'world'},
          //   icon: headerLogo
          // })
          const app = initializeApp(firebaseNotificationConfig);
          const messaging = getMessaging(app);
          getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_KEY_COMPARE,
          }).then((currentToken) => {
            if (currentToken) {
              formik.values.notificationToken = currentToken;
            }
          });
        }
      });
    }
    requestPermission()
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      notificationToken: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Please input email'),
      password: Yup.string().required('Please input password'),
    }),
    onSubmit: (values) => {
      setIsLoading(true)
      loginUser(values, dispatch, navigate).then(() => setIsLoading(false))
    }
  })

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(response => {
      loginByGoogle(response.user.accessToken, dispatch, navigate)
    })
  }

  return (
    <div className='login-container grid grid-cols-2'>
      <div className='login-left'>
        <img src={loginpageImage} alt='Logo' width={500} height={200} className='loginpage-image' />
      </div>
      <div className='login-right'>
        <div className='right-container'>
          <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={200} height={70} /></a>
          <div className='my-2 font-sans font-semibold leading-6 text-slate-900 text-lg'>Ch??o m???ng b???n ?????n v???i h??? th???ng tuy???n d???ng CK HR Consulting c???a ch??ng t??i</div>
          <span className='my-2 font-sans font-light text-slate-400'>H??y ????ng nh???p ????? c?? th??? s??? d???ng nh???ng d???ch v??? c???a ch??ng t??i</span>
          <div className='login-form form-group'>
            <form onSubmit={formik.handleSubmit}>
              <div className='my-4'>
                <label className='text-lg'>Email</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='input-tag focus:outline-none' name='email' placeholder='Nh???p email c???a b???n' value={formik.values.email} onChange={formik.handleChange} /><br />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <div className='text-[#ec5555]'>{formik.errors.email}</div>
                )}
              </div>
              <div className='form-group my-4'>
                <label className='text-lg'>Password</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={isShowPassword ? 'text' : 'password'} className='input-tag focus:outline-none' name='password' placeholder='Nh???p m???t kh???u' value={formik.values.password} onChange={formik.handleChange} />
                  <span className='mx-3 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                    <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                  </span>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <div className='text-[#ec5555]'>{formik.errors.password}</div>
                )}
              </div>
              <GoogleButton onClick={() => handleGoogleSignIn()} />
              {loginError && <div className='input-error p-2 rounded'>Email ho???c m???t kh???u kh??ng ch??nh x??c</div>}
              <div className='my-4'>
                <a href="/#/forget-password" style={{ marginLeft: '20rem' }}>Qu??n m???t kh???u</a>
              </div>
              <div className='flex'>
                <button type='submit' className='btn-login'>????ng nh???p</button>
                {isLoading && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
              </div>
            </form>
            <div className='my-4'>
              <span>B???n ch??a c?? t??i kho???n? </span><a href='#/register' style={{ color: "#116835" }}>????ng k?? ngay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
