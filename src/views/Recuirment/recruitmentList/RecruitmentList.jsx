import React, { useState, useEffect } from 'react'
import './RecruitmentList.scss'
import { getAllRecruimentRequest } from '../../../apis/recruimentRequestApi'
import ReactLoading from 'react-loading'
import { Link, useNavigate } from 'react-router-dom'


const RecruitmentList = () => {

  const [listRecruitment, setListRecruitment] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();

  const onHandleSearch = () => {
    navigate('/#/search')
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const response = await getAllRecruimentRequest(0, 10);
      if (response) {
        setListRecruitment(response.data)
        console.log(response.data);
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])

  if(isLoading) return <ReactLoading className='mx-auto my-5' type='spinningBubbles' color='#bfbfbf' />

  return (
    <React.Fragment>    
      <div className='search-container'>
        <form>
        <div>
          <select>
            <option>Fulltime</option>
            <option>Parttime</option>
            <option>Intern</option>
          </select>
        </div>
        <div>indistry</div>
        <div>job title</div>
        <div>job level</div>
        <div>experience</div>
        <div>salary</div>
       <button onClick={() => {onHandleSearch()}}>Search</button>
        <button>Clear</button>
        </form>
      </div>

      {/* <div className='recruitment-container grid grid-cols-4 gap-4 p-4'>
        {listRecruitment.map((item, id) => (
          <Link to={`/recruitment-detail/${item.id}`} target={'_blank'} key={id} >
            <div className='recruiment-item'>
              <div className='recruiment-item__typeOfWork'>{item.position.name}</div>
              <div>Industry: {item.industry}</div>
              <div>Expiried Date: {item.expiryDate}</div>
            </div>
          </Link>
        ))}
      </div> */}
    
    </React.Fragment >
  )
}

export default RecruitmentList