import React, { useState, useEffect } from 'react'
import './RecruitmentPage.scss'

import { Pagination, Stack, TextField, Autocomplete, InputAdornment } from '@mui/material';
import { typeOfWorkData, jobLevelData, experienceData } from '../../../utils/dropdownData';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading'
import RecruitmentList from '../RecruitmentList/RecruitmentList';
import { getAllOpenRecruimentRequest } from '../../../apis/recruimentRequestApi';

import { useFormik } from 'formik'

const RecruitmentPage = () => {

  const dataCategory = useSelector((state) => state.categoryData.data);

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchObject, setSearchObject] = useState({ city: '', experience: '', industry: '', jobLevel: '', jobName: '', salaryFrom: '', salaryTo: '', typeOfWork: '' });
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllOpenRecruimentRequest(pagination.currentPage - 1, 18);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPage })
        setListRecruitment(response.data.responseList)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [pagination.currentPage])


  const handleChangeSearchObject = (id, value) => {
    setSearchObject(() => ({
      ...searchObject,
      [id]: value
    }))
  }

  const onHandleSearch = () => {
    // setIsLoading(true)
    // searchRecruimentRequest(searchObject).then((response) => {
    //   console.log('res', response);
    //   if (response?.data.length > 0) {
    //     setListRecruitment(response.data)
    //     setSearchError(false)
    //   } else {
    //     setSearchError(true)
    //     setPagination({ ...pagination, currentPage: 1 })
    //   }
    //   setSearchObject({ city: '', experience: '', industry: '', jobLevel: '', jobName: '', salaryFrom: '', salaryTo: '', typeOfWork: '' })
    //   setIsLoading(false)
    // }).catch(error => {
    //   setSearchObject({ city: '', experience: '', industry: '', jobLevel: '', jobName: '', salaryFrom: '', salaryTo: '', typeOfWork: '' })
    //   setIsLoading(false)
    //   setSearchError(true)
    // })
  };

  const formik = useFormik({
    initialValues: {
      city: '',
      experience: '',
      industry: '',
      jobLevel: '',
      jobName: '',
      salaryFrom: '',
      salaryTo: '',
      typeOfWork: ''
    },
    onSubmit: async (values) => {
      console.log('search', values);
      // applyJob(currentUser.token, values).then((response) => {
      //   response.status === responseStatus.SUCCESS ? toast.success('Ứng tuyển thành công') : toast.error('Có lỗi xảy ra')
      // })
    }
  })



  return (
    <React.Fragment>

      <div className="search-container">
        <Autocomplete
          options={dataCategory.industry}
          size={'small'}
          sx={{ width: 180, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Chuyên môn" />}
          onInputChange={(event, value) => { handleChangeSearchObject('industry', value) }} />

        <Autocomplete
          options={dataCategory.jobTitle}
          size={'small'}
          sx={{ width: 190, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Tên công việc" />}
          onInputChange={(event, value) => { handleChangeSearchObject('jobName', value) }}
          onChange={(event, value) => { formik.setFieldValue('jobName', value) }} />

        <Autocomplete
          options={typeOfWorkData()}
          size={'small'}
          sx={{ width: 235, height: 10, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Hình thức làm việc" />}
          onInputChange={(event, value) => { handleChangeSearchObject('typeOfWork', value) }} />

        <Autocomplete
          options={jobLevelData()}
          size={'small'}
          sx={{ width: 145, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Cấp bậc" />}
          onInputChange={(event, value) => { handleChangeSearchObject('jobLevel', value) }} />

        <Autocomplete
          options={dataCategory.province}
          size={'small'}
          sx={{ width: 150, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Địa điểm" />}
          onInputChange={(event, value) => { handleChangeSearchObject('city', value) }} />

        <Autocomplete
          options={experienceData()}
          size={'small'}
          sx={{ width: 180, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Kinh nghiệm" />}
          onInputChange={(event, value) => { handleChangeSearchObject('experience', value) }} />

        <TextField
          label="Từ"
          size={'small'}
          sx={{ width: 145, marginRight: 2 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">triệu</InputAdornment>,
          }}
          onChange={(event) => { handleChangeSearchObject('salaryFrom', event.target.value) }}
        />

        <TextField
          label="Đến"
          size={'small'}
          sx={{ width: 145, marginRight: 2 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">triệu</InputAdornment>,
          }}
          onChange={(event) => { handleChangeSearchObject('salaryTo', event.target.value) }}
        />

        <button onClick={() => { onHandleSearch() }} className='flex px-3 py-2 rounded-lg bg-[#50d71e] ml-3'><i className="fa-solid fa-magnifying-glass mt-1 mr-1"></i>Search</button>
      </div>

      <div className='bg-[#FFF] w-[70%] mx-auto py-3 mt-3'>
        {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <RecruitmentList listRecruitment={listRecruitment} />}
      </div>

      <div className='flex justify-center'>
        <Stack spacing={2}>
          <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
        </Stack>
      </div>
    </React.Fragment>
  )
}

export default RecruitmentPage
