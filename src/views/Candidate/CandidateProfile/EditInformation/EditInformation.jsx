import React from 'react'
import './EditInformation.scss'
import { useSelector } from "react-redux";

import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditInformation = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser.data);

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
      dateOfBirth: Yup.string().required('Please input your date of birth'),
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
      <div className="form-group px-2 py-2">
        <form onSubmit={formik.handleSubmit}>
          <div className='inline-flex w-full'>
            <div className='my-3 mx-2 w-1/2'>
              <label className='text-lg'>Email</label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control input-field border-none `} name='email' value={currentUser.email} disabled /><br />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className='text-[#ec5555]'>{formik.errors.email}</div>
              )}
            </div>
            <div className='my-3 mx-2 w-1/2'>
              <label className='text-lg'>Fullname: </label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control border-none ${formik.errors.fullname && formik.touched.fullname && 'input-error'}`} name='fullname' placeholder='Nhập tên của bạn' value={formik.values.fullname} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.fullname && formik.touched.fullname && (
                <div className='text-[#ec5555]'>{formik.errors.fullname}</div>
              )}
            </div>
          </div>
          <div className='inline-flex w-full'>
            <div className='my-3 mx-2 w-1/2'>
              <label className='text-lg'>Ngày sinh</label><br />
              <div className='field-input'>
                <input type={'date'} className={`form-control input-field border-none ${formik.errors.dateOfBirth && formik.touched.dateOfBirth && 'input-error'}`} name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange}  /><br />
              </div>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <div className='text-[#ec5555]'>{formik.errors.dateOfBirth}</div>
              )}
            </div>
            <div className='my-3 mx-2 w-1/2'>
              <label className='text-lg'>Phone</label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control input-field border-none ${formik.errors.phone && formik.touched.phone && 'input-error'}`} name='phone' placeholder='Nhập số điện thoại của bạn' value={formik.values.phone} onChange={formik.handleChange}  /><br />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className='text-[#ec5555]'>{formik.errors.phone}</div>
              )}
            </div>
          </div>
          <div className='my-3 mx-2'>
            <label className='text-lg'>Address</label><br />
            <div className='field-input'>
              <input type={'text'} className={`form-control input-field border-none ${formik.errors.address && formik.touched.address && 'input-error'}`} name='address' placeholder='Nhập địa chỉ của bạn' value={formik.values.address} onChange={formik.handleChange} /><br />
            </div>
            {formik.errors.address && formik.touched.address && (
              <div className='text-[#ec5555]'>{formik.errors.address}</div>
            )}
          </div>
          <button type='submit' className='btn-save-edit'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditInformation