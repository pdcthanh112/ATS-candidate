import React, { useState } from 'react'
import './Register.scss'
import headerLogo from '../../../assets/image/big-logo.png'
import loginpageImage from '../../../assets/image/loginpage-image.png'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { regiserUser } from '../../../redux/apiRequest'

const Register = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [registerObject, setRegisterObject] = useState({})

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHideShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleOnChangeInput = (event, id) => {
    setRegisterObject({
      ...registerObject,
      [id]: event.target.value
    })
  }

  const onHandleSubmitRegister = (e) => {
    e.preventDefault();
    regiserUser(registerObject, dispatch, navigate)
  }

  return (
    <div className='register-container'>
      <div className='register-left'>
        <div className='left-container'>
          <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={200} height={70} className='registerpage-image' /></a>
          <div className='my-2 font-sans font-semibold leading-6 text-slate-900 text-lg'>Chào mừng bạn đến với hệ thống tuyển dụng CK HR Consulting của chúng tôi</div>
          <span className='my-2 font-sans font-light text-slate-400'>Hãy tạo tài khoản để sử dụng những dịch vụ mà chúng tôi mang lại</span>
          <div className='register-form form-group'>
            <form onSubmit={onHandleSubmitRegister}>
              <div className='my-3'>
                <label className='text-lg'>Email</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='form-control' placeholder='Nhập email của bạn' onChange={event => { handleOnChangeInput(event, 'email') }} /><br />
                </div>
              </div>
              <div className='my-3'>
                <label className='text-lg'>Fullname</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-user mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className='form-control' placeholder='Nhập tên của bạn' onChange={event => { handleOnChangeInput(event, 'fullname') }} /><br />
                </div>
              </div>
              <div className='my-3'>
                <label className='text-lg'>Password</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Nhập mật khẩu' onChange={event => { handleOnChangeInput(event, 'password') }} />
                  <span onClick={() => { handleHideShowPassword() }}>
                    <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                  </span>
                </div>
              </div>
              <div className='my-3'>
                <label className='text-lg'>Confirm</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Nhập mật khẩu' onChange={event => { handleOnChangeInput(event, 'confirm') }} />
                  <span onClick={() => { handleHideShowPassword() }}>
                    <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                  </span>
                </div>
              </div>
              <button className='btn-register'>Tạo tài khoản</button>
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
