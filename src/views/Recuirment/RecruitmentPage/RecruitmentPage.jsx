import React, { useState, useEffect } from 'react'
import './RecruitmentPage.scss'

import { Pagination, Stack, TextField, Autocomplete, InputAdornment } from '@mui/material';
import { typeOfWorkData, jobLevelData, experienceData } from '../../../utils/dropdownData';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading'
import RecruitmentList from '../RecruitmentList/RecruitmentList';
import { getAllOpenRecruimentRequest, searchRecruimentRequest } from '../../../apis/recruimentRequestApi';
import { useFormik } from 'formik'

const RecruitmentPage = () => {

  const dataCategory = useSelector((state) => state.categoryData.data);

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState(false)

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

  const formikSearch = useFormik({
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
      setSearchError(false)
      setIsSearching(true)
      await searchRecruimentRequest(values).then((response) => {
        if (response && response.data.length > 0) {
          setListRecruitment(response.data)
        } else {
          setSearchError(true)
        }
        setIsSearching(false)
      })
    }
  })



  return (
    <React.Fragment>
      <form onSubmit={formikSearch.handleSubmit}>
        <div className="search-container">

          <Autocomplete
            options={dataCategory.industry}
            size={'small'}
            sx={{ width: 190, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="Chuy??n m??n" />}
            onChange={(event, value) => { formikSearch.setFieldValue('industry', value) }}
          />

          <Autocomplete
            options={dataCategory.jobTitle}
            size={'small'}
            sx={{ width: 240, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="T??n c??ng vi???c" />}
            onChange={(event, value) => { formikSearch.setFieldValue('jobName', value) }}
          />

          <Autocomplete
            options={typeOfWorkData()}
            size={'small'}
            sx={{ width: 250, height: 10, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="H??nh th???c l??m vi???c" />}
            onChange={(event, value) => { formikSearch.setFieldValue('typeOfWork', value) }}
          />

          <Autocomplete
            options={jobLevelData()}
            size={'small'}
            sx={{ width: 245, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="C???p b???c" />}
            onInputChange={(event, value) => { formikSearch.setFieldValue('jobLevel', value) }} />

          <Autocomplete
            options={dataCategory.province}
            size={'small'}
            sx={{ width: 180, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="?????a ??i???m" />}
            onInputChange={(event, value) => { formikSearch.setFieldValue('city', value) }} />

          <Autocomplete
            options={experienceData()}
            size={'small'}
            sx={{ width: 200, marginRight: 2 }}
            renderInput={(params) => <TextField {...params} label="Kinh nghi???m" />}
            onInputChange={(event, value) => { formikSearch.setFieldValue('experience', value) }} />

          <TextField
            label="T???"
            name='salaryFrom'
            value={formikSearch.values.salaryFrom}
            size={'small'}
            sx={{ width: 145, marginRight: 2 }}
            InputProps={{ endAdornment: <InputAdornment position="end">tri???u</InputAdornment>, }}
            onChange={formikSearch.handleChange}
          />

          <TextField
            label="?????n"
            name='salaryTo'
            value={formikSearch.values.salaryTo}
            size={'small'}
            sx={{ width: 145, marginRight: 2 }}
            InputProps={{ endAdornment: <InputAdornment position="end">tri???u</InputAdornment>, }}
            onChange={formikSearch.handleChange}
          />

          <button className='flex px-3 py-2 rounded-lg bg-[#50d71e] ml-3 max-h-10'><i className="fa-solid fa-magnifying-glass mt-1 mr-1"></i>Search</button>
          {isSearching && <ReactLoading className='ml-2' type='spin' color='#FF4444' width={40} />}
        </div>
        {searchError && <div className='bg-[#FFE2E5] text-[#F64E60] pl-20'>Kh??ng t??m th???y c??ng vi???c ph?? h???p v???i y??u c???u c???a b???n</div>}
      </form>

      <div className='bg-[#FFF] w-[70%] mx-auto py-3 mt-3'>
        {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <RecruitmentList listRecruitment={listRecruitment} />}
      </div>

      <div className='flex justify-center bg-[#FFF] w-[70%] mx-auto mb-5 pb-3'>
        <Stack spacing={2}>
          <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
        </Stack>
      </div>
    </React.Fragment>
  )
}

export default RecruitmentPage
