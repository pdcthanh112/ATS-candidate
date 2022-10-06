import React, { useState } from 'react'
import './Register.scss'
import headerLogo from '../../../assets/image/big-logo.png'
import loginpageImage from '../../../assets/image/loginpage-image.png'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { regiserUser } from '../../../apis/authApi/authApi'

import { useFormik } from 'formik'
import * as Yup from 'yup'

const Register = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHideShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirm: "",
      address: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Please input your name'),
      email: Yup.string().required('Please input email').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'This email is invalid'),
      password: Yup.string().required('Please input password').min(8, "Password must be at least 8 character"),
      confirm: Yup.string().required('Please input confirm password').oneOf([Yup.ref("password"), null], 'Not match'),
      address: Yup.string().required('Please input address'),
      phone: Yup.string().required('Please input your phone number').matches(/^[0-9\-\+]{10}$/, 'This phone number is invalid')
    }),
    onSubmit: (values) => {
      regiserUser(values, dispatch, navigate) 
    }
  })

  return (
    <div className='register-container grid grid-cols-2'>
      <div className='register-left'>
        <div className='left-container'>
          <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={200} height={70} className='registerpage-image' /></a>
          <div className='my-2 font-sans font-semibold leading-6 text-slate-900 text-lg'>Chào mừng bạn đến với hệ thống tuyển dụng CK HR Consulting của chúng tôi</div>
          <span className='my-2 font-sans font-light text-slate-400'>Hãy tạo tài khoản để sử dụng những dịch vụ mà chúng tôi mang lại</span>
          <div className='register-form form-group'>
            <form onSubmit={formik.handleSubmit}>
              <div className='my-3'>
                <label className='text-lg'>Fullname</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-user mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='form-control' name='fullname' placeholder='Nhập tên của bạn' value={formik.values.fullname} onChange={formik.handleChange} /><br />
                </div>
                {formik.errors.fullname && formik.touched.fullname && (
                  <div>{formik.errors.fullname}</div>
                )}
              </div>
              <div className='my-3'>
                <label className='text-lg'>Email</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='form-control' name='email' placeholder='Nhập email của bạn' value={formik.values.email} onChange={formik.handleChange} /><br />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <div>{formik.errors.email}</div>
                )}
              </div>
              <div className='my-3'>
                <label className='text-lg'>Password</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={isShowPassword ? 'text' : 'password'} className='form-control' name='password' placeholder='Nhập mật khẩu' value={formik.values.password} onChange={formik.handleChange} />
                  <span onClick={() => { handleHideShowPassword() }}>
                    <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                  </span>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <div>{formik.errors.password}</div>
                )}
              </div>
              <div className='my-3'>
                <label className='text-lg'>Confirm</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={isShowPassword ? 'text' : 'password'} className='form-control' name='confirm' placeholder='Nhập lại mật khẩu' value={formik.values.confirm} onChange={formik.handleChange} />
                  <span onClick={() => { handleHideShowPassword() }}>
                    <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                  </span>
                </div>
                {formik.errors.confirm && formik.touched.confirm && (
                  <div>{formik.errors.confirm}</div>
                )}
              </div>
              <div className='my-3'>
                <label className='text-lg'>Address</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-address-book mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='form-control' name='address' placeholder='Nhập địa chỉ của bạn' value={formik.values.address} onChange={formik.handleChange} /><br />
                </div>
                {formik.errors.address && formik.touched.address && (
                  <div>{formik.errors.address}</div>
                )}
              </div>
              <div className='my-3'>
                <label className='text-lg'>Phone</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-mobile-screen-button mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='form-control' name='phone' placeholder='Nhập số điện thoại của bạn' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} /><br />
                </div>
                {formik.errors.phone && formik.touched.phone && (
                  <div>{formik.errors.phone}</div>
                )}
              </div>
              <button type='submit' className='btn-register'>Tạo tài khoản</button>
            </form>
            <div className='my-4'>
              <span>Bạn đã có tài khoản? </span><a href='#/login' style={{ color: "#116835" }}>Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
      <div className='register-right'>
        <img src={loginpageImage} alt='Logo' width={500} height={200} className='registerpage-image' />
      </div>
    </div>
  )
}

export default Register
