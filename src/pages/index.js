import React,{useState, useEffect} from "react";
import * as bootstrap from "bootstrap";
import _ from 'lodash';
import QRCode from 'qrcode.react'

const getData = async (folder,name) =>{
    return await fetch('./data/'+folder+name+'.json')
    .then(response => response.json())
    .then(data => {return data});
}

function Index(props){
    const [mainData, setmainData] = useState({TinhThanh:null,DV_PB:null,DauHieu:null,DichTe:null})
    const [XaPhuong, setXaPhuong] = useState();
    const [QuanHuyen, setQuanHuyen] = useState();
    const [DonViPB, setDonViPB] = useState();
    const [DauHieuSelect, setDauHieu] = useState([]);
    const [ThongTin, setThongTin] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);

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

    const onRadioChange = e => {
        let name = e.currentTarget.name;
        let value = e.currentTarget.value;
        setDauHieu({...DauHieuSelect,[name]: value});
    };

    var tmp = Array.from(document.querySelectorAll("[gas-data=formData]"));

    const [nv, setNV] = useState();

    useEffect(() => {
        fetch("https://6166dfbd13aa1d00170a6838.mockapi.io/thong/data/DS_NV")
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true);
            setItem(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        );
    },[]);
    const findUser = async (e) => {
        const sdt = e.currentTarget.value;
        var tmp1;
        if(sdt.length === 10){
            item.map(i => {
                if(i.SoDienThoai === sdt){
                    setNV(i);
                    tmp1 = i;
                }
            })
            console.log(nv);
            await getData("","donvi_phongban").then(valu => Object.keys(valu).map(i => (i===tmp1.DonVi)?setDonViPB(tmp1.DonVi):console.log()));
            await getData("quan-huyen/",tmp1.TinhThanh).then(valu => setQuanHuyen(valu));
            await getData("xa-phuong/",tmp1.QuanHuyen).then(valu => setXaPhuong(valu));
            await tmp.map(ip => {
                // eslint-disable-next-line default-case
                switch(ip.id){
                    case "HoTen": ip.value = tmp1.HoVaTen; break;
                    case "Email": ip.value = tmp1.Email; break;
                    case "DonVi": ip.value = tmp1.DonVi; break; 
                    case "PhongBan": ip.value = tmp1.PhongBan; break; 
                    case "NamSinh": ip.value = tmp1.NamSinh; break; 
                    case "GioiTinh": ip.value = tmp1.GioiTinh; break; 
                    case "DiaChi": ip.value = tmp1.DiaChi; break; 
                    case "TinhThanh": ip.value = tmp1.TinhThanh; break; 
                    case "QuanHuyen": ip.value = tmp1.QuanHuyen; break; 
                    case "PhuongXa": ip.value = tmp1.PhuongXa; break;
                }
            })
        } 
    }

    const [date, setDate] = useState(``);

    const handleRouteSubmit = ()=>{
        const d = new Date();
        var month = d.getMonth()+1;
        console.log(date);
        setDate(`Ng??y ${d.getDate()} th??ng ${month} n??m ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`);
        console.log(date);
        const dt = {
            HoVaTen: nv.HoVaTen,
            SoDienThoai: nv.SoDienThoai,
            DonVi: nv.DonVi,
            PhongBan: nv.PhongBan,
            NamSinh: nv.NamSinh,
            GioiTinh: nv.GioiTinh,
            DiaChi: nv.DiaChi,
            PhuongXa: nv.PhuongXa,
            CreateAt: `Ng??y ${d.getDate()} th??ng ${month} n??m ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        }
        var dt1 = {...dt, DauHieuSelect}
        console.log(dt1);
        fetch("https://6166dfbd13aa1d00170a6838.mockapi.io/thong/data/DS_KBYT", {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(dt1),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    if(error){
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded){
        return <div>Loading...</div>;
    }else{
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
                        <h4 className="pb-5" style={{"color": "rgb(17, 121, 190)", "fontSize":"20px"}}>KHAI B??O Y T???</h4>
                        <p className="fw-bold" style={{"fontSize": "14px"}}>
                            (Khuy???n c??o: khai b??o th??ng tin sai l?? vi ph???m quy ?????nh c???a C??ng ty v?? vi ph???m ph??p lu???t Vi???t Nam, 
                            c?? th??? b??? ch??? t??i v?? x??? l?? k??? lu???t v?? cao h??n l?? c?? th??? x??? l?? tr??ch nhi???m h??nh s???)
                        </p>
                    </div>
                    <div className="container pb-5" style={{"backgroundColor":"white", "fontSize": "14px"}}>
                        <div className="ps-3 pe-3">
                            <div className="pb-3 pt-3 lh-sm">
                                <p><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Y??u c???u:</span></p>
                                <p>- To??n th??? CBNV b???t bu???c ph???i c??i ?????t ???ng d???ng BlueZone.</p>
                                <p>- T??? tu???n n??y, s??? c?? th??m c??c tr?????ng th??ng tin v??? ng?????i th??n; Qu?? Th???y C??, Anh Ch??? vui l??ng khai b??o ch??nh x??c nh?? th??ng tin b??n d?????i</p>
                                <p>- V???i tinh th???n tr??ch nhi???m ng?????i H??ng H???u, qu?? Th???y, C??, Anh, Ch??? c?? vui l??ng khai b??o trung th???c c??c n???i dung sau:</p>
                            </div>
                            <form>
                                <label htmlFor="SoDienThoai" className="form-label"><span style={{"color":"red"}}>*</span> S??? ??i???n tho???i</label>
                                <input gas-data="formData" type="text" id="SoDienThoai" className="form-control" placeholder="Nh???p s??? ??i???n tho???i" required onChange={findUser}/>
                                <div className="row">
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="HoTen" className="form-label"><span style={{"color":"red"}}>*</span> H??? v?? t??n</label>
                                        <input gas-data="formData" type="text" id="HoTen" className="form-control" placeholder="H??? v?? t??n" required/>
                                    </div>
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="Email" className="form-label"><span style={{"color":"red"}}>*</span> Email</label>
                                        <input gas-data="formData" type="text" id="Email" className="form-control" placeholder="Email..." required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="DonVi" className="form-label"><span style={{"color":"red"}}>*</span> ????n v???</label>
                                        <select gas-data="formData" id="DonVi" className="form-select" required onChange={handleChangeDV_PB}>
                                            {_.isEmpty(DV_PB) ? null : Object.keys(DV_PB).map(dv => (
                                                <option value={dv}>{dv}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="PhongBan" className="form-label"><span style={{"color":"red"}}>*</span> Ph??ng ban</label>
                                        <select gas-data="formData" id="PhongBan" className="form-select" required>
                                            {_.isEmpty(DV_PB) || _.isEmpty(DonViPB) ? null : DV_PB[DonViPB].map(pb => (
                                                <option value={pb}>{pb}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="NamSinh" className="form-label"><span style={{"color":"red"}}>*</span> N??m sinh</label>
                                        <input gas-data="formData" type="text" id="NamSinh" className="form-control" placeholder="N??m sinh" required/>
                                    </div>
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="GioiTinh" className="form-label"><span style={{"color":"red"}}>*</span> Gi???i t??nh</label>
                                        <select gas-data="formData" id="GioiTinh" className="form-select" required>
                                            <option value="Nam">Nam</option>
                                            <option value="N???">N???</option>
                                            <option value="Gi???i t??nh kh??c">Gi???i t??nh kh??c</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Ch??? ??? hi???n t???i:</span></p>
                                    <div className="col-md-3 pt-2">
                                        <label htmlFor="DiaChi" className="form-label"><span style={{"color":"red"}}>*</span> ?????a ch???:</label>
                                        <input gas-data="formData" type="text" id="DiaChi" className="form-control" placeholder="S??? nh??, t??n ???????ng, ???p, t???, khu ph???..." required/>
                                    </div>
                                    <div className="col-md-3 pt-2">
                                        <label htmlFor="TinhThanh" className="form-label"><span style={{"color":"red"}}>*</span> T???nh th??nh</label>
                                        <select gas-data="formData" id="TinhThanh" className="form-select" required onChange={(e) => getData("quan-huyen/",e.target.value).then(valu => setQuanHuyen(valu))}>
                                            <option value="" disabled selected hidden>T???nh th??nh</option>
                                            {_.isEmpty(TinhThanh) ? <></> : TinhThanh.map((tt) => (
                                                    <option value={tt.code}>{tt.name_with_type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 pt-2">
                                        <label htmlFor="QuanHuyen" className="form-label"><span style={{"color":"red"}}>*</span> Qu???n huy???n</label>
                                        <select gas-data="formData" id="QuanHuyen" className="form-select" disabled={_.isEmpty(QuanHuyen)} required onChange={(e)=> getData("xa-phuong/",e.target.value).then(valu => setXaPhuong(valu))}>
                                            <option value="" disabled selected hidden>Qu???n huy???n</option>
                                            {_.isEmpty(QuanHuyen) ? <></> : QuanHuyen.map(qh => (
                                                <option value={qh.code}>{qh.name_with_type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 pt-2">
                                        <label htmlFor="PhuongXa" className="form-label"><span style={{"color":"red"}}>*</span> X?? ph?????ng</label>
                                        <select gas-data="formData" id="PhuongXa" className="form-select" disabled={_.isEmpty(XaPhuong)} required>
                                            <option value="" disabled selected hidden>X?? ph?????ng</option>
                                            {_.isEmpty(XaPhuong) ? <></> : XaPhuong.map(xp => (
                                                <option value={xp.path_with_type}>{xp.name_with_type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <p className="pt-3"><span style={{"color":"red"}}>*</span> H??nh th???c l??m vi???c</p>
                                <div className="row" style={{"margin":"0"}}>
                                    <div className="form-check col-md-2">
                                        <input gas-data="formData" className="form-check-input" type="radio" name="HinhThucLamViec" id="Khach" value="Kh??ch"/>
                                        <label className="form-check-label" htmlFor="Khach">Kh??ch</label>
                                    </div>
                                    <div className="form-check col-md-2">
                                        <input gas-data="formData" className="form-check-input" type="radio" name="HinhThucLamViec" id="TrucTiep" value="Tr???c Ti???p" />
                                        <label className="form-check-label" htmlFor="TrucTiep">Tr???c ti???p</label>
                                    </div>
                                    <div className="form-check col-md-2">
                                        <input gas-data="formData" className="form-check-input" type="radio" name="HinhThucLamViec" id="TrucTaiCoSo" value="Tr???c t???i C?? S???" />
                                        <label className="form-check-label" htmlFor="TrucTaiCoSo">Tr???c t???i C?? s???</label>
                                    </div>
                                    <div className="form-check col-md-2">
                                        <input gas-data="formData" className="form-check-input" type="radio" name="HinhThucLamViec" id="WFH" value="WFH" />
                                        <label className="form-check-label" htmlFor="WFH">WFH</label>
                                    </div>
                                    <div className="form-check col-md-2">
                                        <input gas-data="formData" className="form-check-input" type="radio" name="HinhThucLamViec" id="DayOnline" value="D???y Online" />
                                        <label className="form-check-label" htmlFor="DayOnline">D???y Online</label>
                                    </div>
                                    <div className="form-check col-md-2">
                                        <input gas-data="formData" className="form-check-input" type="radio" name="HinhThucLamViec" id="NghiKhongLuong" value="Ngh??? kh??ng l????ng" />
                                        <label className="form-check-label" htmlFor="NghiKhongLuong">Ngh??? kh??ng l????ng</label>
                                    </div>
                                </div>
                                <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> C??c bi???u hi???n l??m s??ng</span></p>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col"> </th>
                                            <th scope="col">C??</th>
                                            <th scope="col">Kh??ng</th>
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
                                                        <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.co} onChange={onRadioChange} />
                                                        <label className="form-check-label" htmlFor={dt.key}>C??</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check">
                                                        <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.khong} onChange={onRadioChange} />
                                                        <label className="form-check-label" htmlFor={dt.key}>Kh??ng</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> Ti???n s??? d???ch t???: Trong v??ng 07 ng??y qua, qu?? Th???y, C??, Anh, Ch???:</span></p>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col"> </th>
                                            <th scope="col">C??</th>
                                            <th scope="col">Kh??ng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {_.isEmpty(DichTe)?<></>:DichTe.map(dt => (
                                            <tr>
                                                <td className="w-50">
                                                    <p className="pt-3"><span style={{"color":"red"}}>*</span> {dt.name}</p>
                                                </td>
                                                <td>
                                                    {(dt.type === "date" || dt.type === "text")?
                                                    <input gas-data="formData" className="form-control" type={dt.type} name={dt.name} id={dt.key} placeholder={dt.placeholder} onChange={onRadioChange} />:
                                                    (dt.type === "multiRadio")?
                                                    dt.co.map(tmp => (
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor={dt.key}>{tmp}</label>
                                                            <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} value={tmp} onChange={onRadioChange} />
                                                        </div>
                                                    )):
                                                    <>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor={dt.key}>C??</label>
                                                            <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.co} onChange={onRadioChange} />
                                                        </div>
                                                    </>}
                                                </td>
                                                <td>
                                                    <div className="form-check">
                                                        <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} value={dt.khong} onChange={onRadioChange} />
                                                        <label className="form-check-label" htmlFor={dt.key}>Kh??ng</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="pt-3" style={{"margin": "0"}}><span style={{"color":"red"}}>*</span><span className="fw-bold" style={{"color":"blue"}}> ?????a ??i???m n??i ???:</span></p>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col"> </th>
                                            <th scope="col">C??</th>
                                            <th scope="col">Kh??ng</th>
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
                                                            <label className="form-check-label" htmlFor={dt.key}>{tmp}</label>
                                                            <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} onChange={onRadioChange} value={tmp} />
                                                        </div>
                                                    )):
                                                    <>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor={dt.key}>C??</label>
                                                            <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} onChange={onRadioChange} value={dt.co} />
                                                        </div>
                                                    </>}
                                                </td>
                                                <td>
                                                    <div className="form-check">
                                                        <input gas-data="formData" className="form-check-input" type="radio" name={dt.name} id={dt.key} onChange={onRadioChange} value={dt.khong} />
                                                        <label className="form-check-label" htmlFor={dt.key}>Kh??ng</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <input gas-data="formData" className="form-control" placeholder="Vui l??ng cung c???p th??m chi ti???t th??ng tin v??? tri???u ch???ng, d???ch t??? l???ch s??? di chuy???n (N???u c??)"></input>
                                <input type="button" onClick={handleRouteSubmit} className="btn btn-primary mt-3 container" value="G???i" data-bs-toggle="modal" data-bs-target="#inforModal" />
                                <div className="modal fade" id="inforModal" tabindex="-1" aria-labelledby="hello" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">C???m ??n qu?? Th???y/C??/Anh/Ch??? ???? khai b??o y t???.</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {_.isEmpty(nv)?<></>:
                                                <div className="row">
                                                    <div className="col-3 text-center">
                                                        <QRCode value={`${window.location.href}/ketqua/${nv.SoDienThoai}`} style={{padding:'auto'}}/>
                                                        <p>{date}</p>
                                                    </div>
                                                    <div className="col-9">                        
                                                        <p>H??? v?? t??n: {nv.HoVaTen}</p>
                                                        <p>Gi???i T??nh: {nv.GioiTinh}</p>
                                                        <p>N??m Sinh: {nv.NamSinh}</p>
                                                        <p>S??? ??i???n tho???i: {nv.SoDienThoai}</p>
                                                        <p>Email: {nv.Email}</p>
                                                        <p>????n V???: {nv.DonVi}</p>
                                                        <p>Ph??ng Ban: {nv.PhongBan}</p>
                                                        <p>?????a Ch???: {nv.DiaChi}, {nv.PhuongXa}</p>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => window.location.reload()}>Cancel</button>
                                                <button type="button" className="btn btn-primary" onClick={() => window.location.assign(`./ketqua/${nv.SoDienThoai}`)}>Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="text-center pt-4 pb-3">
                        <p>Copyright 2021 ?? HungHau Holdings</p>
                    </div>
                    
                </div>
            </>
        );
    }
}
export default Index;