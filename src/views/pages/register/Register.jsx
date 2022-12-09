import React, { useState } from 'react'
import './Register.scss'
import headerLogo from '../../../assets/image/big-logo.png'
import loginpageImage from '../../../assets/image/loginpage-image.png'
import { regiserUser } from '../../../apis/authApi'
import { TextField } from '@mui/material'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { responseStatus } from '../../../utils/constants'
import ReactLoading from 'react-loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [registerStatus, setRegisterStatus] = useState('START')
  const [isRegistring, setIsRegistring] = useState(false)

  const formik = useFormik({
    initialValues: {
      address: '',
      dob: '',
      email: '',
      gender: '',
      image: '',
      name: '',
      password: '',
      phone: ''
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Vui lòng nhập địa chỉ của bạn'),
      dob: Yup.string().required('Vui lòng nhập ngày sinh của bạn'),
      name: Yup.string().required('Vui lòng nhập tên của bạn'),
      email: Yup.string().required('Vui lòng nhập địa chỉ email').matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ'),
      password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, "Mật khẩu tối thiểu 8 kí tự").max(20, 'Mật khẩu tối đa 20 ký tự'),
      confirm: Yup.string().required('Vui lòng xác nhận mật khẩu').oneOf([Yup.ref("password"), null], 'Mật khẩu xác nhận không trùng khớp'),
      phone: Yup.string().required('Vui lòng nhập số điện thoại của bạn').matches(/^[0-9\-\\+]{10}$/, 'Số điện thoại không hợp lệ')
    }),
    onSubmit: async (values) => {
      setIsRegistring(true)
      await regiserUser(values).then((response) => {    
        if (response.status === responseStatus.SUCCESS) {
          toast.success('Đăng ký tài khoản thành công')
        } else if (response && response.message) {
          if (response?.message.includes('email')) {
            formik.errors.email = 'Email này đã tồn tại'
          } else if (response?.message.includes('phone')) {
            formik.errors.phone = 'Số điện thoại này đã tồn tại'
          }
        } else {
          toast.error('Register fail')
        }
      })
      setIsRegistring(false)
    }
  })

  return (
    <React.Fragment>
      <div className='register-container grid grid-cols-2'>
        <div className='register-left'>
          <div className='left-container'>
            <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={200} height={70} className='registerpage-image' /></a>
            <div className='my-2 font-sans font-semibold leading-6 text-slate-900 text-lg'>Chào mừng bạn đến với hệ thống tuyển dụng CK HR Consulting</div>
            <span className='my-2 font-sans font-light text-slate-400'>Hãy tạo tài khoản để sử dụng những dịch vụ mà chúng tôi mang lại</span>
            <div className='register-form form-group'>
              {registerStatus === responseStatus.SUCCESS && <div className='register-success p-2'>Đăng ký tài khoản thành công</div>}
              <form onSubmit={formik.handleSubmit}>
                <div className='my-3'>
                  <label className='text-lg'>Tên</label><br />
                  <div className='field-input'>
                    <i className="fa-solid fa-user mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                    <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.name && formik.touched.name && 'input-error'}`} name='name' placeholder='Nhập tên của bạn' value={formik.values.name} onChange={formik.handleChange} /><br />
                  </div>
                  {formik.errors.name && formik.touched.name && (
                    <div className='text-[#ec5555]'>{formik.errors.name}</div>
                  )}
                </div>
                <div className='my-3'>
                  <label className='text-lg'>Email</label><br />
                  <div className='field-input'>
                    <i className="fa-solid fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                    <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.email && formik.touched.email && 'input-error'}`} name='email' placeholder='Nhập email của bạn' value={formik.values.email} onChange={formik.handleChange} /><br />
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <div className='text-[#ec5555]'>{formik.errors.email}</div>
                  )}               
                </div>
                <div className='my-3'>
                  <label className='text-lg'>Mật khẩu</label><br />
                  <div className='field-input'>
                    <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                    <input type={isShowPassword ? 'text' : 'password'} className={`input-tag focus:outline-none ${formik.errors.password && formik.touched.password && 'input-error'}`} name='password' placeholder='Nhập mật khẩu' value={formik.values.password} onChange={formik.handleChange} />
                    <span className='mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                      <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                    </span>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <div className='text-[#ec5555]'>{formik.errors.password}</div>
                  )}
                </div>
                <div className='my-3'>
                  <label className='text-lg'>Xác nhận</label><br />
                  <div className='field-input'>
                    <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                    <input type={isShowPassword ? 'text' : 'password'} className={`input-tag focus:outline-none ${formik.errors.confirm && formik.touched.confirm && 'input-error'}`} name='confirm' placeholder='Nhập lại mật khẩu' value={formik.values.confirm} onChange={formik.handleChange} />
                    <span className='mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                      <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                    </span>
                  </div>
                  {formik.errors.confirm && formik.touched.confirm && (
                    <div className='text-[#ec5555]'>{formik.errors.confirm}</div>
                  )}
                </div>
                <div className='my-3'>
                  <label className='text-lg'>Địa chỉ</label><br />
                  <div className='field-input'>
                    <i className="fa-solid fa-address-book mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                    <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.address && formik.touched.address && 'input-error'}`} name='address' placeholder='Nhập địa chỉ của bạn' value={formik.values.address} onChange={formik.handleChange} /><br />
                  </div>
                  {formik.errors.address && formik.touched.address && (
                    <div className='text-[#ec5555]'>{formik.errors.address}</div>
                  )}
                </div>
                <div className='my-3 grid grid-cols-2'>
                  <div>
                    <label className='text-lg'>Số điện thoại</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-mobile-screen-button mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.phone && formik.touched.phone && 'input-error'}`} name='phone' placeholder='Nhập số điện thoại của bạn' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} /><br />
                    </div>
                    {formik.errors.phone && formik.touched.phone && (
                      <div className='text-[#ec5555]'>{formik.errors.phone}</div>
                    )}                
                  </div>                
                  <div className='ml-10'>
                    <label className='text-lg'>Ngày sinh</label><br />
                    <TextField
                      type={'date'}
                      name='dob'
                      value={formik.values.dob}
                      variant="outlined"
                      size='small'
                      style={{ width: '100%' }}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.dob && formik.touched.dob && (
                      <div className='text-[#ec5555]'>{formik.errors.dob}</div>
                    )}
                  </div>
                </div>
                <div className='flex'>
                  <button type='submit' className='btn-register'>Tạo tài khoản</button>
                  {isRegistring && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
                </div>
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  )
}

export default Register
