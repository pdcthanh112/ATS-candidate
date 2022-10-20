import React, { useState, useEffect } from 'react'
import './Dashboard.scss'
import { getAllRecruimentRequest, getSearchCategory, searchRecruimentRequest } from '../../apis/recruimentRequestApi';
import RecruitmentList from '../Recuirment/recruitmentList/RecruitmentList';
import ReactLoading from 'react-loading'
import { Pagination, Stack, TextField, Autocomplete } from '@mui/material';
import { typeOfWorkData, jobLevelData, experienceData, salaryData, locationData } from '../../utils/dropdownData';

const Dashboard = () => {

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchDataCategory, setSearchDataCategory] = useState();
  const [searchObject, setSearchObject] = useState({ experience: "", industry: "", jobLevel: "", jobTitle: "", location: "", salary: "", typeOfWork: "" });
  const [searchError, setSearchError] = useState(false)
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

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
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getSearchCategory();
      if (response) {
        setSearchDataCategory(response.data)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  const handleChangeSearchObject = (id, value) => {
    setSearchObject(() => ({
      ...searchObject,
      [id]: value
    }))
  }

  const onHandleSearch = () => {
    searchRecruimentRequest(searchObject).then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        setListRecruitment(response.data)
        setSearchError(false)
      } else {
        setSearchError(true)
        setPagination({ ...pagination, currentPage: 1 })
      }
    })
  };


  if (isLoading) return <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' />

  return (
    <React.Fragment>
      <div className="search-container">

        <Autocomplete
          blurOnSelect={true}
          options={typeOfWorkData()}
          size={'small'}
          sx={{ width: 170, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Loại công việc" />}
          onChange={(event, value) => { handleChangeSearchObject('typeOfWork', value.value) }} />

        <Autocomplete
          blurOnSelect={true}
          options={jobLevelData()}
          size={'small'}
          sx={{ width: 125, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Vị trí" />}
          onChange={(event, value) => { handleChangeSearchObject('jobLevel', value.value) }} />

        <Autocomplete
          blurOnSelect={true}
          options={searchDataCategory.industry}
          size={'small'}
          sx={{ width: 170, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Industry" />}
          onChange={(event, value) => { handleChangeSearchObject('industry', value.value) }} />

        <Autocomplete
          blurOnSelect={true}
          options={searchDataCategory.jobTitle}
          size={'small'}
          sx={{ width: 200, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="jobTitle" />}
          onChange={(event, value) => { handleChangeSearchObject('jobTitle', value.value) }} />

        <Autocomplete
          blurOnSelect={true}
          options={experienceData()}
          size={'small'}
          sx={{ width: 145, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Kinh nghiệm" />}
          onChange={(event, value) => { handleChangeSearchObject('experience', value.value) }} />

        <Autocomplete
          blurOnSelect={true}
          options={salaryData()}
          size={'small'}
          sx={{ width: 200, marginRight: 2 }}
          renderInput={(params) => <TextField {...params} label="Mức lương" />}
          onChange={(event, value) => { handleChangeSearchObject('salary', value.value) }} />

        <Autocomplete
          blurOnSelect={true}
          options={locationData()}
          size={'small'}
          sx={{ width: 130, marginRight: 0 }}
          renderInput={(params) => <TextField {...params} label="Địa điểm" />}
          onChange={(event, value) => { handleChangeSearchObject('location', value.value) }} />

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
