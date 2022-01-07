import React,{useState, useEffect} from "react";
import * as bootstrap from "bootstrap";
import _ from 'lodash';

const getData = async (folder,name) =>{
    return await fetch('./data/'+folder+name+'.json')
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
            setmainData(obj);
        }
        call();
    },[]);
    const {TinhThanh,DV_PB,DauHieu,DichTe,DiaDiem} = mainData;

    useEffect(() => {
        console.log(mainData);
    }, [mainData]);

    const handleChangeDV_PB = (e) =>{
        setDonViPB(e.target.value);
    }

    useEffect(()=>{
        _.isEmpty(DV_PB) ? console.log(DV_PB) : setDonViPB(Object.keys(DV_PB)[0]);
    },[DV_PB]);

    const submit = () => {

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
                            <label htmlFor="SoDienThoai" className="form-label"><span style={{"color":"red"}}>*</span> Số điện thoại</label>
                            <input type="text" id="SoDienThoai" className="form-control" placeholder="Nhập số điện thoại" required/>
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <label htmlFor="HoTen" className="form-label"><span style={{"color":"red"}}>*</span> Họ và tên</label>
                                    <input type="text" id="HoTen" className="form-control" placeholder="Họ và tên" required/>
                                </div>
                                <div className="col-md-6 pt-3">
                                    <label htmlFor="Email" className="form-label"><span style={{"color":"red"}}>*</span> Email</label>
                                    <input type="text" id="Email" className="form-control" placeholder="Email..." required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <label htmlFor="DonVi" className="form-label"><span style={{"color":"red"}}>*</span> Đơn vị</label>
                                    <select id="DonVi" className="form-select" required onChange={handleChangeDV_PB}>
                                        {_.isEmpty(DV_PB) ? null : Object.keys(DV_PB).map(dv => (
                                            <option value={dv}>{dv}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 pt-3">
                                    <label htmlFor="PhongBan" className="form-label"><span style={{"color":"red"}}>*</span> Phòng ban</label>
                                    <select id="PhongBan" className="form-select" required>
                                        {_.isEmpty(DV_PB) || _.isEmpty(DonViPB) ? null : DV_PB[DonViPB].map(pb => (
                                            <option value={pb}>{pb}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <label htmlFor="NamSinh" className="form-label"><span style={{"color":"red"}}>*</span> Năm sinh</label>
                                    <input type="text" id="NamSinh" className="form-control" placeholder="Năm sinh" required/>
                                </div>
                                <div className="col-md-6 pt-3">
                                    <label htmlFor="GioiTinh" className="form-label"><span style={{"color":"red"}}>*</span> Giới tính</label>
                                    <select id="GioiTinh" className="form-select" required>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Giới tính khác">Giới tính khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Chổ ở hiện tại:</span></p>
                                <div className="col-md-3 pt-2">
                                    <label htmlFor="DiaChi" className="form-label"><span style={{"color":"red"}}>*</span> Địa chỉ:</label>
                                    <input type="text" id="DiaChi" className="form-control" placeholder="Số nhà, tên đường, ấp, tổ, khu phố..." required/>
                                </div>
                                <div className="col-md-3 pt-2">
                                    <label htmlFor="TinhThanh" className="form-label"><span style={{"color":"red"}}>*</span> Tỉnh thành</label>
                                    <select id="TinhThanh" className="form-select" required onChange={(e) => getData("quan-huyen/",e.target.value).then(valu => setQuanHuyen(valu))}>
                                        <option value="" disabled selected hidden>Tỉnh thành</option>
                                        {_.isEmpty(TinhThanh) ? <></> : TinhThanh.map((tt) => (
                                                <option value={tt.code}>{tt.name_with_type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 pt-2">
                                    <label htmlFor="TinhThanh" className="form-label"><span style={{"color":"red"}}>*</span> Quận huyện</label>
                                    <select id="TinhThanh" className="form-select" disabled={_.isEmpty(QuanHuyen)} required onChange={(e)=> getData("xa-phuong/",e.target.value).then(valu => setXaPhuong(valu))}>
                                        <option value="" disabled selected hidden>Quận huyện</option>
                                        {_.isEmpty(QuanHuyen) ? <></> : QuanHuyen.map(qh => (
                                            <option value={qh.code}>{qh.name_with_type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-3 pt-2">
                                    <label htmlFor="TinhThanh" className="form-label"><span style={{"color":"red"}}>*</span> Xã phường</label>
                                    <select id="TinhThanh" className="form-select" disabled={_.isEmpty(XaPhuong)} required>
                                        <option value="" disabled selected hidden>Xã phường</option>
                                        {_.isEmpty(XaPhuong) ? <></> : XaPhuong.map(xp => (
                                            <option value={xp.path_with_type}>{xp.name_with_type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <p className="pt-3"><span style={{"color":"red"}}>*</span> Hình thức làm việc</p>
                            <div className="row" style={{"margin":"0"}}>
                                <div className="form-check col-md-2">
                                    <input class="form-check-input" type="radio" name="HinhThucLamViec" id="Khach" value="Khách"/>
                                    <label class="form-check-label" for="Khach">Khách</label>
                                </div>
                                <div className="form-check col-md-2">
                                    <input class="form-check-input" type="radio" name="HinhThucLamViec" id="TrucTiep" value="Trực Tiếp" />
                                    <label class="form-check-label" for="TrucTiep">Trực tiếp</label>
                                </div>
                                <div className="form-check col-md-2">
                                    <input class="form-check-input" type="radio" name="HinhThucLamViec" id="TrucTaiCoSo" value="Trực tại Cơ Sở" />
                                    <label class="form-check-label" for="TrucTaiCoSo">Trực tại Cơ sở</label>
                                </div>
                                <div className="form-check col-md-2">
                                    <input class="form-check-input" type="radio" name="HinhThucLamViec" id="WFH" value="WFH" />
                                    <label class="form-check-label" for="WFH">WFH</label>
                                </div>
                                <div className="form-check col-md-2">
                                    <input class="form-check-input" type="radio" name="HinhThucLamViec" id="DayOnline" value="Dạy Online" />
                                    <label class="form-check-label" for="DayOnline">Dạy Online</label>
                                </div>
                                <div className="form-check col-md-2">
                                    <input class="form-check-input" type="radio" name="HinhThucLamViec" id="NghiKhongLuong" value="Nghỉ không lương" />
                                    <label class="form-check-label" for="NghiKhongLuong">Nghỉ không lương</label>
                                </div>
                            </div>
                            <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Các biểu hiện lâm sàng</span></p>
                            <table class="table table-striped table-hover table-bordered table-sm align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Có</th>
                                        <th scope="col">Không</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_.isEmpty(DauHieu)?<></>:DauHieu.map(dt => (
                                        <tr>
                                            <td>
                                                <p className="pt-3"><span style={{"color":"red"}}>*</span> {dt.name}</p>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.co} />
                                                    <label class="form-check-label" for={dt.key}>Có</label>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.khong} checked/>
                                                    <label class="form-check-label" for={dt.key}>Không</label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Tiền sử dịch tễ: Trong vòng 07 ngày qua, quý Thầy, Cô, Anh, Chị:</span></p>
                            <table class="table table-striped table-hover table-bordered table-sm align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Có</th>
                                        <th scope="col">Không</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_.isEmpty(DichTe)?<></>:DichTe.map(dt => (
                                        <tr>
                                            <td className="w-50">
                                                <p className="pt-3"><span style={{"color":"red"}}>*</span> {dt.name}</p>
                                            </td>
                                            <td>
                                                {(dt.type === "date" || dt.type == "text")?
                                                <input class="form-control" type={dt.type} name={dt.name} id={dt.key} placeholder={dt.placeholder} />:
                                                (dt.type === "multiRadio")?
                                                dt.co.map(tmp => (
                                                    <div className="form-check">
                                                        <label class="form-check-label" for={dt.key}>{tmp}</label>
                                                        <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={tmp} />
                                                    </div>
                                                )):
                                                <>
                                                    <div className="form-check">
                                                        <label class="form-check-label" for={dt.key}>Có</label>
                                                        <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.co} />
                                                    </div>
                                                </>}
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.khong} checked/>
                                                    <label class="form-check-label" for={dt.key}>Không</label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Địa điểm nơi ở:</span></p>
                            <table class="table table-striped table-hover table-bordered table-sm align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col"> </th>
                                        <th scope="col">Có</th>
                                        <th scope="col">Không</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {_.isEmpty(DiaDiem)?<></>:DiaDiem.map(dt => (
                                        <tr>
                                            <td className="w-50">
                                                <p className="pt-3"><span style={{"color":"red"}}>*</span> {dt.name}</p>
                                            </td>
                                            <td>
                                                {(dt.type === "multiRadio")?
                                                dt.co.map(tmp => (
                                                    <div className="form-check">
                                                        <label class="form-check-label" for={dt.key}>{tmp}</label>
                                                        <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={tmp} />
                                                    </div>
                                                )):
                                                <>
                                                    <div className="form-check">
                                                        <label class="form-check-label" for={dt.key}>Có</label>
                                                        <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.co} />
                                                    </div>
                                                </>}
                                            </td>
                                            <td>
                                                <div className="form-check">
                                                    <input class="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.khong} checked/>
                                                    <label class="form-check-label" for={dt.key}>Không</label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <input className="form-control" placeholder="Vui lòng cung cấp thêm chi tiết thông tin về triệu chứng, dịch tễ lịch sử di chuyển (Nếu có)"></input>
                            <input type="submit" className="btn btn-primary mt-3 container" value="Gửi" />
                        </form>
                    </div>
                </div>
                <div className="text-center pt-4 pb-3">
                    <p>Copyright 2021 © HungHau Holdings</p>
                </div>
            </div>
        </>
    );
}
export default Index;