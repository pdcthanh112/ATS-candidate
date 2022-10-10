import React from 'react'
import './ResetPassword.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const ResetPassword = () => {
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: Yup.object({
          email: Yup.string().required('Please input email').matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'This email is invalid'),
        }),
        // onSubmit: (values) => {
        //   regiserUser(values).then((response) => {
        //     response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(responseStatus.FAILURE)
        //   })
        // }
      })
    
      return (
        <div className='bg-white reset-password-container'>
          <div className="left-container">
            <form onSubmit={formik.handleSubmit}>
              <div className='my-3'>
                <label className='text-lg'>Email</label><br />
                <div className='field-input'>
                  <i className="fa-solid fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                  <input type={'text'} className={`form-control  border-none ${formik.errors.email && formik.touched.email && 'input-error'}`} name='email' placeholder='Nhập email của bạn' value={formik.values.email} onChange={formik.handleChange} /><br />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <div className='text-[#ec5555]'>{formik.errors.email}</div>
                )}
                {/* {registerStatus === 'FAILURE' && (
                      <div className='text-[#ec5555]'>Email is alrealy exist</div>
                    )} */}
                <button type='submit' className='btn-register'>Đổi mật khẩu</button>
              </div>
            </form>
          </div>
          <div className="right-container">
          </div>
        </div>
      )
}

export default ResetPassword