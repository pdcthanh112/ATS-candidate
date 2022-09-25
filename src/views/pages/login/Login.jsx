import React, { useState } from 'react'
import './Login.scss'
import headerLogo from '../../../assets/image/big-logo.png'
import loginpageImage from '../../../assets/image/loginpage-image.png'

const Login = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [loginObject, setLoginObject] = useState({ email: '', password: '' })

  const handleHideShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleOnChangeInput = (event, id) => {
    setLoginObject({
      ...loginObject,
      [id]: event.target.value
    })    
  }

  const onHandleSubmitLogin = () => {
    console.log(loginObject);
  }

  return (
    <div className='login-container'>
      <div className='login-left'>
        <img src={loginpageImage} alt='Logo' width={500} height={200} className='loginpage-image' />
      </div>
      <div className='login-right'>
        <div className='right-container'>
          <a href="#/dashboard"><img src={headerLogo} alt='Logo' width={200} height={70} /></a>
          <div className='my-2 font-sans font-semibold leading-6 text-slate-900 text-lg'>Chào mừng bạn đến với hệ thống tuyển dụng CK HR Consulting của chúng tôi</div>
          <span className='my-2 font-sans font-light text-slate-400'>Hãy đăng nhập để có thể sử dụng những dịch vụ của chúng tôi</span>
          <div className='login-form form-group'>
            <div className='my-4'>
              <label className='text-lg'>Email</label><br />
              <div className='field-input'>
                <i className="fa-solid fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px'}}></i>
                <input type={'text'} className='form-control' placeholder='Nhập email của bạn' onChange={event => { handleOnChangeInput(event, 'email') }} /><br />
              </div>
            </div>
            <div className='my-4'>
              <label className='text-lg'>Password</label><br />
              <div className='field-input'>
                <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px'}}></i>
                <input type={isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Nhập mật khẩu' onChange={event => { handleOnChangeInput(event, 'password') }}/>
                <span onClick={() => { handleHideShowPassword() }}>
                  <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                </span>
              </div>
              <div className='my-4'>              
              <a href="#" style={{ marginLeft: '30rem' }}>Quên mật khẩu</a>
              </div>
            </div>
            <button className='btn-login' onClick={() => onHandleSubmitLogin()}>Đăng nhập</button>
            <div className='my-4'>
              <span>Bạn chưa có tài khoản? </span><a href='#/register' style={{ color: "#116835" }}>Đăng ký ngay</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
