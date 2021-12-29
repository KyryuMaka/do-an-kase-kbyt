import React from "react";
import * as bootstrap from "bootstrap";

function Index(props){
    return(
        <>
            <nav className="navbar navbar-light bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="./favicon.ico" alt="" height="40" />
                    </a>
                </div>
            </nav>
            <div className="bg-light">
                <div className="container text-center pt-3">
                    <h4 style={{"color": "rgb(17, 121, 190)"}}>KHAI BÁO Y TẾ</h4>
                    <h4>   </h4>
                    <p>
                        (Khuyến cáo: khai báo thông tin sai là vi phạm quy định của Công ty và vi phạm pháp luật Việt Nam, 
                        có thể bị chế tài và xử lý kỷ luật và cao hơn là có thể xử lý trách nhiệm hình sự)
                    </p>
                </div>
                <div className="container" style={{"backgroundColor":"white"}}>
                    <div className="pb-2">
                        <p>* Yêu cầu:<br />
                        - Toàn thể CBNV bắt buộc phải cài đặt ứng dụng BlueZone.<br />
                        - Từ tuần này, sẽ có thêm các trường thông tin về người thân; Quý Thầy Cô, Anh Chị vui lòng khai báo chính xác như thông tin bên dưới<br />
                        - Với tinh thần trách nhiệm người Hùng Hậu, quý Thầy, Cô, Anh, Chị có vui lòng khai báo trung thực các nội dung sau:</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Index;