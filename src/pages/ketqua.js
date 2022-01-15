import React,{useState, useEffect} from "react";
import * as bootstrap from "bootstrap";
import _ from 'lodash';
import QRCode from 'qrcode.react'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function KetQua(props){
    const {sdt} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);

    const [nv, setNV] = useState();

    useEffect(() => {
        fetch("https://6166dfbd13aa1d00170a6838.mockapi.io/thong/data/DS_KBYT")
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
        if(sdt.length === 10){
            item.map(i => {
                if(i.SoDienThoai === sdt){
                    setNV(i);
                }
            })
        } 
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
                    <div className="container pb-5" style={{"backgroundColor":"white", "fontSize": "14px"}}>
                        
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