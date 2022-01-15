import React,{useState, useEffect} from "react";
import * as bootstrap from "bootstrap";
import _ from 'lodash';
import { useParams } from "react-router-dom";

function KetQua(props){
    const {sdt} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch("https://6166dfbd13aa1d00170a6838.mockapi.io/thong/data/DS_KBYT/")
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

    if(error){
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded){
        return <div>Loading...</div>;
    }else{
        return(
            <>
                <nav className="navbar navbar-light bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img src="../favicon.ico" alt="" height="40" />
                        </a>
                    </div>
                </nav>
                <div className="pt-3" style={{"backgroundColor":"#f0f2f5", "height":"100vh"}}>
                    <div className="container pt-3 pb-3" style={{"backgroundColor":"white", "fontSize": "14px", "height":"90vh"}}>
                        <h3>BẢNG KẾT QUẢ KHAI BÁO Y TẾ</h3>
                        <table className="table table-striped table-hover table-sm align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Năm sinh</th>
                                    <th scope="col">Đơn vị</th>
                                    <th scope="col">Phòng ban</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Phường xã, Quận huyện, Tỉnh thành</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Thời gian khai báo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.isEmpty(item)?console.log(item):item.map(dt => (
                                    (dt.SoDienThoai === sdt)?(
                                        <>
                                            <tr style={{"height":"100px"}}>
                                                <td>{dt.HoVaTen}</td>
                                                <td>{dt.GioiTinh}</td>
                                                <td>{dt.NamSinh}</td>
                                                <td>{dt.DonVi}</td>
                                                <td>{dt.PhongBan}</td>
                                                <td>{dt.DiaChi}</td>
                                                <td>{dt.PhuongXa}</td>
                                                <td>{dt.SoDienThoai}</td>
                                                <td>{dt.CreateAt}</td>
                                            </tr>
                                        </>
                                    ):console.log(dt)
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center pt-4 pb-3">
                        <p>Copyright 2021 © HungHau Holdings</p>
                    </div>
                    
                </div>
            </>
        );
    }
}
export default KetQua;