import React, { useState, useEffect } from 'react'
import './Dashboard.scss'
import { getAllRecruimentRequest, getCategory, searchRecruimentRequest } from '../../apis/recruimentRequestApi';
import RecruitmentList from '../Recuirment/recruitmentList/RecruitmentList';
import ReactLoading from 'react-loading'
import { Pagination, Stack, TextField, Autocomplete } from '@mui/material';
import { typeOfWorkData, jobLevelData, experienceData, salaryData, locationData } from '../../utils/dropdownData';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {

  const dataCategory = useSelector((state) => state.categoryData.data);

  useSelector((state) => state.auth.login.currentUser);
  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchObject, setSearchObject] = useState({ city: '', experience: '', industry: '', jobLevel: '', jobName: '', salaryFrom: '', salaryTo: '', typeOfWork: '' });
  const [searchError, setSearchError] = useState(false)
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllRecruimentRequest(pagination.currentPage - 1, 12);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPages })
        setListRecruitment(response.data.responseList)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [pagination.currentPage])

  useEffect(() => {
    getCategory(dispatch)
  }, [])

  const handleChangeSearchObject = (id, value) => {
    setSearchObject(() => ({
      ...searchObject,
      [id]: value
    }))
  }

  const onHandleSearch = () => {
    setIsLoading(true)
    searchRecruimentRequest(searchObject).then((response) => {
      console.log('res', response);
      // if (response.data.length > 0) {
      //   setListRecruitment(response.data)
      //   setSearchError(false)
      // } else {
      //   setSearchError(true)
      //   setPagination({ ...pagination, currentPage: 1 })
      // }
      setSearchObject({ city: '', experience: '', industry: '', jobLevel: '', jobName: '', salaryFrom: '', salaryTo: '', typeOfWork: '' })
      setIsLoading(false)
    })
  };

  // if (isLoading) return <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' />

  return (
    <React.Fragment>
      <div className="search-container">
        <Autocomplete
          defaultValue={''}
          options={typeOfWorkData()}
          size={'small'}
          sx={{ width: 170, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Hình thức làm việc" />}
          onInputChange={(event, value) => { handleChangeSearchObject('typeOfWork', value) }} />

        <Autocomplete
          defaultValue={''}
          options={jobLevelData()}
          size={'small'}
          sx={{ width: 125, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Cấp bậc" />}
          onInputChange={(event, value) => { handleChangeSearchObject('jobLevel', value) }} />

        <Autocomplete
          defaultValue={''}
          options={dataCategory.industry}
          size={'small'}
          sx={{ width: 170, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Chuyên môn" />}
          onInputChange={(event, value) => { handleChangeSearchObject('industry', value) }} />

        <Autocomplete
          defaultValue={''}
          options={dataCategory.jobTitle}
          size={'small'}
          sx={{ width: 200, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Tên công việc" />}
          onInputChange={(event, value) => { handleChangeSearchObject('jobName', value) }} />

        <Autocomplete
          defaultValue={''}
          options={experienceData()}
          size={'small'}
          sx={{ width: 145, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Kinh nghiệm" />}
          onInputChange={(event, value) => { handleChangeSearchObject('experience', value) }} />

        <Autocomplete
          defaultValue={''}
          options={salaryData()}
          size={'small'}
          sx={{ width: 200, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Mức lương" />}
          onInputChange={(event, value) => { handleChangeSearchObject('salary', value) }} />

        <Autocomplete
          defaultValue={''}
          options={locationData()}
          size={'small'}
          sx={{ width: 130, marginRight: 0 }}
          renderInput={(params) => <TextField {...params} label="Địa điểm" />}
          onInputChange={(event, value) => { handleChangeSearchObject('city', value) }} />

        <button onClick={() => { onHandleSearch() }} className='btn-search bg-[#50d71e]'><i className="fa-solid fa-magnifying-glass mr-1"></i>Search</button>
        {/* <button onClick={() => { onHandleClear() }} className='btn-search bg-[#f3483b]'>Clear<i className="fa-solid fa-xmark ml-1"></i></button> */}
      </div>
      {searchError && <div className='search-error'>Không tìm thấy việc làm phù hợp với yêu cầu tìm kiếm của bạn</div>}
      {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <RecruitmentList listRecruitment={listRecruitment} />}

      <div className='pagination-container'>
        <Stack spacing={2}>
          <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
        </Stack>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
