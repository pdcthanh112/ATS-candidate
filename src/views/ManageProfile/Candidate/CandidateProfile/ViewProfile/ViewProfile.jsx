import React, { useState, useEffect } from "react";
import "./ViewProfile.scss";

import { useSelector } from "react-redux";
import { deleteCV, getCVByCandidateId, uploadCV } from "../../../../../apis/candidateApi";

import EditInformation from "../EditInformation/EditInformation";
import PersonalInformation from "../PersonalInformation/PersonalInformation";

import { storage } from '../../../../../configs/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { Pagination, Stack } from '@mui/material';
import UploadFile from '../../../../../assets/icon/upload-folder.png'
import PDFIcon from '../../../../../assets/icon/pdf.png'
import DeleteIcon from '../../../../../assets/icon/delete.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { responseStatus } from "../../../../../utils/constants";

const ViewProfile = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const [isEditProfile, setIsEditProfile] = useState(false)
  const [fileCV, setFileCV] = useState(null)
  const [uploadError, setUploadError] = useState(false)
  const [listCV, setListCV] = useState([])
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCVByCandidateId(currentUser.token, currentUser.candidate.id, pagination.currentPage - 1, 5);
      if (response) {
        setListCV(response.data.responseList)
        setPagination({ ...pagination, totalPage: response.data.totalPage })
      }
    }
    fetchData();
  }, [pagination.currentPage])

  const uploadCandidateFolder = async () => {
    if (fileCV == null) {
      setUploadError(true);
    } else {
      const cvRef = ref(storage, `candidate-CV/${fileCV.name}`)
      await uploadBytes(cvRef, fileCV).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(url => {
          uploadCV(currentUser.token, currentUser.candidate.id, url, fileCV.name).then((response) => {
            if (response.status === responseStatus.SUCCESS) {
              setPagination({ ...pagination, currentPage: 1 })
              toast.success('Tạo hồ sơ thành công')
            } else {
              toast.error('Có lỗi xảy ra')
            }
          })
        })
      })
    }
  }

  const handleDeleteCV = async (id) => {
    await deleteCV(currentUser.token, id).then((response) => {
      if (response.status === responseStatus.SUCCESS) {
        setPagination({ ...pagination, currentPage: 1 })
        toast.success('Xóa sơ thành công')
      } else {
        toast.error('Có lỗi xảy ra')
      }
    })
  }

  return (
    <React.Fragment>
      <div className="viewProfile-container">
        <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Hồ sơ của tôi</div>
        <div className="profile-container">
          <div className="text-2xl font-semibold pt-4">
            {isEditProfile ? <i className="fa-solid fa-xmark edit-icon" onClick={() => setIsEditProfile(false)}></i> : <i className="fa-regular fa-pen-to-square edit-icon" onClick={() => setIsEditProfile(true)}></i>}
            <div className="ml-3 text-center">Thông tin cá nhân </div>
          </div>
          {isEditProfile ? <><EditInformation /></> : <PersonalInformation />}
        </div>
      </div>

      <div className="uploadFolder-container">
        <div className="pl-5 pt-3 font-semibold text-2xl">Hồ sơ đính kèm</div>

        {/* <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" />
        <label for="tab1" class="tabs__label ml-10">Tải mới</label>
        <div class="tabs__content">
          <div className="uploadFolder-content">
            <input type="file" name='fileCV' onChange={(e) => { setFileCV(e.target.files[0]) }} id="uploadFile" class="inputfile" />
            <label htmlFor="uploadFile" className='choose-file-area'><img src={UploadFile} alt="" style={{ border: '1px dashed #00000050', padding: '2rem 5rem', borderRadius: '1rem' }} /></label>
          </div>
          {uploadError && <div className="flex justify-center text-[#F64E60]">Chọn tệp hồ sơ</div>}
          <div className="relative">
            <button onClick={() => uploadCandidateFolder()} className='upload-button'>Upload</button>
          </div>
        </div>

        <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" />
        <label for="tab2" class="tabs__label">Có sẵn</label>
        <div class="tabs__content">
          <div>
            {listCV?.map((item) => (
              <div className='flex justify-between w-[100%]'>
                <FormControlLabel key={item.id} name={item.id} value={item.linkCV} control={<Radio />} label={item.title} />
                <a href={item.linkCV} target='_blank' rel="noreferrer" title='View CV'><img src={PDFIcon} alt="" width={'20rem'} /></a>
              </div>
            ))}
          </div>
        </div> */}

        <div className='modal-apply__CV'>
          <div className="modal-CV-container">
            <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" />
            <label for="tab1" class="tabs__label ml-10">Tải mới</label>
            <div class="tabs__content">
              <div className="uploadFolder-content">
                <input type="file" name='fileCV' onChange={(e) => { setFileCV(e.target.files[0]) }} id="uploadFile" class="inputfile" />
                <label htmlFor="uploadFile" className='choose-file-area'><img src={UploadFile} alt="" style={{ border: '1px dashed #00000050', padding: '2rem 5rem', borderRadius: '1rem' }} /></label>
              </div>
              {uploadError && <div className="flex justify-center text-[#F64E60] text-xl">Chọn tệp hồ sơ</div>}
              <div className="flex justify-end">
                <button onClick={() => uploadCandidateFolder()} className='upload-button'>Upload</button>
              </div>
            </div>

            <input type="radio" class="tabs__radio" name="tabs-example" id="tab2" />
            <label for="tab2" class="tabs__label">Có sẵn</label>
            <div class="tabs__content">
              <div>
                {listCV?.map((item) => (
                  <div className="flex my-4 justify-evenly w-[60%] mx-auto" style={{ borderBottom: '1px solid #000' }}>
                    <a href={item.linkCV} target='_blank' rel="noreferrer" title='View CV'>
                      <div className='flex'>
                        <img src={PDFIcon} alt="" width={'20rem'} />
                        <span className="ml-3">{item.title}</span>
                      </div>
                    </a>
                    <div onClick={() => { handleDeleteCV(item.id) }}><img src={DeleteIcon} alt="" width={'25rem'} title='Delete' /></div>
                  </div>
                ))}
              </div>
              <div className='flex justify-center pb-3'>
                <Stack spacing={2}>
                  <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
                </Stack>
              </div>
            </div>
          </div>
        </div>
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
    </React.Fragment>
  );
};

export default ViewProfile;
