import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getRecruitmentRequestByCandidateId } from '../../../apis/recruimentRequestApi';
import './AppliedJob.scss'

const AppliedJob = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser?.candidate)

  const [listAppliedJob, setListAppliedJob] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getRecruitmentRequestByCandidateId(currentUser.id);
      if (response) {
        console.log('UUUUUUU', response.data);
        setListAppliedJob(response.data)
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  return (
    <div className='change-password-container'>
      <div className="bg-white h-12 font-bold text-2xl mb-3 rounded-md pt-2 px-4">Việc làm đã ứng tuyển</div>
      <div className='appliedJob-container'>àáđà
      </div>
    </div>
  )
}

export default AppliedJob