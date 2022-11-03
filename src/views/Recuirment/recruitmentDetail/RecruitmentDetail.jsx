import React, { useState, useEffect } from 'react'
import { getRecruimentRequestDetail, getCategory } from '../../../apis/recruimentRequestApi';
import './RecruitmentDetail.scss'
import { useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'
import { TextField, Autocomplete, Box, Modal } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';


import { useFormik } from 'formik'
import * as Yup from 'yup'

import { storage } from '../../../configs/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const RecruitmentDetail = () => {

  
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const categoryData = useSelector((state) => state.categoryData.data);

  const recruimentId = useParams().id

  const [recruiment, setRecruitment] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [openModalApply, setOpenModalApply] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [fileCV, setFileCV] = useState(null)

  const filter = createFilterOptions();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getRecruimentRequestDetail(recruimentId);
      if (response) {
        console.log("data:", response.data.data);
        setIsLoading(false) 
        setRecruitment(response.data.data)            
      }
    }
    fetchData();
  }, [])


  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #0F6B14',
    boxShadow: 24,
  };

  const formikApply = useFormik({
    initialValues: {
      position: "",
      experience: "",
      skill: "",
      location: "",
      linkCV: ""
    },
    validationSchema: Yup.object({
      // position: Yup.string().required('Please input your position'),
      // experience: Yup.string().required('Please input email').matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'This email is invalid'),
      // location: Yup.string().required('Please input your phone number').matches(/^[0-9\-\\+]{10}$/, 'This phone number is invalid'),
    }),
    onSubmit: async (values) => {
      if (fileCV == null) {
        formikApply.errors.linkCV = "Please submit your CV";
      } else {
        const cvRef = ref(storage, `candidate-CV/${fileCV.name + uuidv4()}`)
        await uploadBytes(cvRef, fileCV).then((snapshot) => {
          getDownloadURL(snapshot.ref).then(url => {
            values.linkCV = url
          })
        })
      }
      console.log('RRRRRR', values);
      // regiserUser(values).then((response) => {
      //   response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(responseStatus.FAILURE)
      // })
    }
  })

  return (
    <React.Fragment>
      {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> :
        <div className='recruitment-detail-container'>
          <div className='recruitment-detail__title'>{recruiment.position.name}</div>
          <div className='recruitment-detail__summary grid grid-cols-3 gap-4'>
            <div>
              <i className="fa-sharp fa-solid fa-file-lines"></i>
              <span><strong className='ml-1'>Type of work: </strong> {recruiment.typeOfWork}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-file-lines"></i>
              <span><strong className='ml-1'>Job level: </strong> {recruiment.jobLevel}</span>
            </div>
            <div>
              <i className="fa-solid fa-calendar-days"></i>
              <span><strong className='ml-1'>Create date: </strong> {recruiment.date}</span>
            </div>
            <div>
              <i className="fa-solid fa-building"></i>
              <span><strong className='ml-1'>Industry: </strong> {recruiment.industry}</span>
            </div>
            <div>
              <i className="fa-solid fa-money-bill-wave"></i>
              <span><strong className='ml-1'>Salary: </strong> {recruiment.salary}</span>
            </div>
            <div>
              <i className="fa-solid fa-calendar-days"></i>
              <span><strong className='ml-1'>Expired date: </strong> {recruiment.expiryDate}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-school"></i>
              <span><strong className='ml-1'>Experience: </strong> {recruiment.experience}</span>
            </div>
            <div>
              <i className="fa-solid fa-calendar-days"></i>
              <span><strong className='ml-1'>Status: </strong> {recruiment.status}</span>
            </div>
          </div>
          <div className='inline-flex mt-3'>
            <div className='w-5/6'>{recruiment.description}</div>
            <button className='recruitment-detail__apply-button' onClick={() => {currentUser !== null ? setOpenModalApply(true) : setOpenModalLogin(true)}}>APPLY</button>
          </div>
        </div>
      }

      <Modal open={openModalApply} onClose={() => setOpenModalApply(false)}>
        <Box sx={style}>
          <div className='modal-container'>
            <div className='modal-title'>Apply job</div>
            <div>
              <form onSubmit={formikApply.handleSubmit}>
                <div className='my-3'>
                  <Autocomplete
                    defaultValue={''}
                    options={categoryData.jobTitle}
                    size={'small'}
                    sx={{ width: 170, marginRight: 2 }}
                    renderInput={(params) => <TextField {...params} label="Position" />}
                    onInputChange={formikApply.handleChange} />
                  {formikApply.errors.fullname && formikApply.touched.fullname && (
                    <div className='text-[#ec5555]'>{formikApply.errors.fullname}</div>
                  )}
                </div>
                <div className='my-3'>
                  <Autocomplete
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      // Suggest the creation of a new value
                      if (params.inputValue !== '') {
                        filtered.push(`Add "${params.inputValue}"`);
                      }
                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={categoryData.skill}
                    renderOption={(option) => option}
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Enter Something"
                        variant="outlined" />
                    )}
                  />
                  {formikApply.errors.email && formikApply.touched.email && (
                    <div className='text-[#ec5555]'>{formikApply.errors.email}</div>
                  )}
                </div>
                <div className='my-3'>
                  <label className='text-lg'>Phone</label><br />
                  <div className='field-input'>
                    <i className="fa-solid fa-mobile-screen-button mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                    <input type={'text'} className={`form-control  border-none ${formikApply.errors.phone && formikApply.touched.phone && 'input-error'}`} name='phone' placeholder='Nhập số điện thoại của bạn' value={formikApply.values.phone} onChange={formikApply.handleChange} onBlur={formikApply.handleBlur} /><br />
                  </div>
                  {formikApply.errors.phone && formikApply.touched.phone && (
                    <div className='text-[#ec5555]'>{formikApply.errors.phone}</div>
                  )}
                </div>
                <div className='my-3'>
                  <label className='text-lg'>Curriculum vitae</label><br />
                  <div className='field-input'>
                    <input type={'file'} className={`form-control  border-none`} name='fileCV' onChange={(e) => { setFileCV(e.target.files[0]) }} /><br />
                  </div>
                  {formikApply.errors.linkCV && (
                    <div className='text-[#ec5555]'>{formikApply.errors.linkCV}</div>
                  )}
                </div>
                <div><button type='submit' className='btn-submit'>Submit</button></div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={openModalLogin} onClose={() => setOpenModalLogin(false)}>
        <Box sx={style}>
          <div className='modal-container'>
            <div className='modal-title'>Login</div>
            <div>
              <form onSubmit={formikApply.handleSubmit}>
                
                <div><button type='submit' className='btn-submit'>Submit</button></div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default RecruitmentDetail

