import React from 'react'
import './EditInformation.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const EditInformation = () => {

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
          email: Yup.string().required('Please input email').matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'This email is invalid'),
          password: Yup.string().required('Please input password').min(8, "Password must be 8 -20 characters").max(20, "Password must be 8 -20 characters"),
          confirm: Yup.string().required('Please input confirm password').oneOf([Yup.ref("password"), null], 'Not match'),
          address: Yup.string().required('Please input your address'),
          phone: Yup.string().required('Please input your phone number').matches(/^[0-9\-\\+]{10}$/, 'This phone number is invalid')
        }),
        onSubmit: (values) => {
          // regiserUser(values).then((response) => {
          //   response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(responseStatus.FAILURE)
          // })
        }
      })

  return (
    <div>
      <div className="personal-information form-group">
       
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className='my-3'>
              <label className='text-lg'>Fullname: </label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control  border-none ${formik.errors.fullname && formik.touched.fullname && 'input-error'}`} name='fullname' placeholder='Nhập tên của bạn' value= {formik.values.fullname} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.fullname && formik.touched.fullname && (
                <div className='text-[#ec5555]'>{formik.errors.fullname}</div>
              )}
            </div>
            <div className='my-3'>
              <label className='text-lg'>Email</label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control  border-none ${formik.errors.email && formik.touched.email && 'input-error'}`} name='email' placeholder='Nhập email của bạn' value={formik.values.email} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className='text-[#ec5555]'>{formik.errors.email}</div>
              )}
            </div>
            <div className='my-3'>
              <label className='text-lg'>Address</label><br />
              <div className='field-input'>

                <input type={'text'} className={`form-control  border-none ${formik.errors.address && formik.touched.address && 'input-error'}`} name='address' placeholder='Nhập địa chỉ của bạn' value={formik.values.address} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.address && formik.touched.address && (
                <div className='text-[#ec5555]'>{formik.errors.address}</div>
              )}
            </div>
            <div className='my-3'>
              <label className='text-lg'>Phone</label><br />
              <div className='field-input'>

                <input type={'text'} className={`form-control  border-none ${formik.errors.phone && formik.touched.phone && 'input-error'}`} name='phone' placeholder='Nhập số điện thoại của bạn' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} /><br />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className='text-[#ec5555]'>{formik.errors.phone}</div>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditInformation