import React from 'react'
import './EditInformation.scss'
import { useSelector } from "react-redux";

import { useFormik } from 'formik'
import * as Yup from 'yup'

const EditInformation = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser.data);
  console.log('asdfasf', currentUser);

  const formik = useFormik({
    initialValues: {
      fullname: currentUser.candidate.name,
      dateOfBirth: currentUser.candidate.dob,
      address: currentUser.candidate.address,
      phone: currentUser.candidate.phone,
      avatar: currentUser.candidate.image,
      gender: currentUser.candidate.gender,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Please input your name'),
      dateOfBirth: Yup.string().required('Please input your date of birth'),
      address: Yup.string().required('Please input your address'),
      phone: Yup.string().required('Please input your phone number').matches(/^[0-9\-\\+]{10}$/, 'This phone number is invalid'),
      //gender: Yup.string().required('Please choose your gender'),
    }),
    onSubmit: (values) => {
      console.log('RRRRRRR', values);
      // regiserUser(values).then((response) => {
      //   response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(responseStatus.FAILURE)
      // })

    }
  })

  return (
    <div>
      <div className="form-group px-2 py-2">
        <form onSubmit={formik.handleSubmit}>
          <div className='inline-flex w-full h-40'>
            <div className='my-3 mx-2 w-2/6'>
              <label className='text-lg'>Email</label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control border-none `} name='email' value={currentUser.email} disabled /><br />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className='text-[#ec5555]'>{formik.errors.email}</div>
              )}
            </div>
            <div className='my-3 mx-2 w-2/6'>
              <label className='text-lg'>Fullname: </label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control border-none ${formik.errors.fullname && formik.touched.fullname && 'input-error'}`} name='fullname' placeholder='Nhập tên của bạn' value={formik.values.fullname} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.fullname && formik.touched.fullname && (
                <div className='text-[#ec5555]'>{formik.errors.fullname}</div>
              )}
            </div>
            <div className='my-3 mx-2 w-2/6'>
              <div className='edit-profile__image'>
                <img src={currentUser.candidate.image} alt="avatar" />
              </div>
              <div className=''>
                <input type={'file'} className='form-control border-none text-sm' name='image' onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.fullname && formik.touched.fullname && (
                <div className='text-[#ec5555]'>{formik.errors.fullname}</div>
              )}
            </div>
          </div>
          <div className='inline-flex w-full'>
            <div className='my-3 mx-2 w-2/6'>
              <label className='text-lg'>Ngày sinh</label><br />
              <div className='field-input'>
                <input type={'date'} className={`form-control border-none ${formik.errors.dateOfBirth && formik.touched.dateOfBirth && 'input-error'}`} name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <div className='text-[#ec5555]'>{formik.errors.dateOfBirth}</div>
              )}
            </div>
            <div className='my-3 mx-2 w-3/6'>
              <label className='text-lg'>Phone</label><br />
              <div className='field-input'>
                <input type={'text'} className={`form-control border-none ${formik.errors.phone && formik.touched.phone && 'input-error'}`} name='phone' placeholder='Nhập số điện thoại của bạn' value={formik.values.phone} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className='text-[#ec5555]'>{formik.errors.phone}</div>
              )}
            </div>
            <div className='my-3 mx-2 w-1/6'>
              <label className='text-lg'>Gender</label><br />
              <div className='field-input'>
                <select name='gender' value={formik.values.gender} onChange={formik.handleChange} className='pt-1'>
                  <option value={null}>Choose...</option>
                  <option value={'Male'}>Male</option>
                  <option value={'Female'}>Female</option>
                  <option value={'Other'}>Other</option>
                </select>
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className='text-[#ec5555]'>{formik.errors.phone}</div>
              )}
            </div>
          </div>
          <div className='my-3 mx-2'>
            <label className='text-lg'>Address</label><br />
            <div className='field-input'>
              <input type={'text'} className={`form-control border-none ${formik.errors.address && formik.touched.address && 'input-error'}`} name='address' placeholder='Nhập địa chỉ của bạn' value={formik.values.address} onChange={formik.handleChange} /><br />
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