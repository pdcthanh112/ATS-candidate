import React from 'react'
import './AboutUsPage.scss'

import CEOImage from '../../assets/image/MS-Khương.png'
import PhuongPhapLuan from '../../assets/image/luan.png'

const AboutUsPage = () => {
  return (
    <React.Fragment>
      <div className='bg-[#FFF] flex justify-center py-4 text-[#116835] font-semibold text-4xl'>Về chúng tôi</div>
      <div className='w-[65%] mx-auto'>
        <div className='aboutUs-title'>
          <div style={{ borderBottom: '1px solid #00000060', width: '35%' }}></div>
          <span className='text-[#116835] font-semibold text-3xl'>CHÚNG TÔI LÀ AI</span>
          <div style={{ borderBottom: '1px solid #00000060', width: '35%' }}></div>
        </div>
        <div className='mt-3'>
          Vai trò của công tác quản trị nguồn nhân lực, ngày càng quan trọng bởi sự cạnh tranh diễn ra ngày càng gay gắt và nguồn nhân lực chính là yếu tố chiến lược hàng đầu
          tạo nên lợi thế cạnh tranh cho các doanh nghiệp. Doanh nghiệp có qui mô các lớn thì công tác quản trị nguồn nhân lực càng gặp nhiều khó khăn,
          từ việc tuyển dụng đủ nhân lực đáp ứng nhu cầu kinh doanh, nhu cầu mở rộng đến việc quản lí nhân sự hiệu quả, tiết kiệm thời gian, chi phí và nguồn lực,
          kiến tạo môi trường làm việc chuyên nghiệp, xây dựng niềm tin – niềm tự hào từ đó tăng cường sự gắn bó đối với người lao động.<br /><br />

          <b>CK HR CONSULTING</b> đã được ra đời với sứ mệnh góp phần hỗ trợ các doanh nghiệp tháo gỡ khó khăn, giảm tải khối lượng công việc và nâng cao hiệu quả của công tác
          quản trị nguồn nhân lực. Với đội ngũ các chuyên gia giàu kinh nghiệm và làm việc bằng sự tận tâm, chúng tôi chính là đối tác đáng tin cậy của doanh nghiệp.
        </div>
      </div>
      <div className='mt-3 py-10 bg-[#FFF]'>
        <div className='flex justify-center w-[65%] mx-auto'>
          <div className='w-[35%] mt-10'>
            <img src={CEOImage} alt='' width={'90%'} className='flex justify-center' />
            <div className='justify-center'>
              <div className='justify-center flex text-[#116835] font-semibold text-xl'>ThS. TRẦN THỊ MINH KHƯƠNG</div>
              <div className='justify-center flex font-medium text-xl'>Giám đốc điều hành</div>
            </div>
          </div>
          <div className='w-[65%] mt-3'>
            <span>Người sáng lập cũng là Giám đốc điều hành CK HR Consulting là Bà Trần Thị Minh Khương. Bà Khương tốt nghiệp
              Thạc sỹ chuyên ngành Tài chính – Ngân hàng tại Đại học Khoa học ứng dụng Tây Bắc Thụy Sĩ.</span><br /><br />
            <span>Bà Khương có hơn 10 năm công tác trong ngành Tài Chính – Ngân hàng và từ năm 2012 Bà bắt đầu phát triển
              con đường sự nghiệp của mình trong lĩnh vực cung cấp nguồn nhân lực cấp cao tại Tập đoàn đa quốc gia đến
              từ Thụy Sĩ. Hơn 08 năm qua, Bà Khương đã xây dựng mạng lưới rộng lớn trong cộng đồng nguồn nhân lực cấp cao.
              Với nền tảng kiến thức vững chắc và tư duy dịch vụ khách hàng, Bà Khương được giới nhân sự trong nước biết
              đến là một CEO trẻ, đam mê, nhiệt huyết và đầy bản lĩnh. Trước khi thành lập CK HR Consulting, Bà Khương là
              cổ đông và giữ chức vụ phó Tổng Giám Đốc tại Công ty cổ phần đào tạo Việt Thành Công, nơi đó Bà là người
              sáng lập và điều hành mảng dịch vụ nhân sự.</span><br /><br />
            <span>Một nhà lãnh đạo thực thụ với sự nhạy bén, sắc sảo trong kinh doanh, Bà Khương đã giúp nhiều doanh nghiệp
              tìm kiếm được nguồn nhân lực chất lượng cao và các ứng viên đạt được những mục tiêu nghề nghiệp nhất định.</span><br /><br />
            <span>Tháng 9 năm 2018, Bà Khương thành lập CK HR Consulting sau hơn 02 năm ấp ủ và chuẩn bị cho một kế hoạch.</span><br /><br />
            <span>Dưới sự lãnh đạo của Bà Khương, đội ngũ nhân viên CKers đã ngày càng tăng trưởng cả về số lượng lẫn
              chất lượng nhân viên. Hiện nay, chỉ sau vỏn vẹn 02 năm thành lập nhưng CK HR Consulting đã đạt được những kết quả
              hết sức ấn tượng: Cung cấp dịch vụ cho hàng trăm khách hàng đa lĩnh vực, tiếp nhận hơn 1000 vị trí tuyển dụng
              trong đó kết nối thành công công việc cho hơn 500 ứng viên.</span></div>
        </div>
      </div>
      <div className='w-[65%] mx-auto'>
        <div className='aboutUs-title'>
          <div style={{ borderBottom: '1px solid #00000060', width: '33%' }}></div>
          <span className='text-[#116835] font-semibold text-3xl'>PHƯƠNG PHÁP LUẬN</span>
          <div style={{ borderBottom: '1px solid #00000060', width: '33%' }}></div>
        </div>
        <div className='mt-3'>
          <span>Chúng tôi cung cấp các giải pháp thiết yếu được thiết kế riêng dành cho mỗi khách hàng theo nhu cầu,
            căn cứ vào <span className='font-medium'>lĩnh vực kinh doanh, sự kỳ vọng, tiêu chí đánh giá và văn hoá
              tổ chức.</span> Do đó, chúng tôi nhận thức và hiểu rõ được tầm quan trọng của yếu tố nhân sự đối
            với một tổ chức là như thế nào. Nếu một doanh nghiệp mà không nắm trong tay những nhân tài phù hợp
            thì công ty sẽ khó có thể hoạt động một cách hiệu quả và đạt được những mục tiêu mang tính chiến lược
            được đề ra. Trong thời điểm hiện tại, Việc định vị và tìm kiếm những tài năng phù hợp đối với doanh
            nghiệp dường như luôn là một thách thức khó khăn và CK HR Consulting thấu hiểu được điều đó. Vậy
            nên chúng tôi sẽ mang đến những giải pháp tuyển dụng chuyên môn một cách chuyên nghiệp nhất để giúp
            các doanh nghiệp giải quyết những vấn đề này.</span><br /><br />
          <span>Các nguồn lực, kinh nghiệm ngành nghề, phương pháp và sự hiểu biết về thị trường nội địa của CK HR Consulting
            sẽ giúp khách hàng tìm ra được những nhân tài tốt nhất, phù hợp nhất để đưa việc kinh doanh của
            công ty khách hàng tiến về phía trước.</span>
        </div>
        <div className='font-medium'>Sơ đồ phương pháp luận:</div>
        <img src={PhuongPhapLuan} alt="" />
        <div className='grid grid-cols-2'>
          <div className='px-3'>
            <div className='justify-center flex text-[#116835] font-semibold text-xl mb-2'>THẤU HIỂU KHÁCH HÀNG:</div>
            <div><span className='font-medium text-[#116835]'>Lĩnh vực Kinh doanh: </span>Một trong những điều kiện tiên quyết để tìm kiếm và chọn lọc ứng viên là sự am hiểu về lĩnh vực kinh doanh của khách hàng. Có như vậy, chúng tôi mới có thể tuyển chọn những ứng viên tiềm năng nhất.</div><br/>
            <div><span className='font-medium text-[#116835]'>Tiêu chí đánh giá: </span>Mỗi nhà tuyển dụng có những tiêu chí, khẩu vị tuyển dụng riêng, chúng tôi xem trọng việc tìm hiểu tiêu chí đánh giá để tiết kiệm thời gian cho khách hàng trong việc tìm kiếm nhân tài.</div><br/>
            <div><span className='font-medium text-[#116835]'>Kì vọng: </span>Việc hiểu được kỳ vọng hay mong đợi của nhà tuyển dụng, giúp chúng tôi chọn lọc được những tài năng mà có thể đóng góp cho mục tiêu của doanh nghiệp.</div><br/>
            <div><span className='font-medium text-[#116835]'>Văn hóa tổ chức: </span>Việc tìm hiểu đặc thù về văn hoá tổ chức của mỗi doanh nghiệp giúp chúng tôi tìm kiếm được những ứng viên phù hợp nhất và gắn bó lâu dài với tổ chức.</div><br/>
          </div>
          <div className='px-3'>
            <div className='justify-center flex text-[#116835] font-semibold text-xl mb-2'>THẤU HIỂU ỨNG VIÊN:</div>
            <div><span className='font-medium text-[#116835]'>Tính cách, thái độ: </span>Việc tìm hiểu tính cách, thái độ, động lực ứng tuyển của ứng viên thông qua việc phỏng vấn trực tiếp giúp chúng tôi sàng lọc và chọn ra những ứng cử viên phù hợp.</div><br/>
            <div><span className='font-medium text-[#116835]'>Kỹ năng: </span>Chúng tôi xây dựng mục tiêu của buổi phỏng vấn theo từng vị trí tuyển dụng để có những kịch bản/câu hỏi nhằm phát hiện và đánh giá được các kỹ năng cần thiết theo tiêu chí tuyển dụng của các vị trí.</div><br/>
            <div><span className='font-medium text-[#116835]'>Kiến thức chuyên môn: </span>Đội ngũ tư vấn viên tuyển dụng tại CK HR Consulting luôn được đào tạo, cập nhật thông tin về thị trường để có đủ năng lực đánh giá kiến thức chuyên môn theo đúng yêu cầu của vị trí tuyển dụng.</div><br/>
            <div><span className='font-medium text-[#116835]'>Kì vọng: </span>CK HR Consulting luôn xác định tầm quan trọng trong việc tìm hiểu kỳ vọng của ứng viên, giúp chúng tôi tìm kiếm những ứng viên phù hợp và gắn bó lâu dài với khách hàng.</div><br/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AboutUsPage