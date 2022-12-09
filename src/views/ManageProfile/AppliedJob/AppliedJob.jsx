import React, { useState, useEffect } from 'react'
import './AppliedJob.scss'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAppliedJobByCandidateId } from '../../../apis/jobApplyApi';
import { Pagination, Stack } from '@mui/material';
import ReactLoading from 'react-loading'
import moment from 'moment'

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
      }
    }
    fetchData();
  }, [pagination.currentPage])


  const showStatusLabel = (status) => {
    if (status === 'APPROVED') {
      return <span className='bg-[#C9F7F5] text-[#1BC5BD] text-sm px-2 py-1 rounded-md'>APPROVED</span>
    } else if (status === 'REJECTED') {
      return <span className='bg-[#FFE2E5] text-[#F64E60] text-sm px-2 py-1 rounded-md'>Rejected</span>
    } else {
      return <span className='bg-[#FFF4DE] text-[#FFA800] text-sm px-2 py-1 rounded-md'>Pending</span>
    }
  }

  return (
    <div className='px-4'>
      <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Việc làm đã ứng tuyển</div>
      <div className='appliedJob-content'>
        {isLoading ? <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' /> : <React.Fragment>
          {listAppliedJob.map((item, id) => (
            <Link to={`/recruitment-detail/${item.recruitmentRequest.id}`} target={'_blank'} key={id}>
              <div className='appliedJob-content_item'>
                <div className='flex justify-between'>
                  <span className='font-semibold text-xl text-[#20D489]'>{item.recruitmentRequest.position.name}</span>
                  {showStatusLabel(item.status)}
                </div>
                <div className='flex justify-between'>
                  <span><span className='font-semibold'>Lĩnh vực: </span> {item.recruitmentRequest.industry}</span>
                  <span className='opacity-50 text-xs mt-2'>Ngày ứng tuyển: {moment(item.date).format('DD/MM/YYYY')}</span>
                </div>
                <div><span className='font-semibold opacity-60'>Ngày hết hạn: </span>{moment(item.date).format('DD/MM/YYYY')}</div>
              </div>
            </Link>
          ))}
        </React.Fragment>}
        <div className='flex justify-center'>
          <Stack spacing={2}>
            <Pagination count={pagination.totalPage} onChange={(event, page) => { setPagination({ ...pagination, currentPage: page }) }} />
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default AppliedJob