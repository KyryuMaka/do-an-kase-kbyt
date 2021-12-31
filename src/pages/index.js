import React,{useState, useEffect} from "react";
import * as bootstrap from "bootstrap";
import _ from 'lodash';

const getData = async (folder,name) =>{
    return await fetch('data/'+folder+name+'.json')
    .then(response => response.json())
    .then(data => {return data});
}


function Index(props){
    const [mainData, setmainData] = useState({TinhThanh:null,DV_PB:null,DauHieu:null,DichTe:null})
    const [XaPhuong, setXaPhuong] = useState()
    const [QuanHuyen, setQuanHuyen] = useState()
    const [DonViPB, setDonViPB] = useState()
    const [DauHieuSelect, setDauHieu] = useState([])
    const [ModalCompleted, setModalCompleted] = useState(null)

    useEffect(() => {
        async function call(){
            let obj = {};
            await getData("","tinh_tp").then(TinhThanh => obj["TinhThanh"] = TinhThanh);
            await getData("","donvi_phongban").then(DV_PB => obj["DV_PB"] = DV_PB);
            await getData("","dauhieu").then(DauHieu => obj["DauHieu"] = DauHieu);
            await getData("","dichte").then(DichTe => obj["DichTe"] = DichTe);
            await getData("","diadiem").then(DiaDiem => obj["DiaDiem"] = DiaDiem);
            await getData("","dichvu").then(DichVu => obj["DichVu"] = DichVu);
            obj["TinhThanh_TT"]=obj.TinhThanh
            setmainData(obj);
        }
        call();
    },[]);
    const {TinhThanh,DV_PB,DauHieu,DichTe,DichVu,DiaDiem} = mainData;

    useEffect(() => {
        console.log(mainData);
    }, [mainData]);

    const handleChangeDV_PB = (e) =>{
        setDonViPB(e.target.value);
    }

    return(
        <>
            <nav className="navbar navbar-light bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="./favicon.ico" alt="" height="40" />
                    </a>
                </div>
            </nav>
            <div style={{"backgroundColor":"#f0f2f5"}}>
                <div className="container text-center pt-3">
                    <h4 className="pb-5" style={{"color": "rgb(17, 121, 190)", "fontSize":"20px"}}>KHAI BÁO Y TẾ</h4>
                    <p className="fw-bold" style={{"fontSize": "14px"}}>
                        (Khuyến cáo: khai báo thông tin sai là vi phạm quy định của Công ty và vi phạm pháp luật Việt Nam, 
                        có thể bị chế tài và xử lý kỷ luật và cao hơn là có thể xử lý trách nhiệm hình sự)
                    </p>
                </div>
                <div className="container pb-5" style={{"backgroundColor":"white", "fontSize": "14px"}}>
                    <div className="ps-3 pe-3">
                        <div className="pb-3 pt-3 lh-sm">
                            <p><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Yêu cầu:</span></p>
                            <p>- Toàn thể CBNV bắt buộc phải cài đặt ứng dụng BlueZone.</p>
                            <p>- Từ tuần này, sẽ có thêm các trường thông tin về người thân; Quý Thầy Cô, Anh Chị vui lòng khai báo chính xác như thông tin bên dưới</p>
                            <p>- Với tinh thần trách nhiệm người Hùng Hậu, quý Thầy, Cô, Anh, Chị có vui lòng khai báo trung thực các nội dung sau:</p>
                        </div>
                        <form>
                            <label for="SoDienThoai" class="form-label"><span style={{"color":"red"}}>*</span> Số điện thoại</label>
                            <input type="text" id="SoDienThoai" class="form-control" placeholder="Nhập số điện thoại" required/>
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <label for="HoTen" class="form-label"><span style={{"color":"red"}}>*</span> Họ và tên</label>
                                    <input type="text" id="HoTen" class="form-control" placeholder="Họ và tên" required/>
                                </div>
                                <div className="col-md-6 pt-3">
                                    <label for="Email" class="form-label"><span style={{"color":"red"}}>*</span> Email</label>
                                    <input type="text" id="Email" class="form-control" placeholder="Email..." required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <label for="DonVi" class="form-label"><span style={{"color":"red"}}>*</span> Đơn vị</label>
                                    <select id="DonVi" class="form-select" required onChange={handleChangeDV_PB}>
                                        {_.isEmpty(DV_PB) ? null : Object.keys(DV_PB).map(dv => (
                                            <option key={dv}>{dv}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 pt-3">
                                    <label for="PhongBan" class="form-label"><span style={{"color":"red"}}>*</span> Phòng ban</label>
                                    <select id="PhongBan" class="form-select" required>
                                        {_.isEmpty(DV_PB) || _.isEmpty(DonViPB) ? null : DV_PB[DonViPB].map(pb => (
                                            <option key={pb}>{pb}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <label for="NamSinh" class="form-label"><span style={{"color":"red"}}>*</span> Năm sinh</label>
                                    <input type="text" id="NamSinh" class="form-control" placeholder="Năm sinh" required/>
                                </div>
                                <div className="col-md-6 pt-3">
                                    <label for="GioiTinh" class="form-label"><span style={{"color":"red"}}>*</span> Giới tính</label>
                                    <select id="GioiTinh" class="form-select" required>
                                        <option key="Nam">Nam</option>
                                        <option key="Nữ">Nữ</option>
                                        <option key="Giới tính khác">Giới tính khác</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Index;