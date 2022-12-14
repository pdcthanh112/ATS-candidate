import React, { useState, useEffect } from 'react'
import './RecruitmentDetail.scss'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading'
import { TextField, Autocomplete, Box, Modal, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import { getRecruimentRequestById } from '../../../apis/recruimentRequestApi';
import { loginByGoogle, loginUser, regiserUser } from '../../../apis/authApi';
import { educationLevelData, experienceData, foreignLanguageData } from '../../../utils/dropdownData'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { auth, storage } from '../../../configs/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { applyJob, checkApplyByCandidateAndRequest } from '../../../apis/jobApplyApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleButton } from 'react-google-button'

import { v4 as uuid } from 'uuid';
import ViewCV from '../../../assets/icon/viewCV.png'
import { responseStatus } from '../../../utils/constants';
import { getCVByCandidateId } from '../../../apis/candidateApi';
import { useConfirm } from "material-ui-confirm";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const RecruitmentDetail = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const categoryData = useSelector((state) => state.categoryData.data);
  const confirm = useConfirm();
  const recruimentId = useParams().id

  const [recruiment, setRecruitment] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [isLoadingApplyJob, setIsLoadingApplyJob] = useState(false)
  const [openModalApply, setOpenModalApply] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [fileCV, setFileCV] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [listCV, setListCV] = useState([])

  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  const loginError = useSelector((state) => state.auth.login.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getRecruimentRequestById(recruimentId);
      if (response) {
        setRecruitment(response.data)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCVByCandidateId(currentUser.token, currentUser.candidate.id, pagination.currentPage - 1, 5);
      if (response) {
        setListCV(response.data.responseList)
      }
    }
    fetchData();
  }, [pagination.currentPage])

  const style = {
    position: 'absolute',
    top: '20rem',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    minHeight: 480,
    maxHeight: 600,
    overflow: 'scroll',
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

  const formikApply = useFormik({
    initialValues: {
      candidateId: currentUser?.candidate?.id,
      cityName: '',
      educationLevel: '',
      foreignLanguage: '',
      titleCV: '',
      linkCV: '',
      cvId: 0,
      experience: '',
      recruitmentRequestId: recruimentId
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required('Vui lòng chọn tên thành phố'),
      educationLevel: Yup.string().required('Vui lòng chọn trình độ học vấn'),
      foreignLanguage: Yup.array().min(1, 'Vui lòng chọn ít nhất 1 ngoại ngữ của bạn'),
      experience: Yup.string().required('Vui lòng chọn kinh nghiệm của bạn'),
    }),
    onSubmit: async (values) => {
      formikApply.values.foreignLanguage = formikApply.values.foreignLanguage.toString();
      setIsLoadingApplyJob(true)
      if (fileCV == null && formikApply.values.cvId === 0) {
        formikApply.errors.linkCV = "Vui lòng chọn 1 trong những CV có sẵn hoặc nộp CV mới";
      } else {
        if (fileCV != null) {
          formikApply.values.titleCV = fileCV.name
          const cvRef = ref(storage, `candidate-CV/${fileCV.name + uuid()}`)
          await uploadBytes(cvRef, fileCV).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(url => {
              formikApply.values.linkCV = url
            })
          })
        }
        await applyJob(currentUser.token, values).then((response) => {
          if (response.status === responseStatus.SUCCESS) {
            toast.success('Ứng tuyển thành công')
            setOpenModalApply(false)
          } else { toast.error('Có lỗi xảy ra') }
        })
      }
      setIsLoadingApplyJob(false)
    }
  })

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      notificationToken: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Vui lòng nhập email'),
      password: Yup.string().required('Vui lòng nhập mật khẩu'),
    }),
    onSubmit: async (values) => {
      setIsLoadingAuth(true)
      await loginUser(values, dispatch, navigate).then((response) => {
        if (response.status === responseStatus.SUCCESS) {
          setIsLoadingAuth(false)
          setOpenModalLogin(false)
          navigate(`#/recruitment-detail/${recruimentId}`)
        }
      })
    }
  })

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(response => {
      loginByGoogle(response.user.accessToken, dispatch, navigate).then(() => {
        navigate(`#/recruitment-detail/${recruimentId}`)
      })
    })
  }

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
    onSubmit: async (values) => {
      await regiserUser(values).then((response) => {
        //response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(response.message)
      })
    }
  })

  const handleCheckApplied = async () => {
    await checkApplyByCandidateAndRequest(currentUser.token, currentUser.candidate.id, recruimentId).then((response) => {
      if (response.data) {
        confirm({ description: "Bạn đã từng ứng tuyển công việc này trước đây.\n\nBạn có muốn ứng tuyển lại" }).then(() => {
          setOpenModalApply(true)
        })
      } else {
        setOpenModalApply(true)
      }
    })
  }

  return (
    <React.Fragment>
      {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> :
        <div className='recruitment-detail-container'>
          <div className='flex justify-between bg-[#FFF] px-60 py-3'>
            <div>
              <div className='font-bold text-xl text-[#0f6b14]'>{recruiment.position.name}</div>
              <div><span>Ngày đăng tuyển: </span>{recruiment.date}</div>
            </div>
            <div className='font-semibold text-xl max-w-[30rem]'>{recruiment.name}</div>
            <button className='bg-[#0f6b14] w-56 h-10 rounded text-[#FFF]' onClick={() => { currentUser && currentUser.candidate ? handleCheckApplied() : setOpenModalLogin(true) }}>Ứng tuyển</button>
          </div>
          <div className='recruitment-detail__summary'>
            <div>
              <i className="fa-sharp fa-solid fa-file-lines"></i>
              <span><strong className='ml-1'>Hình thức làm việc: </strong> {recruiment.typeOfWork}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-file-lines"></i>
              <span><strong className='ml-1'>Cấp bậc: </strong> {recruiment.jobLevel}</span>
            </div>
            <div>
              <i className="fa-solid fa-building"></i>
              <span><strong className='ml-1'>Industry: </strong> {recruiment.industry}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-school"></i>
              <span><strong className='ml-1'>Kinh nghiệm: </strong> {recruiment.experience}</span>
            </div>
            <div>
              <i className="fa-solid fa-money-bill-wave"></i>
              <span><strong className='ml-1'>Mức lương: </strong> {recruiment.salaryDetail}</span>
            </div>
            <div>
              <i className="fa-solid fa-calendar-days"></i>
              <span><strong className='ml-1'>Ngày hết hạn: </strong> {recruiment.expiryDate}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-person-circle-plus"></i>
              <span><strong className='ml-1'>Số lượng tuyển: </strong> {recruiment.amount}</span>
            </div>
            <div>
              <i className="fa-solid fa-earth-americas"></i>
              <span><strong className='ml-1'>Ngoại ngữ: </strong> {recruiment.foreignLanguage}</span>
            </div>
            <div>
              <i className="fa-solid fa-chalkboard-user"></i>
              <span><strong className='ml-1'>Trạng thái: </strong> {recruiment.status}</span>
            </div>
          </div>
          <div className='recruitment-detail__description'>
            <div className='mt-5'>
              <div className='font-semibold text-2xl mb-1'>Các phúc lợi dành cho bạn</div>
              <div>{recruiment.benefit.split("\n").map((item) => (<div>{item}</div>))}</div>
            </div>
            <div className='mt-5'>
              <div className='font-semibold text-2xl mb-1'>Mô tả công việc</div>
              <div>{recruiment.description.split("\n").map((item) => (<div>{item}</div>))}</div>
            </div>
            <div className='mt-5'>
              <div className='font-semibold text-2xl mb-1'>Yêu cầu công việc</div>
              <div>{recruiment.requirement.split("\n").map((item) => (<div>{item}</div>))}</div>
            </div>
          </div>
        </div>
      }

      <Modal open={openModalApply} onClose={() => setOpenModalApply(false)}>
        <Box sx={style}>
          <div className='modal-apply-container'>
            <form onSubmit={formikApply.handleSubmit}>
              <div className='flex w-full mb-3'>
                <div className='w-[35%] mr-2'>
                  <Autocomplete
                    options={educationLevelData()}
                    size={'small'}
                    sx={{ marginRight: 2, width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Trình độ học vấn" />}
                    onChange={(event, value) => { formikApply.setFieldValue('educationLevel', value) }} />
                  {formikApply.errors.educationLevel && formikApply.touched.educationLevel && (
                    <div className='text-[#ec5555]'>{formikApply.errors.educationLevel}</div>
                  )}
                </div>
                <div className='w-[60%]'>
                  <Autocomplete
                    multiple
                    options={foreignLanguageData()}
                    size={'small'}
                    sx={{ marginRight: 2, width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Ngoại ngữ" />}
                    onChange={(event, value) => { formikApply.setFieldValue('foreignLanguage', value) }} />
                  {formikApply.errors.foreignLanguage && formikApply.touched.foreignLanguage && (
                    <div className='text-[#ec5555]'>{formikApply.errors.foreignLanguage}</div>
                  )}
                </div>
              </div>
              <Autocomplete
                options={categoryData.province}
                size={'small'}
                sx={{ marginRight: 2 }}
                renderInput={(params) => <TextField {...params} label="Thành phố" />}
                onChange={(event, value) => { formikApply.setFieldValue('cityName', value) }} />
              {formikApply.errors.cityName && formikApply.touched.cityName && (
                <div className='text-[#ec5555]'>{formikApply.errors.cityName}</div>
              )}

              <div className='my-3'>
                <Autocomplete
                  options={experienceData()}
                  size={'small'}
                  sx={{ marginRight: 2 }}
                  renderInput={(params) => <TextField {...params} label="Kinh nghiệm" />}
                  onChange={(event, value) => { formikApply.setFieldValue('experience', value) }} />
                {formikApply.errors.experience && formikApply.touched.experience && (
                  <div className='text-[#ec5555]'>{formikApply.errors.experience}</div>
                )}
              </div>

              <div className='my-3'>
                <span>Hồ sơ ứng tuyển</span>
                <div className='modal-apply__CV'>
                  <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" />
                  <label for="tab1" class="tabs__label ml-10">Tải mới</label>
                  <div class="tabs__content">
                    <TextField
                      type={'file'}
                      name='fileCV'
                      onChange={(e) => { setFileCV(e.target.files[0]) }}
                    />
                  </div>

                  <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" />
                  <label for="tab2" class="tabs__label">Có sẵn</label>
                  <div class="tabs__content">
                    <div>
                      <RadioGroup onChange={(event, value) => { formikApply.setFieldValue('cvId', value) }}>
                        {listCV?.map((item) => (
                          <div className='flex justify-between w-[100%]'>
                            <FormControlLabel key={item.id} name={item.id} value={item.id} control={<Radio />} label={item.title} />
                            <a href={item.linkCV} target='_blank' rel="noreferrer" title='View CV'><img src={ViewCV} alt="" width={'20rem'} className='my-auto' /></a>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  {formikApply.errors.linkCV && formikApply.touched.linkCV && (
                    <div className='text-[#ec5555]'>{formikApply.errors.linkCV}</div>
                  )}
                  <i className="fa-solid fa-xmark edit-icon cancel-icon" onClick={() => setOpenModalApply(false)}></i>
                </div>
              </div>
              <div className='flex justify-center'>
                <button type='submit' className='btn-submit'>Ứng tuyển</button>
                {isLoadingApplyJob && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
              </div>
            </form>
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
                  <GoogleButton onClick={() => handleGoogleSignIn()} />
                  <div className='flex mt-4'>
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
    </React.Fragment>
  )
}

export default RecruitmentDetail

