import React from 'react'
import './ContactUsPage.scss'
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api'
import { useMemo } from 'react'
import LocationIcon from '../../assets/icon/location.png'
import BuildingIcon from '../../assets/icon/office-building.png'
import PhoneIcon from '../../assets/icon/telephone.png'
import EmailIcon from '../../assets/icon/email.png'
import WebsiteIcon from '../../assets/icon/world-wide-web.png'

import facebookLogo from "../../assets/image/facebook-logo.png"
import linkinLogo from "../../assets/image/linkin-logo.png"
import twitterLogo from "../../assets/image/twitter-logo.png"
import instagramLogo from "../../assets/image/instagram-logo.png"
import youtubeLogo from "../../assets/image/youtube-logo.png"

const ContactUsPage = () => {

  //const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_API_URL})
  const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyARSg5UKCm1D242xUn8QCX5LpjsIoCm28o' })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <React.Fragment>
      <div className='contactUs-title'>LIÊN HỆ CK HR CONSULTING</div>
      <div className='grid grid-cols-2'>
        <div className='flex justify-center'><Map /></div>
        <div>
          <div className='flex my-3'>
            <img src={LocationIcon} alt="" width={'30rem'} />
            <span className='ml-3'>TRỤ SỞ: Tầng trệt, Toà nhà Rosana, 60 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, Tp.HCM, Việt Nam</span>
          </div>
          <div className='flex my-3'>
            <img src={BuildingIcon} alt="" width={'30rem'} />
            <span className='ml-3'>VĂN PHÒNG: TTTM Cao Thắng, Tầng 8, số 19, Phường 2, Quận 3, Tp. HCM, Việt Nam.</span>
          </div>
          <div className='flex my-3'>
            <img src={PhoneIcon} alt="" width={'30rem'} />
            <span className='ml-3'>Điện thoại: (+8428) 7106 8279</span>
          </div>
          <div className='flex my-3'>
            <img src={EmailIcon} alt="" width={'30rem'} />
            <span className='ml-3'>Email: info@ckhrconsulting.vn</span>
          </div>
          <div className='flex my-3'>
            <img src={WebsiteIcon} alt="" width={'30rem'} />
            <span className='ml-3'>Website: <a href='https://ckhrconsulting.vn/vi/'>ckhrconsulting.vn</a></span>
          </div>
        </div>
      </div>
      <div>
        <div className='contactUs-title'>KẾT NỐI CÙNG CHÚNG TÔI</div>
        <div className='flex justify-center mb-5'>
          <a href='https://www.facebook.com/CKHRConsulting4.0/'><img src={facebookLogo} alt='linkin' title='Facebook' className='mx-3 rounded-lg' width='40rem' /></a>
          <a href='https://www.linkedin.com/company/ckhrconsulting/?viewAsMember=true'><img src={linkinLogo} alt='facebook' title='LinkIn' className='mx-3 rounded-lg' width='40rem' /></a>
          <a href='https://twitter.com/ckhrconsulting?s=20'><img src={twitterLogo} alt='twitter' title='Twitter' className='mx-3 rounded-lg' width='40rem' /></a>
          <a href='https://www.instagram.com/ckhrconsultingmkt/'><img src={instagramLogo} alt='instagram' title='Instagram' className='mx-3 rounded-lg' width='40rem' /></a>
          <a href='https://www.youtube.com/channel/UCSOOfAOfpondCDHD3kJFWsg'><img src={youtubeLogo} alt='youtube' title='Youtube' className='mx-3 rounded-lg' width='50rem' /></a>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ContactUsPage

function Map() {

  const center = useMemo(() => ({ lat: 10.78893790666693, lng: 106.69969237668658 }), [])

  return <GoogleMap zoom={10} center={center} mapContainerClassName='map-container'>
    <MarkerF position={{ center }} />
    <Marker position={{ center }} />
  </GoogleMap>
}