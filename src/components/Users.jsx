import { useEffect, useState } from "react"
import { Button } from "./Button"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
 const [filter, setFilter] = useState("");
    useEffect(()=>{
        try{

        
     axios.get('https://p2p-paytm.onrender.com/api/v1/user/bulk?filter=' + filter).then((response)=>{
        setUsers(response.data.user);
     });
        }
        catch(e){
            console.log(e);
            alert('Can not load users');
        }
    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={async (e)=>{
                 await  setFilter(e.target.value);
            }} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {/* {users.map(user => <User user={user} />)} */}
            {users.map((user)=>{
                if(user.username!==localStorage.getItem('username')){
                   return <User user={user} />
                }
            })}
        </div>
    </>
}

function User({user}) {
    const navigate=useNavigate();
    return <div className="flex justify-between">
       
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={()=>{
               navigate(`/send?userId=${user._id}&firstName=${user.firstName}`);
            }} label={"Send Money"} />
        </div>
    </div>
}