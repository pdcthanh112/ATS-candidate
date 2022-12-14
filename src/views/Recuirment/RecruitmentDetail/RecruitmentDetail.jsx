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
import moment from 'moment'

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
      const response = await getCVByCandidateId(currentUser.candidate.id, pagination.currentPage - 1, 5);
      if (response && response.data) {
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
      foreignLanguage: [],
      titleCV: '',
      linkCV: '',
      cvId: 0,
      experience: '',
      recruitmentRequestId: recruimentId
    },
    validationSchema: Yup.object({
      cityName: Yup.string().required('Vui l??ng ch???n t??n th??nh ph???'),
      educationLevel: Yup.string().required('Vui l??ng ch???n tr??nh ????? h???c v???n'),
      foreignLanguage: Yup.array().min(1, 'Vui l??ng ch???n ??t nh???t 1 ngo???i ng??? c???a b???n'),
      experience: Yup.string().required('Vui l??ng ch???n kinh nghi???m c???a b???n'),
    }),
    onSubmit: async (values) => {
      formikApply.values.foreignLanguage = formikApply.values.foreignLanguage.toString();
      setIsLoadingApplyJob(true)
      if (fileCV == null && formikApply.values.cvId === 0) {
        formikApply.errors.linkCV = "Vui l??ng ch???n 1 trong nh???ng CV c?? s???n ho???c n???p CV m???i";
      } else {
        if (fileCV != null) {
          formikApply.values.titleCV = fileCV.name
          const cvRef = ref(storage, `candidate-CV/${fileCV.name + uuid()}`)
          await uploadBytes(cvRef, fileCV).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((url) => {
              formikApply.values.linkCV = url
            })
          })
        }

        await applyJob(values).then((response) => {
          if (response.status === responseStatus.SUCCESS) {
            toast.success('???ng tuy???n th??nh c??ng')
            setOpenModalApply(false)
          } else { toast.error('C?? l???i x???y ra') }
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
      email: Yup.string().required('Vui l??ng nh???p email'),
      password: Yup.string().required('Vui l??ng nh???p m???t kh???u'),
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
        setOpenModalLogin(false)
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
      fullname: Yup.string().required('Vui l??ng ??i???n t??n c???a b???n'),
      email: Yup.string().required('Vui l??ng ??i???n email').matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'This email is invalid'),
      password: Yup.string().required('Vui l??ng ??i???n m???t kh???u').min(8, "M???t kh???u t???i thi???u 8 k?? t???"),
      confirm: Yup.string().required('Vui l??ng x??c nh???n m???t kh???u').oneOf([Yup.ref("password"), null], 'M???t kh???u x??c nh???n kh??ng tr??ng kh???p'),
      address: Yup.string().required('Vui l??ng ??i???n ?????a ch???'),
      phone: Yup.string().required('Vui l??ng ??i???n s??? ??i???n tho???i').matches(/^[0-9\-\\+]{10}$/, 'S??? ??i???n tho???i kh??ng h???p l???')
    }),
    onSubmit: async (values) => {
      await regiserUser(values).then((response) => {
        //response === responseStatus.SUCCESS ? setRegisterStatus(responseStatus.SUCCESS) : setRegisterStatus(response.message)
      })
    }
  })

  const handleCheckApplied = async () => {
    await checkApplyByCandidateAndRequest(currentUser.candidate.id, recruimentId).then((response) => {
      if (response.data) {
        confirm({ description: "B???n ???? t???ng ???ng tuy???n c??ng vi???c n??y tr?????c ????y.\n\nB???n c?? mu???n ???ng tuy???n l???i" }).then(() => {
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
              <div><span>Ng??y ????ng tuy???n: </span>{moment(recruiment.date).format('DD-MM-YYYY')}</div>
            </div>
            <div className='font-semibold text-xl max-w-[30rem]'>{recruiment.name}</div>
            <button className='bg-[#0f6b14] w-56 h-10 rounded text-[#FFF]' onClick={() => { currentUser && currentUser.candidate ? handleCheckApplied() : setOpenModalLogin(true) }}>???ng tuy???n</button>
          </div>
          <div className='recruitment-detail__summary'>
            <div>
              <i className="fa-sharp fa-solid fa-file-lines"></i>
              <span><strong className='ml-1'>H??nh th???c l??m vi???c: </strong> {recruiment.typeOfWork}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-file-lines"></i>
              <span><strong className='ml-1'>C???p b???c: </strong> {recruiment.jobLevel}</span>
            </div>
            <div>
              <i className="fa-solid fa-building"></i>
              <span><strong className='ml-1'>Industry: </strong> {recruiment.industry}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-school"></i>
              <span><strong className='ml-1'>Kinh nghi???m: </strong> {recruiment.experience}</span>
            </div>
            <div>
              <i className="fa-solid fa-money-bill-wave"></i>
              <span><strong className='ml-1'>M???c l????ng: </strong> {recruiment.salaryDetail}</span>
            </div>
            <div>
              <i className="fa-solid fa-calendar-days"></i>
              <span><strong className='ml-1'>Ng??y h???t h???n: </strong> {moment(recruiment.expiryDate).format('DD/MM/YYYY')}</span>
            </div>
            <div>
              <i className="fa-sharp fa-solid fa-person-circle-plus"></i>
              <span><strong className='ml-1'>S??? l?????ng tuy???n: </strong> {recruiment.amount}</span>
            </div>
            <div>
              <i className="fa-solid fa-earth-americas"></i>
              <span><strong className='ml-1'>Ngo???i ng???: </strong> {recruiment.foreignLanguage}</span>
            </div>
            <div>
              <i className="fa-solid fa-chalkboard-user"></i>
              <span><strong className='ml-1'>Tr???ng th??i: </strong> {recruiment.status}</span>
            </div>
            <div>
              <i className="fa-solid fa-city"></i>
              <span><strong className='ml-1'>N??i l??m vi???c: </strong> {recruiment?.cities?.name}</span>
            </div>
          </div>
          <div className='recruitment-detail__description'>
            <div className='mt-5'>
              <div className='font-semibold text-2xl mb-1'>C??c ph??c l???i d??nh cho b???n</div>
              <div>{recruiment.benefit.split("\n").map((item) => (<div>{item}</div>))}</div>
            </div>
            <div className='mt-5'>
              <div className='font-semibold text-2xl mb-1'>M?? t??? c??ng vi???c</div>
              <div>{recruiment.description.split("\n").map((item) => (<div>{item}</div>))}</div>
            </div>
            <div className='mt-5'>
              <div className='font-semibold text-2xl mb-1'>Y??u c???u c??ng vi???c</div>
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
                    renderInput={(params) => <TextField {...params} label="Tr??nh ????? h???c v???n" />}
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
                    renderInput={(params) => <TextField {...params} label="Ngo???i ng???" />}
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
                renderInput={(params) => <TextField {...params} label="Th??nh ph???" />}
                onChange={(event, value) => { formikApply.setFieldValue('cityName', value) }} />
              {formikApply.errors.cityName && formikApply.touched.cityName && (
                <div className='text-[#ec5555]'>{formikApply.errors.cityName}</div>
              )}

              <div className='my-3'>
                <Autocomplete
                  options={experienceData()}
                  size={'small'}
                  sx={{ marginRight: 2 }}
                  renderInput={(params) => <TextField {...params} label="Kinh nghi???m" />}
                  onChange={(event, value) => { formikApply.setFieldValue('experience', value) }} />
                {formikApply.errors.experience && formikApply.touched.experience && (
                  <div className='text-[#ec5555]'>{formikApply.errors.experience}</div>
                )}
              </div>

              <div className='my-3'>
                <span>H??? s?? ???ng tuy???n</span>
                <div className='modal-apply__CV'>
                  <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" />
                  <label for="tab1" class="tabs__label ml-10">T???i m???i</label>
                  <div class="tabs__content">
                    <TextField
                      type={'file'}
                      name='fileCV'
                      onChange={(e) => { setFileCV(e.target.files[0]) }}
                    />
                  </div>

                  <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" />
                  <label for="tab2" class="tabs__label">C?? s???n</label>
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
                <button type='submit' className='btn-submit'>???ng tuy???n</button>
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
            <label for="tab1" class="tabs__label ml-10">????ng nh???p</label>
            <div class="tabs__content">
              <div className='login-form form-group'>
                <form onSubmit={formikLogin.handleSubmit}>
                  <div className='my-4'>
                    <label className='text-base'>Email</label><br />
                    <div className='field-input'>
                      <i className="far fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className='input-tag focus:outline-none' name='email' placeholder='Nh???p email c???a b???n' value={formikLogin.values.email} onChange={formikLogin.handleChange} /><br />
                    </div>
                    {formikLogin.errors.email && formikLogin.touched.email && (
                      <div className='text-[#ec5555]'>{formikLogin.errors.email}</div>
                    )}
                  </div>
                  <div className='form-group my-4'>
                    <label className='text-base'>M???t kh???u</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={isShowPassword ? 'text' : 'password'} className='input-tag focus:outline-none' name='password' placeholder='Nh???p m???t kh???u' value={formikLogin.values.password} onChange={formikLogin.handleChange} />
                      <span className='mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                      </span>
                    </div>
                    {formikLogin.errors.password && formikLogin.touched.password && (
                      <div className='text-[#ec5555]'>{formikLogin.errors.password}</div>
                    )}
                  </div>
                  {loginError && <div className='input-error p-2 rounded'>T??n ????ng nh???p ho???c m???t kh???u kh??ng ch??nh x??c</div>}
                  <div className='my-4 font-medium text-base'>
                    <a href="/#/forget-password" style={{ marginLeft: '19rem' }}>Qu??n m???t kh???u</a>
                  </div>
                  <GoogleButton onClick={() => handleGoogleSignIn()} />
                  <div className='flex mt-4'>
                    <button type='submit' className='btn-auth'>????ng nh???p</button>
                    {isLoadingAuth && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
                  </div>
                </form>
                <div className='my-4 font-medium'>
                  <span>B???n ch??a c?? t??i kho???n? </span><a href='#/register' style={{ color: "#116835" }}>????ng k?? ngay</a>
                </div>
              </div>
            </div>

            <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" />
            <label for="tab2" class="tabs__label">????ng k??</label>
            <div class="tabs__content">
              <div className='register-form form-group'>
                <form onSubmit={formikRegister.handleSubmit}>
                  <div className='my-3'>
                    <label className='text-base'>H??? t??n</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-user mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className={`form-control  border-none ${formikRegister.errors.fullname && formikRegister.touched.fullname && 'input-error'}`} name='fullname' placeholder='Nh???p t??n c???a b???n' value={formikRegister.values.fullname} onChange={formikRegister.handleChange} /><br />
                    </div>
                    {formikRegister.errors.fullname && formikRegister.touched.fullname && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.fullname}</div>
                    )}
                  </div>
                  <div className='my-3'>
                    <label className='text-base'>Email</label><br />
                    <div className='field-input'>
                      <i className="fa-regular fa-envelope mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={'text'} className={`form-control  border-none ${formikRegister.errors.email && formikRegister.touched.email && 'input-error'}`} name='email' placeholder='Nh???p email c???a b???n' value={formikRegister.values.email} onChange={formikRegister.handleChange} /><br />
                    </div>
                    {formikRegister.errors.email && formikRegister.touched.email && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.email}</div>
                    )}
                  </div>
                  <div className='my-3'>
                    <label className='text-base'>M???t kh???u</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={isShowPassword ? 'text' : 'password'} className={`form-control  border-none ${formikRegister.errors.password && formikRegister.touched.password && 'input-error'}`} name='password' placeholder='Nh???p m???t kh???u' value={formikRegister.values.password} onChange={formikRegister.handleChange} />
                      <span className='hideShowPassword mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                      </span>
                    </div>
                    {formikRegister.errors.password && formikRegister.touched.password && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.password}</div>
                    )}
                  </div>
                  <div className='my-3'>
                    <label className='text-base'>X??c nh???n</label><br />
                    <div className='field-input'>
                      <i className="fa-solid fa-lock mx-2 my-auto" style={{ color: "#116835", fontSize: '22px' }}></i>
                      <input type={isShowPassword ? 'text' : 'password'} className={`form-control  border-none ${formikRegister.errors.confirm && formikRegister.touched.confirm && 'input-error'}`} name='confirm' placeholder='Nh???p l???i m???t kh???u' value={formikRegister.values.confirm} onChange={formikRegister.handleChange} />
                      <span className='hideShowPassword mx-2 my-auto' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                        <i className={isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                      </span>
                    </div>
                    {formikRegister.errors.confirm && formikRegister.touched.confirm && (
                      <div className='text-[#ec5555]'>{formikRegister.errors.confirm}</div>
                    )}
                  </div>
                  <button type='submit' className='btn-auth'>T???o t??i kho???n</button>
                  {isLoadingAuth && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={37} />}
                </form>
                <div className='my-4 font-medium'>
                  <span>B???n ???? c?? t??i kho???n? </span><a href='#/login' style={{ color: "#116835" }}>????ng nh???p</a>
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

