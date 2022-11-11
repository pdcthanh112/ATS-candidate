import React, { useState, useEffect } from 'react'
import './RecruitmentDetail.scss'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading'
import { TextField, Autocomplete, Box, Modal } from '@mui/material';

import { getRecruimentRequestDetail } from '../../../apis/recruimentRequestApi';
import { loginUser, regiserUser } from '../../../apis/authApi';
import { educationLevelData, foreignLanguageData } from '../../../utils/dropdownData'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { storage } from '../../../configs/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { applyJob } from '../../../apis/jobApplyApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { responseStatus } from '../../../utils/constants';

const RecruitmentDetail = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const categoryData = useSelector((state) => state.categoryData.data);

  const recruimentId = useParams().id

  const [recruiment, setRecruitment] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [isLoadingApplyJob, setIsLoadingApplyJob] = useState(false)
  const [openModalApply, setOpenModalApply] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [fileCV, setFileCV] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [applyJobObject, setApplyJobObject] = useState({
    candidateId: currentUser?.candidate?.id,
    recruitmentRequestId: recruimentId,
    cityName: "",
    educationLevel: "",
    foreignLanguage: "",
    positionName: "",
    linkCV: ""
  })
  const [isCVNull, setIsCVNull] = useState(false)

  const loginError = useSelector((state) => state.auth.login.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getRecruimentRequestDetail(recruimentId);
      if (response) {
        setRecruitment(response.data.data)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])


  const style = {
    position: 'absolute',
    top: '18rem',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #0F6B14',
    boxShadow: 24,
  };

  const styleAuthModal = {
    position: 'absolute',
    top: '20rem',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: '#f1f2f6',
    border: '1px solid #0F6B14',
    boxShadow: 24,
  };

  // const formikApply = useFormik({
  //   initialValues: {
  // candidateId: currentUser?.candidate?.id,
  // recruitmentRequestId: recruimentId,
  // cityName: "",
  // educationLevel: "",
  // foreignLanguage: "",
  // positionName: "",
  // linkCV: ""
  //   },
  //   validationSchema: Yup.object({
  //     // position: Yup.string().required('Please input your position'),
  //     // experience: Yup.string().required('Please input email'),
  //     // location: Yup.string().required('Please input your phone number'),
  //   }),
  //   onSubmit: async (values) => {
  //     // if (fileCV == null) {
  //     //   formikApply.errors.linkCV = "Please submit your CV";
  //     // } else {
  //     //   const cvRef = ref(storage, `candidate-CV/${fileCV.name + uuidv4()}`)
  //     //   await uploadBytes(cvRef, fileCV).then((snapshot) => {
  //     //     getDownloadURL(snapshot.ref).then(url => {
  //     //       values.linkCV = url
  //     //     })
  //     //   })
  //     // }
  //     console.log('RRRRRR', values);
  //     // regiserUser(values).then((response) => {
  //     //   response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(responseStatus.FAILURE)
  //     // })
  //   }
  // })

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Vui lòng nhập email'),
      password: Yup.string().required('Vui lòng nhập mật khẩu'),
    }),
    onSubmit: (values) => {
      setIsLoadingAuth(true)
      loginUser(values, dispatch, navigate).then(() => {
        setIsLoadingAuth(false)
        setOpenModalLogin(false)
        navigate(`#/recruitment-detail/${recruimentId}`)
      })
    }
  })

  const formikRegister = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Vui lòng điền tên của bạn'),
      email: Yup.string().required('Vui lòng điền email').matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'This email is invalid'),
      password: Yup.string().required('Vui lòng điền mật khẩu').min(8, "Mật khẩu tối thiểu 8 ký tự"),
      confirm: Yup.string().required('Vui lòng xác nhận mật khẩu').oneOf([Yup.ref("password"), null], 'Mật khẩu xác nhận không trùng khớp'),
      address: Yup.string().required('Vui lòng điền địa chỉ'),
      phone: Yup.string().required('Vui lòng điền số điện thoại').matches(/^[0-9\-\\+]{10}$/, 'Số điện thoại không hợp lệ')
    }),
    onSubmit: (values) => {
      console.log(values);
      regiserUser(values).then((response) => {
        //response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(response.message)
      })
    }
  })

  const handleChangeApplyJobObject = (id, value) => {
    setApplyJobObject(() => ({
      ...applyJobObject,
      [id]: value
    }))
  }

  const handleApplyJob = async () => {
    if (fileCV == null) {
      setIsCVNull(true)
    } else {
      const cvRef = ref(storage, `candidate-CV/${fileCV.name}`)
      await uploadBytes(cvRef, fileCV).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(url => {
            setApplyJobObject(() => ({ ...applyJobObject, linkCV: url }))
            console.log('link1: ', url);
            console.log('link2: ', applyJobObject.linkCV);
          })
          .then(() => {
            console.log('2222222222222222');
            console.log('cai obj', applyJobObject);
            setIsLoadingApplyJob(true)
            applyJob(currentUser.token, applyJobObject).then(response => {
              console.log('UUUUUUUUUUUUUUUU', response);
              setIsLoadingApplyJob(false)
              response.status === responseStatus.SUCCESS ? toast.success('Ứng tuyển thành công') : toast.error('Có lỗi xảy ra')
            })
          })
      })
    }
  }

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
              <span><strong className='ml-1'>Salary: </strong> {recruiment.salaryDetail}</span>
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
            <button className='recruitment-detail__apply-button' onClick={() => { currentUser ? setOpenModalApply(true) : setOpenModalLogin(true) }}>APPLY</button>
          </div>
        </div>
      }

      <Modal open={openModalApply} onClose={() => setOpenModalApply(false)}>
        <Box sx={style}>
          <div className='modal-apply-container'>
            <div className='modal-title'>Apply job</div>
            {/* <form onSubmit={formikApply.handleSubmit}> */}
            <div className='my-3'>
              <Autocomplete
                options={categoryData.province}
                size={'small'}
                sx={{ width: 170, marginRight: 2 }}
                renderInput={(params) => <TextField {...params} label="City" />}
                onInputChange={(event, value) => { handleChangeApplyJobObject('cityName', value) }} />
            </div>
            <div className='my-3'>
              <Autocomplete
                options={educationLevelData()}
                size={'small'}
                sx={{ width: 170, marginRight: 2 }}
                renderInput={(params) => <TextField {...params} label="Trình độ" />}
                onInputChange={(event, value) => { handleChangeApplyJobObject('educationLevel', value) }} />
            </div>
            <div className='my-3'>
              <Autocomplete
                options={foreignLanguageData()}
                size={'small'}
                sx={{ width: 170, marginRight: 2 }}
                renderInput={(params) => <TextField {...params} label="Ngoại ngữ" />}
                onInputChange={(event, value) => { handleChangeApplyJobObject('foreignLanguage', value) }} />
            </div>

            <div className='my-3'>
              <Autocomplete
                options={categoryData.jobTitle}
                size={'small'}
                sx={{ width: 170, marginRight: 2 }}
                renderInput={(params) => <TextField {...params} label="Chuyên môn" />}
                onInputChange={(event, value) => { handleChangeApplyJobObject('positionName', value) }} />
            </div>

            <div className='my-3'>
              <label className='text-lg'>Curriculum vitae</label><br />
              <div className='field-input'>
                <input type={'file'} name='fileCV' onChange={(e) => { setFileCV(e.target.files[0]) }} /><br />
              </div>
              {isCVNull && <div className='bg-[#FFBDBD] text-[#FF3333] px-2 py-1 mt-3'>Vui lòng chọn CV của bạn</div>}
            </div>
            <div className='flex'>
              <button type='submit' onClick={() => handleApplyJob()} className='btn-submit'>Submit</button>
              {isLoadingApplyJob && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
            </div>
            {/* </form> */}
          </div>
        </Box>
      </Modal>

      <Modal open={openModalLogin} onClose={() => setOpenModalLogin(false)}>
        <Box sx={styleAuthModal}>
          <div className='modal-auth-container'>
            <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" checked />
            <label for="tab1" class="tabs__label ml-10">Đăng nhập</label>
            <div class="tabs__content">
              <div className='login-form form-group'>
                <form onSubmit={formikLogin.handleSubmit}>
                  <div className='my-4'>
                    <label className='text-base'>Email</label><br />
                    <div className='field-input'>
                      <i className="far fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className='input-tag focus:outline-none' name='email' placeholder='Nhập email của bạn' value={formikLogin.values.email} onChange={formikLogin.handleChange} /><br />
                    </div>
                    {formikLogin.errors.email && formikLogin.touched.email && (
                      <div className='text-[#ec5555]'>{formikLogin.errors.email}</div>
                    )}
                  </div>
                  <div className='form-group my-4'>
                    <label className='text-base'>Mật khẩu</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={isShowPassword ? 'text' : 'password'} className='input-tag focus:outline-none' name='password' placeholder='Nhập mật khẩu' value={formikLogin.values.password} onChange={formikLogin.handleChange} />
                      <span className='mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                      </span>
                    </div>
                    {formikLogin.errors.password && formikLogin.touched.password && (
                      <div className='text-[#ec5555]'>{formikLogin.errors.password}</div>
                    )}
                  </div>
                  {loginError && <div className='input-error p-2 rounded'>Tên đăng nhập hoặc mật khẩu không chính xác</div>}
                  <div className='my-4 font-medium text-base'>
                    <a href="/#/forget-password" style={{ marginLeft: '19rem' }}>Quên mật khẩu</a>
                  </div>
                  <div className='flex'>
                    <button type='submit' className='btn-auth'>Đăng nhập</button>
                    {isLoadingAuth && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
                  </div>
                </form>
                <div className='my-4 font-medium'>
                  <span>Bạn chưa có tài khoản? </span><a href='#/register' style={{ color: "#116835" }}>Đăng ký ngay</a>
                </div>
              </div>
            </div>

            <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" />
            <label for="tab2" class="tabs__label">Đăng ký</label>
            <div class="tabs__content">
              <div className='register-form form-group'>
                <form onSubmit={formikRegister.handleSubmit}>
                  <div className='my-3'>
                    <label className='text-base'>Họ tên</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-user mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className={`form-control  border-none ${formikRegister.errors.fullname && formikRegister.touched.fullname && 'input-error'}`} name='fullname' placeholder='Nhập tên của bạn' value={formikRegister.values.fullname} onChange={formikRegister.handleChange} /><br />
                    </div>
                    {formikRegister.errors.fullname && formikRegister.touched.fullname && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.fullname}</div>
                    )}
                  </div>
                  <div className='my-3'>
                    <label className='text-base'>Email</label><br />
                    <div className='field-input'>
                      <i className="fa-regular fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className={`form-control  border-none ${formikRegister.errors.email && formikRegister.touched.email && 'input-error'}`} name='email' placeholder='Nhập email của bạn' value={formikRegister.values.email} onChange={formikRegister.handleChange} /><br />
                    </div>
                    {formikRegister.errors.email && formikRegister.touched.email && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.email}</div>
                    )}
                    {/* {registerStatus !== responseStatus.SUCCESS && registerStatus.includes('email') && (
                  <div className='text-[#ec5555]'>Email is alrealy exist</div>
                )} */}
                  </div>
                  <div className='my-3'>
                    <label className='text-base'>Mật khẩu</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={isShowPassword ? 'text' : 'password'} className={`form-control  border-none ${formikRegister.errors.password && formikRegister.touched.password && 'input-error'}`} name='password' placeholder='Nhập mật khẩu' value={formikRegister.values.password} onChange={formikRegister.handleChange} />
                      <span className='hideShowPassword mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                      </span>
                    </div>
                    {formikRegister.errors.password && formikRegister.touched.password && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.password}</div>
                    )}
                  </div>
                  <div className='my-3'>
                    <label className='text-base'>Xác nhận</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={isShowPassword ? 'text' : 'password'} className={`form-control  border-none ${formikRegister.errors.confirm && formikRegister.touched.confirm && 'input-error'}`} name='confirm' placeholder='Nhập lại mật khẩu' value={formikRegister.values.confirm} onChange={formikRegister.handleChange} />
                      <span className='hideShowPassword mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                      </span>
                    </div>
                    {formikRegister.errors.confirm && formikRegister.touched.confirm && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.confirm}</div>
                    )}
                  </div>
                  <button type='submit' className='btn-auth'>Tạo tài khoản</button>
                  {isLoadingAuth && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
                </form>
                <div className='my-4 font-medium'>
                  <span>Bạn đã có tài khoản? </span><a href='#/login' style={{ color: "#116835" }}>Đăng nhập</a>
                </div>
              </div>
            </div>

            <i className="fa-solid fa-xmark edit-icon cancel-icon" onClick={() => setOpenModalLogin(false)}></i>
          </div>
        </Box>
      </Modal>

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

export default RecruitmentDetail

