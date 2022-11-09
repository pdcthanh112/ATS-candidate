import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getAppliedJobByCandidateId } from '../../../apis/jobApplyApi';
import './AppliedJob.scss'
import { Pagination, Stack } from '@mui/material';

const AppliedJob = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser)

  const [listAppliedJob, setListAppliedJob] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ totalPage: 0, currentPage: 1 })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAppliedJobByCandidateId(currentUser.token, currentUser.candidate.id, pagination.currentPage - 1, 4);
      if (response) {
        setPagination({ ...pagination, totalPage: response.data.totalPage })
        setListAppliedJob(response.data.responseList)
        setIsLoading(false)
        console.log(listAppliedJob);
      }
    }
    fetchData();
  }, [pagination.currentPage])

  return (
    <React.Fragment>
      <div className='appliedJob-container'>
        <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Việc làm đã ứng tuyển</div>
        <div className='appliedJob-content'>
          {listAppliedJob.map((item, id) => (
            <div key={id} className='appliedJob-content_item'>
              <div>{item.recruitmentRequest.position.name}</div>
              <span>Ngày ứng tuyển: </span>{item.date}
            </div>
          ))}
        </div>
      </div>
      <div className=''>
        <Stack spacing={2}>
          <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
        </Stack>
      </div>
    </React.Fragment>
  )
}

export default AppliedJob