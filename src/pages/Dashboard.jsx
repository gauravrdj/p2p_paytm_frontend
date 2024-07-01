
import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import {Balance} from "../components/Balance";
import {Users} from "../components/Users";
import axios from 'axios';
import { useNavigate } from "react-router-dom";




export const Dashboard = ()=>{
    const navigate=useNavigate();
    const [balance, setBalance]=useState(0);
    useEffect(()=>{
       axios.get('https://p2p-paytm.onrender.com/api/v1/account/balance', {
        headers :{
            Authorization : "Bearer " + localStorage.getItem('token'),
        }
       }).then((res)=>{
             setBalance(res.data.balance);
       }).catch((e)=>{
        console.log(e.response.data.msg);
        //   alert('You are not logged in/ Unable to fetch balance');
        alert(e.response.data.msg);
          navigate('/signin');
       });
    }, [balance]);
    return <div>
        <Appbar/>
        <div className="m-8">
           <Balance balance={balance} value={"10,000"}/>
           
           <Users/>
        </div>
    </div>
}