import React, { useState } from 'react'
import './EditInformation.scss'
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { storage } from '../../../../../configs/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfileCandidate } from '../../../../../apis/candidateApi';
import { responseStatus } from '../../../../../utils/constants'
import { Autocomplete, TextField } from '@mui/material';
import { genderData } from '../../../../../utils/dropdownData';

const EditInformation = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [fileImage, setFileImage] = useState(null)

  const formik = useFormik({
    initialValues: {
      fullname: currentUser.candidate.name,
      dateOfBirth: currentUser.candidate.dob,
      address: currentUser.candidate.address,
      phone: currentUser.candidate.phone,
      gender: currentUser.candidate.gender,
      image: currentUser.candidate.image,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Please input your name'),
      dateOfBirth: Yup.string().required('Please input your date of birth'),
      address: Yup.string().required('Please input your address'),
      phone: Yup.string().required('Please input your phone number').matches(/^[0-9\-\\+]{10}$/, 'This phone number is invalid'),
    }),
    onSubmit: async (values) => {
      if (fileImage !== null) {
        const imageRef = ref(storage, `candidate-avatar/${fileImage.name}`)
        await uploadBytes(imageRef, fileImage).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(url => {
            values.image = url
          })
        })
      }

      updateProfileCandidate(currentUser.candidate.id, currentUser.token, values).then((response) => {
        response.status === responseStatus.SUCCESS ? toast.success('Edit profile successfully') : toast.error('Edit profile fail')
      })
    }
  })

  return (
    <React.Fragment>
      <div className="editInformation-container">
        <form onSubmit={formik.handleSubmit}>
          <div className='flex my-3 mx-2 justify-between'>
            <div className='w-[30%]'>
              <label className='text-lg'>Email</label>
              <div className='field-input bg-slate-200'>
                <input type={'text'} className={'input-tag focus:outline-none bg-slate-200'} name='email' value={currentUser.email} disabled />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className='text-[#ec5555]'>{formik.errors.email}</div>
              )}
            </div>
            <div className='w-[30%]'>
              <label className='text-lg'>Họ tên: </label>
              <div className='field-input'>
                <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.fullname && formik.touched.fullname && 'input-error'}`} name='fullname' placeholder='Nhập tên của bạn' value={formik.values.fullname} onChange={formik.handleChange} />
              </div>
              {formik.errors.fullname && formik.touched.fullname && (
                <div className='text-[#ec5555]'>{formik.errors.fullname}</div>
              )}
            </div>
            <div className=''>
              <img src={currentUser.candidate.image} alt="avatar" width={'150rem'} style={{ maxHeight: '8rem', maxWidth: '8rem', borderRadius: '50%', margin: '0 auto 0.5rem auto' }} />
              <input type={'file'} className='text-sm mx-auto' name='image' onChange={(e) => { setFileImage(e.target.files[0]) }} />
            </div>
          </div>
          <div className='flex my-3 mx-2 justify-between'>
            <div className='w-[20%]'>
              <label className='text-lg'>Ngày sinh</label>
              <div className='field-input'>
                <input type={'date'} className={`input-tag focus:outline-none ${formik.errors.dateOfBirth && formik.touched.dateOfBirth && 'input-error'}`} name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange} />
              </div>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <div className='text-[#ec5555]'>{formik.errors.dateOfBirth}</div>
              )}
            </div>
            <div className='w-[30%]'>
              <label className='text-lg'>Số điện thoại</label>
              <div className='field-input'>
                <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.phone && formik.touched.phone && 'input-error'}`} name='phone' placeholder='Nhập số điện thoại của bạn' value={formik.values.phone} onChange={formik.handleChange} /><br />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className='text-[#ec5555]'>{formik.errors.phone}</div>
              )}
            </div>
            <div className='mt-4'>
              <Autocomplete
                name='gender'
                options={genderData()}
                size={'small'}
                sx={{ width: 135, marginRight: 2 }}
                renderInput={(params) => <TextField {...params} label="Giới tính" />}
                onChange={(event, value) => { formik.setFieldValue('gender', value) }}
              />
            </div>
          </div>
          <div className='my-3 mx-2'>
            <label className='text-lg'>Địa chỉ</label>
            <div className='field-input'>
              <input type={'text'} className={`input-tag focus:outline-none ${formik.errors.address && formik.touched.address && 'input-error'}`} name='address' placeholder='Nhập địa chỉ của bạn' value={formik.values.address} onChange={formik.handleChange} />
            </div>
            {formik.errors.address && formik.touched.address && (
              <div className='text-[#ec5555]'>{formik.errors.address}</div>
            )}
          </div>
          <button type='submit' className='btn-save-edit'>Save</button>
        </form>
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default EditInformation