import React, { useState, useEffect } from 'react'
import './Dashboard.scss'
import { getAllRecruimentRequest, getSearchCategory, searchRecruimentRequest } from '../../apis/recruimentRequestApi';
import RecruitmentList from '../Recuirment/recruitmentList/RecruitmentList';
import ReactLoading from 'react-loading'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Dashboard = () => {

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchDataCategory, setSearchDataCategory] = useState();
  const [searchObject, setSearchObject] = useState({
    experience: "",
    industry: "",
    jobLevel: "",
    jobTitle: "",
    location: "",
    salary: "",
    typeOfWork: ""
  });
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

  const handleChangeSearchObject = (id, event) => {
    setSearchObject(() => ({
      ...searchObject,
      [id]: event.target.value
    }))
  }

  const onHandleSearch = () => {
    searchRecruimentRequest(searchObject).then((response) => {
      console.log('search', response.data);
      setListRecruitment(response.data)
    })
  };


  if (isLoading) return <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' />

  return (
    <React.Fragment>
      <div className="search-container">
        <div className='search-item' style={{ width: '11%' }}>
          <select defaultValue={null} onChange={(e) => { handleChangeSearchObject('typeOfWork', e) }}>
            <option>Loại công việc</option>
            <option value={'Full Time'}>Full time</option>
            <option value={'Part tTime'}>Part time</option>
            <option value={'Intern'}>Intern</option>
            <option value={'Non-Management'}>Non-Management</option>
          </select>
        </div>

        <div className='search-item' style={{ width: '8%' }}>
          <select defaultValue={null} onChange={(e) => { handleChangeSearchObject('jobLevel', e) }}>
            <option>Vị trí</option>
            <option value={'Fresher'}>Fresher</option>
            <option value={'Junior'}>Junior</option>
            <option value={'Senior'}>Senior</option>
            <option value={'Suppervisor'}>Suppervisor</option>
          </select>
        </div>

        <div className='search-item' style={{ width: '11%' }}>
          <select defaultValue={null} onChange={(e) => { handleChangeSearchObject('industry', e) }}>
            <option>Industry</option>
            {searchDataCategory.industry.map((item, id) => (
              <option key={id} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className='search-item py-auto' style={{ width: '16%' }}>
          <select defaultValue={null} onChange={(e) => { handleChangeSearchObject('jobTitle', e) }}>
            <option>Job Title</option>
            {searchDataCategory.jobTitle.map((item, id) => (
              <option key={id} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className='search-item' style={{ width: '8%' }}>
          <select defaultValue={null} onChange={(e) => { handleChangeSearchObject('experience', e) }}>
            <option>Kinh nghiệm</option>
            <option value={'0'}>Dưới 1 năm</option>
            <option value={'1'}>1 năm</option>
            <option value={'2'}>2 năm</option>
            <option value={'3'}>3 năm</option>
            <option value={'4'}>4 năm</option>
            <option value={'5'}>5 năm</option>
            <option value={'6'}>Trên 5 năm</option>
            <option value={'7'}>Trên 7 năm</option>
            <option value={'8'}>Trên 10 năm</option>
          </select>
        </div>

        <div className='search-item' style={{ width: '12%' }}>
          <select defaultValue={null} onChange={(e) => { handleChangeSearchObject('salary', e) }}>
            <option>Mức lương</option>
            <option value={'6000'}>Trên 6.000.000 VNĐ</option>
            <option value={'8000'}>Trên 8.000.000 VNĐ</option>
            <option value={'10000'}>Trên 10.000.000 VNĐ</option>
            <option value={'15000'}>Trên 15.000.000 VNĐ</option>
            <option value={'20000'}>Trên 20.000.000 VNĐ</option>
            <option value={'30000'}>Trên 30.000.000 VNĐ</option>
            <option value={'Negotiable'}>Lương thỏa thuận</option>
          </select>
        </div>

        <button onClick={() => { onHandleSearch() }} className='btn-search bg-[#50d71e]'><i className="fa-solid fa-magnifying-glass mr-1"></i>Search</button>
        <button onClick={() => { setPagination({ ...pagination, currentPage: 1 }) }} className='btn-search bg-[#f3483b]'>Clear<i className="fa-solid fa-xmark ml-1"></i></button>
      </div>

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
